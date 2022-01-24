import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { Avatar, Image } from 'react-native-elements'
import Images from '@/Theme/Images'
import { Message, Recipient } from '@/Config/Types'
import { validateBoolean } from '@/Config/Utils'
import { useTheme } from '@/Theme'
import * as Utils from '@/Config/Utils'

interface Props {
  message: Message
  lastMessage: Message
  recipient: Recipient
}

const InstagramMessage = ({ message, lastMessage, recipient }: Props) => {
  const images = Images()
  const { darkMode } = useTheme()

  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
  const styles = StyleSheet.create({
    messageItem: {
      width: '100%',
      flexDirection: 'row',
      marginVertical: 3,
      alignItems: 'flex-end',
    },
    message: {
      borderColor: '#ddd',
      borderWidth: message.is_from_me ? 0 : 1,
      borderRadius: 22,
      maxWidth: SCREEN_WIDTH * 0.6,
      backgroundColor: '#ddd',
      marginHorizontal: !message.is_from_me ? 15 : 5,
    },
    textMessage: {
      paddingHorizontal: 16,
    },
    msgText: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      ...message.is_from_me ? {color: 'black'} : null,
      ...!message.is_from_me && { color: darkMode ? 'white' : 'black' },
    },
    myMessage: {
      backgroundColor: '#ddd',
      marginHorizontal: 15,
    },
    yourAvatar: {
      height: 30,
      width: 30,
      borderRadius: 40,
    },
    yourMessage: {
      backgroundColor: 'transparent',
    },
  })

  function getProfileImage() {
    if (!validateBoolean(message.is_from_me) && validateBoolean(message.message_last_in_group)) {
      return images.sample_profile_woman
    } else {
      return null
    }
  }

  const dateValidation = (d: string) => {
    var dt = new Date(d)
    var date = dt.getDate()
    var diff_days = new Date().getDate() - date
    var diff_months = new Date().getMonth() - dt.getMonth()
    var diff_years = new Date().getFullYear() - dt.getFullYear()

    var is_today = diff_years === 0 && diff_months === 0 && diff_days === 0
    var is_yesterday = diff_years === 0 && diff_months === 0 && diff_days === 1

    if (is_today) {
      const t = new Date(message.time).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
      
      return 'Today ' + t
    } else if (is_yesterday) {
      const msg = new Date(message.time).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })

      return 'Yesterday ' + msg
    } else {
      return new Date(message.time).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    }
  }
  
  return (
    <View>
      {validateBoolean(message.show_timestamp) ? (
        <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10 }}>
          <Text style={{ color: '#8e8e8e', textAlign: 'center' }}>
            {dateValidation(message.time)}
          </Text>
        </View>
      ) : null}
      {!message.image ? (
        <TouchableOpacity
          style={{
            ...styles.messageItem,
            justifyContent: validateBoolean(message.is_from_me) ? 'flex-end' : 'flex-start',
            paddingBottom: 0,
          }}
          activeOpacity={1}
        >
          <View style={{
            ...styles.yourAvatar,
            marginLeft: 5,
            ...validateBoolean(message.is_from_me) && { display: 'none' }
          }}>
            <Avatar
              style={styles.yourAvatar}
              rounded={true}
              avatarStyle={!validateBoolean(message.message_last_in_group) ? { display: 'none' } : {}}
              source={
                recipient && recipient.image ? {uri: Utils.getImageFromPath(recipient.image)} : images.sample_profile_woman
              }
            />
            {/* Set constraint so that if the last message and current has 15 min difference show other don't. */}
          </View>
          <View
            style={[
              styles.message,
              !validateBoolean(message.is_from_me) && styles.yourMessage,
              styles.textMessage,
              {
                alignItems: validateBoolean(message.is_from_me) ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text style={styles.msgText}>{message.text}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            marginVertical: 3,
            alignItems: 'flex-end',
            justifyContent: validateBoolean(message.is_from_me) ? 'flex-end' : 'flex-start',
            paddingBottom: 0,
          }}
          activeOpacity={1}
        >
          {/* Profile icons */}
          <View style={{
            ...styles.yourAvatar,
            marginLeft: 5,
            ...validateBoolean(message.is_from_me) && { display: 'none' }
          }}>
            <Avatar
              style={styles.yourAvatar}
              rounded={true}
              avatarStyle={!validateBoolean(message.message_last_in_group) ? { display: 'none' } : {}}
              source={
                recipient && recipient.image ? {uri: Utils.getImageFromPath(recipient.image)} : images.sample_profile_woman
              }
            />
            {/* Set constraint so that if the last message and current has 15 min difference show other don't. */}
          </View>
          <View
            style={[
              !validateBoolean(message.is_from_me) && styles.yourMessage,
              {
                alignItems: validateBoolean(message.is_from_me) ? 'flex-end' : 'flex-start',
                maxWidth: SCREEN_WIDTH * 0.6,
                marginHorizontal: 5,
                
              },
            ]}
          >
            <Avatar containerStyle={{ width: 150, height: 200 }} avatarStyle={{ borderRadius: 20 }} source={{ uri: Utils.getMessageImageFromPath(message.image) }} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default InstagramMessage
