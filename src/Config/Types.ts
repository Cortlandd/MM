export interface Message {
  id?: number
  text?: string
  time?: string
  conversation_id?: number
  is_from_me?: boolean
  group_id?: number
  message_seen?: boolean
  show_timestamp?: boolean
}

export interface MessageAttachment {
  id: number
  message_id?: number
  attachment_binary_code_or_path?: string
}

export interface RecipientProfileImage {
  id: number
  recipient_id?: number
  profile_blob?: string
  profile_path?: string
  profile_url?: string
}

export interface Recipient {
  id?: number
  name?: string
  first_name?: string
  last_name?: string
  image?: string // Or BLOB
  username?: string
  works_at?: string
  education_at?: string
  city?: string
  state?: string
  follower_count?: string
  following_count?: string
  post_count?: string
  join_date?: string // For twitter profile
  biography?: string
  verified?: boolean
  mutual_friends?: boolean
  mutual_friend_count?: number
  mutual_follower?: string
  created_at?: string
}

export interface Conversation {
  id?: number
  recipient_id: number
  platform?: string // imessage facebook instagram twitter
  theme_id?: number
  created_at?: string
  updated_at?: string
}

// Switch between sending as recipient and sender as message is being created
