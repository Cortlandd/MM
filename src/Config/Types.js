const BaseTextMessage = {
  message: '',
  time: '',
  type: '', // recipient or sender
}

const BasePictureMessage = {
  message: '',
  time: '',
  imagePath: '',
  type: '', // recipient or sender
}

const BaseConversation = {
  recipient: '',
  sender: '',
  messages: [''], // PictureMessage OR Message
  platform: '',
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
  BasePictureMessage: BasePictureMessage,
  BaseConversation: BaseConversation,
  CustomProfile: CustomProfile,
}
