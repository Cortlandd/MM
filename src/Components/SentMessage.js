import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const SentMessage = ({ sender, showProfile = false, message }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'flex-end',
        maxWidth: '80%',
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
        {message}
      </Text>
      {showProfile && <Avatar source={sender.image} />}
    </View>
  )
}

export default SentMessage
