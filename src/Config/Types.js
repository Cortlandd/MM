const Message = {
  id: 0,
  text: '',
  time: '',
  conversation_id: 0,
  is_from_me: true,
  group_id: 0,
  message_seen: false,
  show_timestamp: false,
}

const MessageAttachment = {
  id: 0,
  message_id: 0,
  attachment_binary_code_or_path: '',
}

const RecipientProfileImage = {
  id: 0,
  recipient_id: 0,
  profile_blob: '',
  profile_path: '',
  profile_url: '',
}

const Recipient = {
  id: 0,
  name: '',
  first_name: '',
  last_name: '',
  image_url: '', // Or BLOB
  username: '',
  works_at: '',
  education_at: '',
  city: '',
  state: '',
  follower_count: '',
  following_count: '',
  post_count: '',
  join_date: '', // For twitter profile
  biography: '',
  verified_user: false,
}

const BaseConversation = {
  id: 0,
  recipient_id: 0,
  platform: '', // imessage, facebook, instagram, etc
}

const InstagramConversation = {
  follow_each_other: false,
  mutual_follows_count: 0,
  mutual_follower: '',
}

const MessengerConversation = {
  theme: '',
  friends_on_facebook: false,
  mutual_friends_count: 0,
}

const TwitterConversation = {
  follow_each_other: false,
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
  Message: Message,
  BaseConversation: BaseConversation,
  CustomProfile: CustomProfile,
}
