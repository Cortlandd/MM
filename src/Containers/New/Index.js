import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const IndexNewContainer = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>New Conversation</Text>
    </View>
  )
}

export default IndexNewContainer
