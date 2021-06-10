import { React, useEffect } from 'react'
import SQLite from 'react-native-sqlite-storage'
import { Conversation, Message, Recipient } from '@/Config/Types'
import { DatabaseInitialization } from '@/Config/Database/DatabaseInitialization'
import { AppState, AppStateStatus } from 'react-native'

const DATABASE_NAME = 'MsgMaker.db'
const DATABASE_VERSION = '1.0'

export interface Database {
  // Create
  createConversation(conversation: Conversation): Promise<void>
  createRecipient(recipient: Recipient): Promise<void>
  createMessage(message: Message, conversation_id: number): Promise<void>

  // Read
  getConversations(): Promise<Conversation[]>
  getRecipient(id: number): Promise<Recipient>
  getMessages(conversation_id: number): Promise<Message[]>
  getLastRecipient(): Promise<Recipient>
  getLastConversation(): Promise<Conversation>

  // Update

  // Delete
  deleteConversation(conversation_id: number): Promise<void>
}

let databaseInstance: SQLite.SQLiteDatabase | undefined

async function createConversation(conversation: Conversation): Promise<void> {
  let c = JSON.parse(JSON.stringify(conversation))
  delete c.id
  let keys = Object.keys(c)
  let vals = Object.values(c)
  return getDatabase()
    .then((db) =>
      db.executeSql(`INSERT INTO Conversations (${keys.join(', ')}) VALUES (${vals.map((v) => `'${v}'`).join(', ')});`))
    .then(([results]) => {
      if (results === undefined) {
        return Promise.reject(null)
      }

      return Promise.resolve(results.rows.item(0))
    })
}

// Create recipient for a conversation
async function createRecipient(recipient: Recipient): Promise<void> {
  let r = JSON.parse(JSON.stringify(recipient))
  let vals = Object.values(r)
  return getDatabase()
    .then((db) =>
      db.executeSql(
        `INSERT INTO Recipients (${Object.keys(r).join(', ')}) VALUES (${vals.map((v) => `'${v}'`).join(',')});`),
    )
    .then(([results]) => {
      console.log(results)
      if (results === undefined) {
        return Promise.reject(null)
      }
      return Promise.resolve()
    })
}

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

async function deleteConversation(conversation_id: number): Promise<void> {
  return getDatabase()
    .then((db) => {
      return db
        .executeSql(
          `DELETE FROM Messages WHERE conversation_id = ${conversation_id};`,
        )
        .then(() => db)
    })
    .then((db) => {
      db.executeSql(
        `DELETE FROM Conversations WHERE conversation_id = ${conversation_id};`,
      )
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
}
