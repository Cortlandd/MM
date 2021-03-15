import React from 'react'
import { View, Button, TextInput, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { ReceivedMessage, SentMessage } from '@/Components'

const IndexConversationContainer = ({ route, navigation }) => {
  const { item } = route.params

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginRight: 5, marginLeft: 10 }}>
        <ReceivedMessage
          recipient={item.recipient}
          message={
            'This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. '
          }
        />
        <SentMessage
          sender={item.sender}
          message={
            'This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. This is me testing the message. '
          }
        />
        <Text style={{ display: 'none' }}>{JSON.stringify(item)}</Text>
      </View>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 5,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
          alignItems: 'center',
          height: 50,
        }}
      >
        <TextInput placeholder={'Message...'} style={{ width: '90%' }} />
        <Icon name={'send'} style={{ marginLeft: 10 }} />
      </View>
    </View>
  )
}

export default IndexConversationContainer
