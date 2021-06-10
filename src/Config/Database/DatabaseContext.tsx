/**
 * React Native SQLite Demo
 * Copyright (c) 2021 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
import React, { useContext, useState } from 'react'
import { Database, sqliteDatabase } from '@/Config/Database/DatabaseManager'
import {Conversation, Recipient} from '@/Config/Types'

// Initialize our Database context.
// Any implementation that matches the Database interface will do. We will go with our
// sqliteDatabase for this app.
const DatabaseContext = React.createContext<Database | undefined>(undefined)

// Store the Conversation state in context as well
const ConversationsContext = React.createContext<Conversation[] | undefined>(undefined)
type SetConversations = (conversations: Conversation[]) => void
const SetConversationsContext = React.createContext<SetConversations | undefined>(undefined)

// The provider which enables accessing our conversation context from it's component tree.
export const ConversationContextProvider: React.FunctionComponent = function ({
  children,
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]) // Init with empty conversation of Conversations
  return (
    <DatabaseContext.Provider value={sqliteDatabase}>
      <ConversationsContext.Provider value={conversations}>
        <SetConversationsContext.Provider value={setConversations}>{children}</SetConversationsContext.Provider>
      </ConversationsContext.Provider>
    </DatabaseContext.Provider>
  )

  // Alternatively, try the InMemoryDatabase instead by replacing `sqliteDatabase` above
  // with `inMemoryDatabase`.
}

// Hook to pull our database object from the context and return it.
// Inspired by the Kent C. Dodds approach to using context: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export function useDatabase(): Database {
  const database = useContext(DatabaseContext)
  if (database === undefined) {
    throw new Error("useDatabase must be used within a ConversationContextProvider")
  }
  return database
}

export function useConversationsContext(): Conversation[] {
  const conversationsContext = useContext(ConversationsContext)
  if (conversationsContext === undefined) {
    throw new Error("useConversationsContext must be used within a ConversationContextProvider")
  }
  return conversationsContext
}

export function useSetConversationsContext(): SetConversations {
  const conversationsUpdateContext = useContext(SetConversationsContext)
  if (conversationsUpdateContext === undefined) {
    throw new Error("useSetConversationsContext must be used within a ConversationContextProvider")
  }
  return conversationsUpdateContext
}
