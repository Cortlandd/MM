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

const MessengerMessage = ({ is_from_me, message }) => {
  var borderTopRightRadiusValue = 0
  var borderTopLeftRadiusValue = 0
  var borderBottomRightRadiusValue = 20
  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  switch (is_from_me) {
    case message.lastMessage_is_from_me:
      break
    case !message.lastMessage_is_from_me:
      borderTopRightRadiusValue = 20
    case !message.lastMessage_is_from_me_within_1_minute:
      borderTopRightRadiusValue = 20
    default:
      break
  }

  switch (is_from_me) {
    case !message.lastMessage_is_from_me:
      borderBottomRightRadiusValue = 0
    case !message.lastMessage_is_from_me_within_1_minute:
      borderBottomRightRadiusValue = 0
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
      borderBottomRightRadius: is_from_me ? borderBottomRightRadiusValue : 20,
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
      paddingVertical: 5,
      color: is_from_me ? '#fff' : '#000',
      fontSize: 15,
    },
    myMessage: {
      backgroundColor: 'blue',
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
  )
}

export default MessengerMessage
