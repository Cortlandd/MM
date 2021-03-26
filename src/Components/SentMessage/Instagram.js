import React from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'

const InstagramSentMessage = ({ showProfile = false, message, showTime = false }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.messageItem,
        justifyContent: 'flex-end',
        paddingBottom: 15,
      }}
    >
      <View style={{ ...styles.message, alignItems: 'flex-end' }}>
        {showTime && (
          <View
            style={{
              textAlign: 'center',
              marginBottom: 10,
              marginTop: 5,
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: 'gray' }}>{message.time}</Text>
          </View>
        )}
        <View style={{ ...styles.message, alignItems: 'flex-end' }}>
          <Text style={styles.msgText}>{message.message}</Text>
          {showProfile && <Avatar source={message.recipient.image} />}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default InstagramSentMessage

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
})
