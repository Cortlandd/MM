import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback, Keyboard, TextInput,
} from 'react-native'
import { useDispatch } from 'react-redux'
import Images from '@/Theme/Images'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import MessengerNavigationBar from '@/Components/NavigationBar/Messenger'
import InstagramNavigationBar from '@/Components/NavigationBar/Instagram'
import MessengerTextInput from '@/Components/TextInput/Messenger'

const MessengerConversation = ({ route, navigation }) => {
  const { item } = route.params
  const dispatch = useDispatch()
  const images = Images()

  const [initialData] = useState([])
  const [messageData, setMessageData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MessengerNavigationBar callback={() => navigation.goBack()} userData={item} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={54} enabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text>The start of the conversation</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ width: '100%' }}>
          <MessengerTextInput messageInput={message} setMessageInput={setMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessengerConversation
