import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import InstagramSentMessage from '../SentMessage/Instagram'

const InstagramMessage = ({ is_from_me = false, showTime = false, message }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.messageItem,
        justifyContent: is_from_me ? 'flex-end' : 'flex-start',
        paddingBottom: 0,
      }}
      activeOpacity={1}
    >
      {!is_from_me && (
        <Avatar style={styles.yourAvatar} source={message.recipient.image} />
      )}
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
    </TouchableOpacity>
  )
}

export default InstagramMessage

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  messageItem: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  message: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    maxWidth: SCREEN_WIDTH * 0.6,
    backgroundColor: '#ddd',
    marginHorizontal: 15,
  },
  textMessage: {
    paddingHorizontal: 15,
  },
  msgText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  myMessage: {
    backgroundColor: '#ddd',
    marginHorizontal: 15,
  },
  yourAvatar: {
    marginLeft: 5,
    height: 25,
    width: 25,
    borderRadius: 40,
  },
  yourMessage: {
    backgroundColor: '#fff',
  },
})
