import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native'
import { useDispatch } from 'react-redux'
import Images from '@/Theme/Images'

const iMessageConversation = ({ route, navigation }) => {
  const { item } = route.params
  const dispatch = useDispatch()
  const images = Images()

  const [initialData] = useState([])
  const [messagesData, setMessagesData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const ONE_MINUTE_SECONDS = 60

  return (
    <View>
      <Text>Conversation</Text>
    </View>
  )
}

export default iMessageConversation
