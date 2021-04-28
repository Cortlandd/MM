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

const MessengerMessage = ({ is_from_me, message, lastMessage }) => {
  const images = Images()

  var borderTopRightRadiusValue = 2
  var borderTopLeftRadiusValue = 2
  var borderBottomRightRadiusValue = 2
  var borderBottomLeftRadiusValue = 2
  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  function sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  if (message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopRightRadiusValue = 15
      borderTopLeftRadiusValue = 15
      borderBottomLeftRadiusValue = 15
    } else if (message.message_last_in_group) {
      borderBottomRightRadiusValue = 15
      borderBottomLeftRadiusValue = 15
      borderTopLeftRadiusValue = 15
    } else {
      borderBottomRightRadiusValue = 2
      borderTopRightRadiusValue = 2

      borderTopLeftRadiusValue = 15
      borderBottomLeftRadiusValue = 15
    }
  }

  if (!message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopLeftRadiusValue = 15
      borderTopRightRadiusValue = 15
      borderBottomLeftRadiusValue = 2
      borderBottomRightRadiusValue = 15
    } else if (message.message_last_in_group) {
      borderBottomRightRadiusValue = 15
      borderBottomLeftRadiusValue = 15
      borderTopRightRadiusValue = 15
    } else {
      borderBottomRightRadiusValue = 15
      borderTopRightRadiusValue = 15

      borderTopLeftRadiusValue = 0
      borderBottomLeftRadiusValue = 0
    }
  }

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
      marginHorizontal: 10,
    },
    textMessage: {
      paddingHorizontal: 15,
    },
    msgText: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      color: is_from_me ? '#fff' : '#000',
      fontSize: 15,
    },
    myMessage: {
      backgroundColor: '#0099FF',
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
    if (!message.is_from_me && message.message_last_in_group) {
      return images.sample_profile_woman
    } else {
      return null
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {message.message_first_in_group && (
        <Text style={{ color: 'gray', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
          {message.time.toLocaleTimeString([], {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
      )}
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
          <Avatar rounded={true} size={25} source={getProfileImage()} />
        </View>
        {/* Message and timestamp */}
        <View style={{ flex: 1 }}>
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
        </View>
      </View>
    </View>
  )
}

export default MessengerMessage
