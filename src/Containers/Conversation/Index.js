import React from 'react'
import { View, Button, TextInput, Text } from 'react-native'

const IndexConversationContainer = ({ route, navigation }) => {
  const { item } = route.params

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>{JSON.stringify(item)}</Text>
      </View>
      <View style={{ height: 30 }}>
        <TextInput placeholder={'Message'} />
      </View>
    </View>
  )
}

export default IndexConversationContainer
