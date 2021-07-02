import { useEffect, useState } from 'react'
import { Recipient } from '@/Config/Types'
import { useDatabase } from '@/Config/Database/DatabaseContext'

export function useRecipients(conversation_id?: number) {
  const database = useDatabase()
  const [conversationRecipient, setConversationRecipient] = useState<Recipient>()

  useEffect(() => {
    if (conversation_id) {
      refreshRecipient(conversation_id).then((r) => setConversationRecipient(r))
    }
  }, [conversation_id])

  function refreshRecipient(c_id?: number): Promise<Recipient> {
    if (c_id !== undefined) {
      return getRecipient(c_id)
    } else {
      return Promise.reject('Could not refresh')
    }
  }

  function createRecipient(recipient: Recipient): Promise<Recipient> {
    return database.createRecipient(recipient).then((r) => Promise.resolve(r))
  }

  function getRecipient(id: number): Promise<Recipient> {
    return database.getRecipient(id).then((r) => Promise.resolve(r))
  }

  function getLastRecipient(): Promise<Recipient> {
    return database.getLastRecipient()
  }

  return {
    conversationRecipient,
    createRecipient,
    getRecipient,
    getLastRecipient,
  }
}
