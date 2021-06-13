/**
 * React Native SQLite Demo
 * Copyright (c) 2021 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
import {useEffect, useState} from 'react'
import { Conversation, Recipient } from '@/Config/Types'
import {
  useDatabase,
  useConversationsContext,
  useSetConversationsContext,
} from '@/Config/Database/DatabaseContext'

// Hook for managing and accessing conversations (CRUD)
export function useConversations() {
  // Get the conversations array and setter from context
  const database = useDatabase()
  const conversations: Conversation[] = useConversationsContext()
  const setConversations: (
    conversations: Conversation[],
  ) => void = useSetConversationsContext()

  useEffect(() => {
    refreshConversations()
  }, [])

  function refreshConversations() {
    // Query all conversations from the DB, then store them as state
    return database.getConversations().then(setConversations)
  }

  async function createConversation(conversation: Conversation): Promise<void> {
    await database.createConversation(conversation).then(() => Promise.resolve())
  }

  async function getLastConversation(): Promise<Conversation> {
    return await database.getLastConversation()
  }

  function deleteConversation(conversationToDelete: number): Promise<void> {
    if (conversationToDelete !== undefined) {
      return database
        .deleteConversation(conversationToDelete)
        .then(refreshConversations)
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined conversation'))
  }

  return {
    conversations,
    createConversation,
    deleteConversation,
    refreshConversations,
    getLastConversation,
  }
}
