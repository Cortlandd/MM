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
import * as Utils from '@/Config/Utils'
import { validateBoolean } from '@/Config/Utils'

const MessengerMessage = ({message, lastMessage, recipient }) => {
  const images = Images()
  
  message.is_from_me = validateBoolean(message.is_from_me)
  message.message_last_in_group = validateBoolean(message.message_last_in_group)
  message.message_first_in_group = validateBoolean(message.message_first_in_group)
  message.show_timestamp = validateBoolean(message.show_timestamp)

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

  const dateValidation = (d) => {
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

  if (message.is_from_me) {
    if (message.message_first_in_group && message.message_last_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
      borderBottomRightRadiusValue = 20
    } else if (message.message_last_in_group) {
      borderBottomRightRadiusValue = 20
      borderBottomLeftRadiusValue = 20
      borderTopLeftRadiusValue = 20
    } else if (message.message_first_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
    } else {
      borderBottomRightRadiusValue = 2
      borderTopRightRadiusValue = 2
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
    }
  }

  if (!message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopLeftRadiusValue = 20
      borderTopRightRadiusValue = 20
      borderBottomLeftRadiusValue = 2
      borderBottomRightRadiusValue = 20
    } else if (message.message_last_in_group) {
      borderBottomRightRadiusValue = 20
      borderBottomLeftRadiusValue = 20
      borderTopRightRadiusValue = 20
    } else if (message.message_first_in_group && message.message_last_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
      borderBottomRightRadiusValue = 20
    } else {
      borderBottomRightRadiusValue = 20
      borderTopRightRadiusValue = 20

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
      backgroundColor: '#e4e6eb',
      marginHorizontal: 5,
    },
    textMessage: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    msgText: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      color: message.is_from_me ? '#fff' : '#000',
      fontSize: 15,
    },
    myMessage: {
      backgroundColor: '#0099FF',
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
      (!validateBoolean(message.is_from_me) &&
        validateBoolean(message.message_first_in_group) &&
        validateBoolean(message.message_last_in_group)) ||
      (!validateBoolean(message.is_from_me) && validateBoolean(message.message_last_in_group))
    ) {
      return recipient.image
    } else {
      return null
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {message.show_timestamp ? (
        <Text style={{ color: 'gray', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
          {dateValidation(message.time)}
        </Text>
      ) : null}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: message.is_from_me ? 'flex-end' : 'flex-start',
          marginTop: lastMessage && validateBoolean(message.is_from_me) === validateBoolean(lastMessage.is_from_me) && message.group_id !== lastMessage.group_id && 8
        }}
      >
        {/* Avatar */}
        <View>
          <Avatar rounded={true} size={25} source={!message.is_from_me && message.message_last_in_group ? { uri: recipient.image } : null} />
        </View>
        {/* Message and timestamp */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...styles.messageItem,
              justifyContent: message.is_from_me ? 'flex-end' : 'flex-start',
              marginBottom: 1,
              marginTop: 1,
            }}
            activeOpacity={1}
          >
            <View
              style={[
                styles.message,
                message.is_from_me ? styles.myMessage : styles.yourMessage,
                styles.textMessage,
                {
                  alignItems: message.is_from_me ? 'flex-end' : 'flex-start',
                },
              ]}
            >
              <Text style={styles.msgText}>{message.text}</Text>
            </View>
            <Avatar
              rounded={true}
              size={20}
              source={
                message.is_from_me && message.message_last_in_group
                  // Change URI
                  ? recipient.imag
                  : null
              }
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default MessengerMessage
