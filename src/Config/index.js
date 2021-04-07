import { SeedData } from '@/Config/SeedData'
import { Types } from '@/Config/Types'

const ContainerNames = {
  Home: 'Home',
  NewConversation: 'New Conversation',
  Conversation: 'Conversation',
  InstagramConversation: 'InstagramConversation',
  TwitterConversation: 'TwitterConversation',
}

const MessengerPlatforms = {
  Instagram: 'Instagram',
  FacebookMessenger: 'Facebook Messenger',
  iMessage: 'iMessage',
  Twitter: 'Twitter',
}

export const Config = {
  API_URL: 'https://jsonplaceholder.typicode.com/',
  containerNames: ContainerNames,
  messengerPlatforms: MessengerPlatforms,
  seedData: SeedData,
  types: Types,
}
