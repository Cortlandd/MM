import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { View } from 'react-native'
import { RouteProp } from '@react-navigation/native'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ConversationSettings'>
  route: RouteProp<RootStackParamList, 'ConversationSettings'>
}

const ConversationSettings = ({ navigation, route }: Props) => {
  const { conversation, recipient } = route.params
  
  return (
    <View>
      
    </View>
  )
}

export default ConversationSettings
