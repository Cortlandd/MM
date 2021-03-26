import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const ReceivedMessage = ({ showProfile = true, message }) => {
  return (
    <View
      style={{
        maxWidth: '80%',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 3,
        marginTop: 3,
      }}
    >
      {showProfile && <Avatar source={message.recipient.image} />}
      <Text
        style={{
          marginLeft: 10,
          padding: 10,
          backgroundColor: 'lightblue',
          borderRadius: 20,
          borderColor: 'gray',
          overflow: 'hidden',
        }}
      >
        {message.message}
      </Text>
    </View>
  )
}

export default ReceivedMessage
