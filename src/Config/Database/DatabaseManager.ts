import SQLite from 'react-native-sqlite-storage'
import { Conversation, Message, Recipient } from '@/Config/Types'
import { DatabaseInitialization } from '@/Config/Database/DatabaseInitialization'
import { AppState, AppStateStatus } from 'react-native'
import { booleanToInteger, validateBoolean, getDatetimeForSqlite } from '@/Config/Utils'

const DATABASE_NAME = 'MsgMaker.db'
const DATABASE_VERSION = '1.0'

export interface Database {
  // Create
  createConversation(conversation: Conversation): Promise<Conversation>
  createRecipient(recipient: Recipient): Promise<Recipient>
  createMessage(message: Message, conversation_id: number): Promise<Message>

  // Read
  getConversations(): Promise<Conversation[]>
  getRecipient(id: number): Promise<Recipient>
  getMessages(conversation_id: number): Promise<Message[]>
  getLastRecipient(): Promise<Recipient>
  getLastConversation(): Promise<Conversation>
  getMessage(message_id: number): Promise<Message>
  getPreviousGroupMessage(initial_message: number, group_id: number): Promise<Message>

  // Update
  updateMessage(message_id: number, field: string, val: any): Promise<void>
  updateSingleMessage(message: Message): Promise<void>
  //updateMessage(message: Message): Promise<void>
  updateMessageBulk(message_id: number, values: {}): Promise<void>
  processTwitterMessage(message: Message): Promise<void>

  // Delete
  deleteConversation(conversation_id: number): Promise<void>
  deleteMessage(message_id: number): Promise<void>
}

let databaseInstance: SQLite.SQLiteDatabase | undefined

// CREATE

async function createConversation(conversation: Conversation): Promise<Conversation> {
  let c = JSON.parse(JSON.stringify(conversation))
  let keys = Object.keys(c)
  let vals = Object.values(c)
  const database = getDatabase()
  database
    .then((db) =>
      db.executeSql(`INSERT INTO Conversations (${keys.join(', ')}) VALUES (${vals.map((v) => `'${v}'`).join(', ')});`)
    ).then(() => Promise.resolve())

  return database
    .then((db) => db.executeSql('SELECT * FROM Conversations WHERE id = (SELECT MAX(id) FROM Conversations);'))
    .then(([results]) => {
      if (results === undefined) {
        return Promise.reject(null)
      }

      return Promise.resolve(results.rows.item(0))
    })
}

// Create recipient for a conversation
async function createRecipient(recipient: Recipient): Promise<Recipient> {
  let r = JSON.parse(JSON.stringify(recipient))
  let vals = Object.values(r)
  const database = getDatabase()
  // Create Recipient
  database.then((db) => db.executeSql(
    `INSERT INTO Recipients (${Object.keys(r).join(', ')}) VALUES (${vals.map((v) => `'${v}'`).join(',')});`),
  ).then(() => Promise.resolve())
  
  // Get Previously created recipient
  return database
    .then((db) => db.executeSql('SELECT * FROM Recipients WHERE id = (SELECT MAX(id) FROM Recipients);'))
    .then(([results]) => {
      console.debug('recipient results', results.rows.item(0))
      if (results === undefined) {
        return Promise.reject(null)
      }

      return results.rows.item(0)
    })
}

async function createMessage(message: Message): Promise<Message> {
  console.log('[db] Creating message into the db...')
  let c = JSON.parse(JSON.stringify(message))
  let keys = Object.keys(c)
  let vals = Object.values(c)
  return getDatabase()
    .then((db) => 
      db.executeSql(`UPDATE Conversations SET updated_at = '${getDatetimeForSqlite()}' WHERE id = ${message.conversation_id};`).then(() => db)
    )
    .then((db) => db.executeSql(`INSERT INTO Messages (${keys.join(', ')}) VALUES (${vals.map((v) => `${typeof v === 'string' ? `'${v}'` : v}`).join(', ')});`))
    .then(([results]) => {
      if (results === undefined) {
        return Promise.reject(null)
      }

      return results.rows.item(0)
    })
}

// READ

// Get array of all Conversations
async function getConversations(): Promise<Conversation[]> {
  console.log('[db] Fetching Conversations from the db...')
  return getDatabase()
    .then((db) =>
      // Get all the conversations, ordered by newest lists first
      db.executeSql('SELECT * FROM Conversations ORDER BY updated_at DESC;'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return []
      }

      const count = results.rows.length
      const conversations: Conversation[] = []
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i)
        conversations.push(row)
      }
      return conversations
    })
}

async function getRecipient(id: number): Promise<Recipient> {
  return getDatabase()
    .then((db) => db.executeSql(`SELECT * FROM Recipients WHERE id = ${id};`),)
    .then(([result]) => {
      if (result === undefined) {
        return Promise.reject(null)
      }

      return Promise.resolve(result.rows.item(0))
    })
}

async function getLastRecipient(): Promise<Recipient> {
  return getDatabase()
    .then((db) =>
      db.executeSql('SELECT * FROM Recipients WHERE id = (SELECT MAX(id) FROM Recipients);'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return Promise.reject(null)
      }

      return results.rows.item(0)
    })
}

async function getLastConversation(): Promise<Conversation> {
  return getDatabase()
    .then((db) =>
      db.executeSql('SELECT * FROM Conversations WHERE id = (SELECT MAX(id) FROM Conversations);'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return Promise.reject(null)
      }

      return results.rows.item(0)
    })
}

async function getMessages(conversation_id: number): Promise<Message[]> {
  console.log('[db] Fetching Messages from the db...')
  return getDatabase()
    .then((db) => db.executeSql(`SELECT * FROM Messages WHERE conversation_id = ${conversation_id} ORDER BY time;`))
    .then(([results]) => {
      if (results === undefined) {
        return []
      }

      const count = results.rows.length
      const messages: Message[] = []

      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i)
        messages.push(row)
      }

      return messages
    })
}

async function getMessage(message_id: number): Promise<Message> {
  return getDatabase()
    .then((db) => db.executeSql(`SELECT * FROM Messages WHERE id = ${message_id};`))
    .then(([results]) => {
      if (results === undefined) {
        return Promise.reject('Message could not be found')
      }

      return results.rows.item(0)
    })
}

// DELETE

async function deleteConversation(conversation_id: number): Promise<void> {
  // const database = getDatabase()
  // database.then((db) => db.executeSql(`DELETE FROM Messages WHERE conversation_id = ${conversation_id};`,)).then(() => Promise.resolve())
  // database.then((db) => db.executeSql(`DELETE FROM Recipients WHERE ROWID IN (SELECT ROWID FROM Conversations WHERE id = ${conversation_id});`))
  
  return getDatabase()
    .then((db) => {
      return db
        .executeSql(
          `DELETE FROM Messages WHERE conversation_id = ${conversation_id};`,
        )
        .then(() => db)
    })
    .then((db) => {
      return db.executeSql(
        `DELETE from Recipients where id in (select recipient_id from Conversations where id = ${conversation_id});`
      ).then(() => db)
    })
    .then((db) => {
      return db.executeSql(
        `DELETE FROM Conversations WHERE id = ${conversation_id}`
      ).then(() => db)
    })
}

// UPDATE

async function updateMessage(message_id: number, field: string, val: any): Promise<void> {
  return getDatabase()
    .then((db) => db.executeSql(`UPDATE Messages SET ${field} = "${val}" WHERE id = ${message_id};`))
    .then(([_]) => Promise.resolve())
}

async function updateMessageBulk(message_id: number, values = {}): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        `UPDATE Messages SET ${Object.keys(values)
          .map((k) => `${k} = ${typeof values[k] === 'string' ? `'${values[k]}'` : values[k]}`)
          .join(', ')} WHERE id = ${message_id}`,
      ),
    )
    .then(([results]) => Promise.resolve())
}

async function updateSingleMessage(message: Message): Promise<void> {
  let m = JSON.parse(JSON.stringify(message))

  return getDatabase()
    .then((db) =>
      `UPDATE Messages SET ${Object.keys(m)
        .map((k) => `${k} = "${m[k]}"`)
        .join(', ')} WHERE id = ${message.id}`,
    )
    .then(([_]) => Promise.resolve())
}

async function processTwitterMessage(message: Message): Promise<void> {
  let previousMessage: Message;
  getPreviousGroupMessage(message.id, message.group_id, message.conversation_id).then((msg) => previousMessage = msg).then(() => {
    
    if (previousMessage) {
      if (message.is_from_me === previousMessage.is_from_me) {
        const message_date = new Date(message.time)
        const previous_message_date = new Date(previousMessage.time)
        const secondsDifference = (message_date.getTime() - previous_message_date.getTime()) / 1000
        const within1MinuteCondition = secondsDifference < 60

        // Message and PreviousMessage sent within 1 minute of each other.
        if (within1MinuteCondition) {
          // Handle new message after initial first message in group
          // if (validateBoolean(previousMessage.message_first_in_group) && validateBoolean(previousMessage.message_last_in_group)) {
          //   previousMessage.message_last_in_group = booleanToInteger(false)
          // }

          message.message_first_in_group = false
          previousMessage.message_last_in_group = false
          message.group_id = previousMessage.group_id
        } else {
          message.group_id = previousMessage.group_id + 1
        }
        // END
      } else {
        message.group_id = previousMessage.group_id + 1
        message.message_last_in_group = true
      }
    }

    let m = JSON.parse(JSON.stringify(message))
    let pm = JSON.parse(JSON.stringify(previousMessage))
    
    return getDatabase()
      .then((db) =>
        // Update previousMessage
        db.executeSql(
          `UPDATE Messages SET ${Object.keys(pm)
          .map((k) => `${k} = "${pm[k]}"`)
          .join(', ')} WHERE id = ${pm.id};`
        )
      )
      .then((db) => 
        // Update message
        db.executeSql(
          `UPDATE Messages SET ${Object.keys(m)
            .map((k) => `${k} = "${m[k]}"`)
            .join(', ')} WHERE id = ${m.id};`
        )
      )
  })
}

async function getPreviousGroupMessage(initial_message: number, group_id: number, conversation_id: number): Promise<Message> {
  return getDatabase()
    .then((db) => db.executeSql(`SELECT * FROM Messages WHERE id = ${initial_message === 0 ? 0 : initial_message - 1} AND group_id = ${group_id} AND conversation_id = ${conversation_id}`))
    .then(([results]) => {
      if (results === undefined) {
        Promise.reject('No other message inside this group')
      }

      return results.rows.item(0)
    })
}

//  Private

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance)
  }
  // otherwise: open the database first
  return open()
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(true)
  SQLite.enablePromise(true)

  if (databaseInstance) {
    console.log(
      '[db] Database is already open: returning the existing instance',
    )
    return databaseInstance
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE_NAME,
    location: 'default',
  })
  console.log('[db] Database open!')

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization()
  await databaseInitialization.updateDatabaseTables(db)

  databaseInstance = db
  return db
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed")
    return
  }
  const status = await databaseInstance.close()
  console.log('[db] Database closed.')
  databaseInstance = undefined
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active'
console.log('[db] Adding listener to handle app state changes')
AppState.addEventListener('change', handleAppStateChange)

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log('[db] App has gone to the background - closing DB connection.')
    close()
  }
  appState = nextAppState
}

export const sqliteDatabase: Database = {
  createConversation,
  createRecipient,
  getConversations,
  getRecipient,
  deleteConversation,
  getLastConversation,
  getLastRecipient,
  getMessage,
  getMessages,
  createMessage,
  updateMessageBulk,
  updateMessage,
  processTwitterMessage,
  updateSingleMessage
}
