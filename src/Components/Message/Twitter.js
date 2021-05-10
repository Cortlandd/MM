import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const TwitterMessage = ({ is_from_me, message, lastMessage }) => {
  const images = Images()

  var borderTopRightRadiusValue = 0
  var borderTopLeftRadiusValue = 0
  var borderBottomRightRadiusValue = 0
  var borderBottomLeftRadiusValue = 0

  if (message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
    } else {
      borderTopRightRadiusValue = 0
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
      borderBottomRightRadiusValue = 0
    }
  }

  // switch (is_from_me) {
  //   case !message.lastMessage_is_from_me:
  //     borderTopRightRadiusValue = 20
  //   case !message.lastMessage_is_from_me_within_1_minute:
  //     borderTopRightRadiusValue = 20
  //   default:
  //     break
  // }

  if (!message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomRightRadiusValue = 20
    } else {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 0
      borderBottomLeftRadiusValue = 0
      borderBottomRightRadiusValue = 20
    }
  }

  // switch (!is_from_me) {
  //   case !message.lastMessage_is_from_me:
  //     borderTopLeftRadiusValue = 20
  //   case !message.lastMessage_is_from_me_within_1_minute:
  //     borderTopLeftRadiusValue = 20
  //   default:
  //     break
  // }

  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  // if (is_from_me && !lastMessage) {
  //   return 20
  // } else if () {}

  const styles = StyleSheet.create({
    messageItem: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    message: {
      borderTopRightRadius: borderTopRightRadiusValue,
      borderTopLeftRadius: borderTopLeftRadiusValue,
      borderBottomLeftRadius: borderBottomLeftRadiusValue,
      borderBottomRightRadius: borderBottomRightRadiusValue,
      maxWidth: SCREEN_WIDTH * 0.6,
      backgroundColor: '#ddd',
      marginHorizontal: 5,
    },
    textMessage: {
      paddingHorizontal: 15,
    },
    msgText: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      color: is_from_me ? '#fff' : '#000',
      fontSize: 15,
    },
    myMessage: {
      backgroundColor: '#1DA1F2',
      marginHorizontal: 15,
    },
    yourAvatar: {
      height: 35,
      width: 35,
    },
    yourMessage: {
      backgroundColor: '#E1E8ED',
    },
  })

  function getProfileImage() {
    if (!message.is_from_me && message.message_first_in_group && message.message_last_in_group || !message.is_from_me && message.message_last_in_group) {
      return message.recipient.image
    } else {
      return null
    }
  }

  const MessageTimestamp = () => {
    return (
      <View
        style={{
          alignItems: is_from_me ? 'flex-end' : 'flex-start',
          marginHorizontal: is_from_me && 15,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: 'gray' }}>
          {message.time.toLocaleTimeString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: is_from_me ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Avatar */}
      <View>
        <Avatar rounded source={{ uri: getProfileImage() }} />
      </View>
      {/* Message and timestamp */}
      <TouchableOpacity style={{ flex: 1 }}>
        <View
          style={{
            ...styles.messageItem,
            justifyContent: is_from_me ? 'flex-end' : 'flex-start',
            marginBottom: 1,
            marginTop: 1,
          }}
          activeOpacity={1}
        >
          <View
            style={[
              styles.message,
              is_from_me ? styles.myMessage : styles.yourMessage,
              styles.textMessage,
              {
                alignItems: is_from_me ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text style={styles.msgText}>{message.message}</Text>
          </View>
        </View>
        {message.showTimestamp && <MessageTimestamp />}
      </TouchableOpacity>
    </View>
  )
}

export default TwitterMessage
