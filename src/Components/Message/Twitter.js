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

const TwitterMessage = ({ is_from_me, message }) => {
  var borderTopRightRadiusValue = 0
  var borderTopLeftRadiusValue = 0

  switch (is_from_me) {
    case !message.lastMessage_is_from_me:
      borderTopRightRadiusValue = 20
    case !message.lastMessage_is_from_me_within_1_minute:
      borderTopRightRadiusValue = 20
    default:
      break
  }

  switch (!is_from_me) {
    case !message.lastMessage_is_from_me:
      borderTopLeftRadiusValue = 20
    case !message.lastMessage_is_from_me_within_1_minute:
      borderTopLeftRadiusValue = 20
    default:
      break
  }

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
      borderTopRightRadius: is_from_me ? borderTopRightRadiusValue : 20,
      borderTopLeftRadius: is_from_me ? 20 : borderTopLeftRadiusValue,
      borderBottomLeftRadius: is_from_me ? 20 : 0,
      borderBottomRightRadius: is_from_me ? 0 : 20,
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
        alignItems: 'flex-start',
        justifyContent: is_from_me ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Avatar */}
      <View>
        {!is_from_me && <Avatar rounded source={message.recipient.image} />}
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
