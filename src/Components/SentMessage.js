import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const SentMessage = ({ showProfile = false, message, showTime = false }) => {
  return (
    <View>
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          alignSelf: 'flex-end',
          maxWidth: '80%',
          marginBottom: 1,
          marginTop: 1,
        }}
      >
        <Text
          style={{
            marginRight: 10,
            padding: 10,
            backgroundColor: 'lightgreen',
            borderRadius: 12,
            borderColor: 'gray',
            overflow: 'hidden',
          }}
        >
          {message.message}
        </Text>
        {showProfile && <Avatar source={message.recipient.image} />}
      </View>
    </View>
  )
}

export default SentMessage
