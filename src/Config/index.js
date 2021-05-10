import { SeedData } from '@/Config/SeedData'
import { models, Types } from '@/Config/Types'
import { Models } from '@/Config/Models'

const ContainerNames = {
  Home: 'Home',
  NewConversation: 'New Conversation',
  Conversation: 'Conversation',
  InstagramConversation: 'InstagramConversation',
  InstagramNewConversation: 'InstagramNewConversation',
  TwitterConversation: 'TwitterConversation',
  TwitterNewConversation: 'TwitterNewConversation',
  MessengerConversation: 'MessengerConversation',
  MessengerNewConversation: 'MessengerNewConversation',
  iMessageConversation: 'iMessageConversation',
  iMessageNewConversation: 'iMessageNewConversation',
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

const TwitterConfig = {
  ENDPOINT: 'https://api.twitter.com/2/users/by',
}

const TwitterCredentials = {
  API_KEY: '',
  ACCESS_TOKEN: '1391190472069197827-ksYqfaP9mGzzLiNgl07bPePmB9EhUd',
  ACCESS_TOKEN_SECRET: 'CYdN0HXnWvREeqURbf4fcA3PtoL2ZkU3VlEcoGGCR7BDx',
  BEARER_TOKEN: 'AAAAAAAAAAAAAAAAAAAAAJd9PQEAAAAAol%2FcKBDpXfW8igsjFV31PhzC7NI%3DnKkoHYblgsm2gh3VME1DgSjkXBzCXwx0xHDidPDIc0GWXvFvfi',
}

const TwitterUserResponse = {
  id: '',
  name: '',
  profile_image_url: '',
  username: '',
}

export const Config = {
  API_URL: 'https://jsonplaceholder.typicode.com/',
  containerNames: ContainerNames,
  messagingPlatforms: MessagingPlatforms,
  seedData: SeedData,
  types: Types,
  models: Models,
  messagingPlatformList: MessagingPlatformList,
  twitterConfig: TwitterConfig,
  twitterCredentials: TwitterCredentials,
}
