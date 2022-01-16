import { useDatabase } from '@/Config/Database/DatabaseContext'
import { useEffect, useState } from 'react'
import { Conversation, Message } from '@/Config/Types'

export function useMessages(conversation: Conversation) {
  const database = useDatabase()
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])
  
  useEffect(() => {
    refreshMessages().then(() => Promise.resolve())
  }, [conversation])
  
  async function refreshMessages(): Promise<void> {
    if (conversation !== undefined) {
      let c = await database.getMessages(conversation.id)
      if (c) {
        if (conversation.platform === 'Twitter' || conversation.platform === 'Instagram') {
          c = c.reverse()
        }
      }
      setConversationMessages(c)
    } else {
      return Promise.reject('Could not get messages for this Conversation.')
    }
    
  }

  async function createMessage(message: Message, conversation_id: number): Promise<void> {
    await database.createMessage(message, conversation_id)
    // TODO: RETHINK THIS
    
    await refreshMessages()
  }

  async function getMessage(message_id: number): Promise<Message> {
    return await database.getMessage(message_id).then((message) => Promise.resolve(message))
  }

  async function updateMessage(message_id: number, field: string, val: any): Promise<void> {
    await database.updateMessage(message_id, field, val)

    // RETHINK THIS

    await refreshMessages()
  }

  async function updateMessageBulk(message_id: number, values = {}): Promise<void> {
    await database.updateMessageBulk(message_id, values)
    await refreshMessages()
  }

  async function updateSingleMessage(message: Message): Promise<void> {
    await database.updateSingleMessage(message)
    await refreshMessages()
  }
  
  return {
    conversationMessages,
    setConversationMessages,
    createMessage,
    getMessage,
    updateMessage,
    updateMessageBulk,
    updateSingleMessage,
  }
}
