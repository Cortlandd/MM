const BaseTextMessage = {
  id: 0,
  message: '',
  time: '',
  conversation_id: 0,
  is_from_me: true,
}

const MessageAttachment = {
  id: 0,
  message_id: 0,
  attachment_binary_code_or_path: '',
}

const BaseConversation = {
  id: 0,
  recipient: '',
  messages: [''], // PictureMessage OR Message
  platform: '', // imessage, facebook, instagram, etc
  theme: '',
}

const CustomProfile = {
  displayName: '',
  firstName: '',
  lastName: '',
  friends: 0,
  followers: 0,
  image: '',
}

// Switch between sending as recipient and sender as message is being created

export const Types = {
  BaseTextMessage: BaseTextMessage,
  BaseConversation: BaseConversation,
  CustomProfile: CustomProfile,
}
