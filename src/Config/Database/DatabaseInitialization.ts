/**
 * React Native SQLite Demo
 * Copyright (c) 2018-2020 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */

// @ts-ignore
import SQLite from 'react-native-sqlite-storage'

export class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0
    console.log('Beginning database updates...')

    // First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database)
      })
      .then((version) => {
        dbVersion = version
        console.log('Current database version is: ' + dbVersion)

        // Perform DB updates based on this version

        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return
      })
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.Transaction) {
    // DANGER! For dev only
    const dropAllTables = false
    if (dropAllTables) {
      transaction.executeSql('DROP TABLE IF EXISTS Conversations;')
      transaction.executeSql('DROP TABLE IF EXISTS Recipients;')
      transaction.executeSql('DROP TABLE IF EXISTS Messages;')
      transaction.executeSql('DROP TABLE IF EXISTS Version;')
    }

    // Conversations table
    transaction.executeSql(`CREATE TABLE IF NOT EXISTS Conversations (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,recipient_id INTEGER,platform TEXT,created_at TEXT,updated_at TEXT);`)

    // Recipient table
    transaction.executeSql(`CREATE TABLE IF NOT EXISTS Recipients (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name TEXT,first_name TEXT,last_name TEXT,image TEXT,friend_since_year TEXT,username TEXT,works_at TEXT,education TEXT,city TEXT,state TEXT,follower_count TEXT,following_count TEXT,post_count TEXT,join_date TEXT,biography TEXT,verified INTEGER,is_mutual_friends INTEGER,mutual_friends_count TEXT,mutual_friend TEXT,created_at TEXT);`)

    // Messages table
    transaction.executeSql(`CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,text TEXT,conversation_id INTEGER,is_from_me INTEGER,image TEXT,group_id INTEGER, time TEXT, show_timestamp INTEGER, message_seen INTEGER, message_first_in_group INTEGER, message_last_in_group INTEGER);`)

    // Version table
    transaction.executeSql(`CREATE TABLE IF NOT EXISTS Version(version_id INTEGER PRIMARY KEY NOT NULL,version INTEGER);`)
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;')
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version
          return version
        } else {
          return 0
        }
      })
      .catch((error) => {
        console.log(`No version set. Returning 0. Details: ${error}`)
        return 0
      })
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
      // This function should be called when the version of the db is < 1
      private preVersion1Inserts(transaction: SQLite.Transaction) {
          console.log("Running pre-version 1 DB inserts");
          // Make schema changes
          transaction.executeSql("ALTER TABLE ...");
          // Lastly, update the database version
          transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
      }
      // This function should be called when the version of the db is < 2
      private preVersion2Inserts(transaction: SQLite.Transaction) {
          console.log("Running pre-version 2 DB inserts");

          // Make schema changes
          transaction.executeSql("ALTER TABLE ...");
          // Lastly, update the database version
          transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
      }
      */
}
