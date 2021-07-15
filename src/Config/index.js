import { SeedData } from '@/Config/SeedData'
import { models, Types } from '@/Config/Types'
import { Models } from '@/Config/Models'

const ContainerNames = {
  Home: 'Home',
  NewConversation: 'NewConversation',
  Conversation: 'Conversation',
  InstagramConversation: 'InstagramConversation',
  NewInstagramConversation: 'NewInstagramConversation',
  TwitterConversation: 'TwitterConversation',
  NewTwitterConversation: 'NewTwitterConversation',
  MessengerConversation: 'MessengerConversation',
  MessengerNewConversation: 'MessengerNewConversation',
  iMessageConversation: 'iMessageConversation',
  iMessageNewConversation: 'iMessageNewConversation',
  NewGenericConversation: 'NewGenericConversation',
  ConversationSettings: 'ConversationSettings'
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

export const SampleInstagramResponse = {"biography":"","blocked_by_viewer":false,"restricted_by_viewer":null,"country_block":false,"external_url":null,"external_url_linkshimmed":null,"edge_followed_by":{"count":7659},"fbid":"17841401466732717","followed_by_viewer":false,"edge_follow":{"count":32},"follows_viewer":false,"full_name":"💗","has_ar_effects":false,"has_clips":false,"has_guides":false,"has_channel":false,"has_blocked_viewer":false,"highlight_reel_count":0,"has_requested_viewer":false,"hide_like_and_view_counts":false,"id":"173936891","is_business_account":false,"is_professional_account":false,"is_joined_recently":false,"business_address_json":null,"business_contact_method":null,"business_email":null,"business_phone_number":null,"business_category_name":null,"overall_category_name":null,"category_enum":null,"category_name":null,"is_private":true,"is_verified":false,"edge_mutual_followed_by":{"count":0,"edges":[]},"profile_pic_url":"https://instagram.fpku3-2.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fpku3-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=48BB6JzK0iMAX8FtVo6&edm=ABmJApABAAAA&ccb=7-4&oh=948f43afe258b09948abef425f2e2e74&oe=60D09ECF&_nc_sid=6136e7&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4","profile_pic_url_hd":"https://instagram.fpku3-2.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fpku3-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=48BB6JzK0iMAX8FtVo6&edm=ABmJApABAAAA&ccb=7-4&oh=948f43afe258b09948abef425f2e2e74&oe=60D09ECF&_nc_sid=6136e7&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4","requested_by_viewer":false,"should_show_category":false,"should_show_public_contacts":false,"username":"jamia.97","connected_fb_page":null,"edge_felix_video_timeline":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"edge_owner_to_timeline_media":{"count":1080,"page_info":{"has_next_page":true,"end_cursor":"QVFCSWxkLW1BM2RPaWUyR3hxcTdVQU9HNU9PTS1LSXlMQUNFa0kzUWlqc3ZiX0hWS1VXWjd4RzZlWnVia2hURnZmbGFEZE13SXBuSmUxNUY5eEl2N2EwXw=="},"edges":[]},"edge_saved_media":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"edge_media_collections":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"edge_related_profiles":{"edges":[]}}


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
