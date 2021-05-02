import { SeedData } from '@/Config/SeedData'
import { Types } from '@/Config/Types'

const ContainerNames = {
  Home: 'Home',
  NewConversation: 'New Conversation',
  Conversation: 'Conversation',
  InstagramConversation: 'InstagramConversation',
  TwitterConversation: 'TwitterConversation',
  MessengerConversation: 'MessengerConversation',
  iMessageConversation: 'iMessageConversation',
}

const MessagingPlatforms = {
  Instagram: 'Instagram',
  Messenger: 'Messenger',
  iMessage: 'iMessage',
  Twitter: 'Twitter',
}

const MessagingPlatformList = [
  {
    name: 'Instagram',
  },
  {
    name: 'Messenger',
  },
  {
    name: 'Twitter',
  },
  {
    name: 'iMessage',
  },
]

const MessengerData = {
  id: 'message_id',
  time: 'time',
  message: 'message',
  row_index: 'row_index',
  group_id: 'group_id',
  platform: 'platform',
  recipient_name: 'recipient_name',
  recipient_image: 'recipient_image',
  is_from_me: 'is_from_me',
  lastMessage_is_from_me_within_1_minute: 'optional_lastMessage_is_from_me_within_1_minute',
  message_first_in_group: 'message_first_in_group',
  message_last_in_group: 'message_last_in_group',
}

const MessengerInterfaceData = {
  navigation_color: 'navigation_color',
  text_input_color: 'text_input_color',
  message_bubble_color: 'message_bubble_color',
  is_recipient_active: 'recipient_active',
  is_friends_on_facebook: 'friends_on_facebook',
}

const MessengerImageData = {
  message_id: 'message_id',
  message_row_index: 'message_row_index',
  image_blob: 'image_blob',
}

export const Config = {
  API_URL: 'https://jsonplaceholder.typicode.com/',
  containerNames: ContainerNames,
  messagingPlatforms: MessagingPlatforms,
  seedData: SeedData,
  types: Types,
  messagingPlatformList: MessagingPlatformList,
}
