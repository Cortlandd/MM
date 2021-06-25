export interface Message {
  id: number
  text?: string
  time: string
  conversation_id: number
  is_from_me?: number
  group_id?: number
  message_seen?: number
  message_last_in_group?: number
  message_first_in_group?: number
  show_timestamp?: number
  message_type?: string
}

export const MessageType = {
  basic: "basic",
  picture: "picture"
}

export interface InstagramUserASearch {
  full_name: string
  username: string
  profile_pic_url_hd: string
  edge_followed_by: {
    count: number
  }
  edge_follow: {
    count: number
  }
  edge_owner_to_timeline_media: {
    count: number
  }
}

export interface MessageAttachment {
  id: number
  message_id?: number
  conversation_id?: number
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
  id: number
  name?: string
  first_name?: string
  last_name?: string
  image?: string // Or BLOB
  local_image: string,
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
  verified?: number
  is_mutual_friends?: number
  mutual_friends_count?: number
  mutual_friend?: string
  created_at?: string
  friend_since_year?: number
}

export interface RecipientImage {
  id: number
  path?: string,
  recipient_id?: number
  created_at?: string
}

export interface Conversation {
  id: number
  recipient_id: number
  platform?: string // imessage facebook instagram twitter
  theme_id?: number
  created_at?: string
  updated_at?: string
}

// Switch between sending as recipient and sender as message is being created
