import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const ReceivedMessage = ({ recipient, showProfile = true, message }) => {
  return (
    <View
      style={{
        maxWidth: '80%',
        flexDirection: 'row',
        alignItems: 'baseline',
      }}
    >
      {showProfile && <Avatar source={recipient.image} />}
      <Text
        style={{
          marginLeft: 10,
          padding: 10,
          backgroundColor: 'lightblue',
          borderRadius: 12,
          borderColor: 'gray',
          overflow: 'hidden',
        }}
      >
        {message}
      </Text>
    </View>
  )
}

export default ReceivedMessage
