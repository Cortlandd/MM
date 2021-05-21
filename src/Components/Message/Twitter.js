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
import Svg, { Path } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'

const TwitterMessage = ({ is_from_me, message, lastMessage }) => {
  const images = Images()

  var borderTopRightRadiusValue = 0
  var borderTopLeftRadiusValue = 0
  var borderBottomRightRadiusValue = 0
  var borderBottomLeftRadiusValue = 0
  var showAvatar = false

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

  if (
    (!message.is_from_me &&
      message.message_first_in_group &&
      message.message_last_in_group) ||
    (!message.is_from_me && message.message_last_in_group)
  ) {
    showAvatar = true
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
    if (
      (!message.is_from_me &&
        message.message_first_in_group &&
        message.message_last_in_group) ||
      (!message.is_from_me && message.message_last_in_group)
    ) {
      return message.recipient.image
    } else {
      return null
    }
  }

  const MessageTimestamp = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: is_from_me && 15,
          alignSelf: is_from_me ? 'flex-end' : 'flex-start',
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
        {message.is_from_me && message.isMsgRead && (
          <Svg
            viewBox="0 0 24 24"
            width={moderateScale(15.5, 0.6)}
            height={moderateScale(17.5, 0.6)}
            aria-hidden="true"
            style={{ marginLeft: 3 }}
          >
            <Path
              d="M9 20a.995.995 0 01-.707-.293l-4.785-4.785a1 1 0 011.414-1.414l3.946 3.945L18.075 4.41a1 1 0 111.635 1.154L9.817 19.577A1.003 1.003 0 019 20z"
              fill={'#007AFF'}
            />
          </Svg>
        )}
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
      <View style={{ display: message.is_from_me && 'none' }}>
        {__DEV__ ? (
          <Avatar source={images.sample_profile_woman} rounded />
        ) : (
          <Avatar rounded source={{ uri: getProfileImage() }} />
        )}
      </View>
      {/* Message and timestamp */}
      <TouchableOpacity style={{ flex: 1 }}>
        <View
          style={{
            ...styles.messageItem,
            justifyContent: is_from_me ? 'flex-end' : 'flex-start',
            marginTop: 15,
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
