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
import MessengerMessage from '@/Components/Message/Messenger'

const MessengerConversation = ({ route, navigation }) => {
  const { item } = route.params
  const dispatch = useDispatch()
  const images = Images()

  const [initialData] = useState([])
  const [messagesData, setMessagesData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const ONE_MINUTE_SECONDS = 60

  const sendMessage = () => {
    const msg = {}
    msg.id = Math.round(Math.random() * 10000000).toString()
    msg.time = new Date()
    msg.message = message
    msg.messageIndex = initialData.length
    msg.lastMessage_is_from_me = false
    msg.lastMessage_is_from_me_within_1_minute = false

    if (selectedReceiverIndex === 0) {
      // Receiver
      msg.type = 'received'
      msg.is_from_me = false
      msg.recipient = {
        name: item.sender.name,
        image: item.sender.image,
      }
    } else {
      // Sender
      msg.type = 'sent'
      msg.is_from_me = true
      msg.recipient = {
        name: item.recipient.name,
        image: item.recipient.image,
      }
    }
    initialData.push(msg)
    handleMessageData()
    setMessagesData(initialData)
    setMessage('')
  }

  const handleMessageData = () => {
    initialData.forEach(function (msg, index) {
      var lastMessage = initialData[index - 1]

      if (lastMessage && msg.is_from_me === lastMessage.is_from_me) {
        const secondsDifference = (msg.time.getTime() - lastMessage.time.getTime()) / 1000
        const within1MinuteCondition = secondsDifference < ONE_MINUTE_SECONDS

        if (within1MinuteCondition) {
          msg.lastMessage_is_from_me_within_1_minute = true
        } else {
          msg.lastMessage_is_from_me_within_1_minute = false
        }

        msg.lastMessage_is_from_me = lastMessage &&  msg.is_from_me === lastMessage.is_from_me
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MessengerNavigationBar callback={() => navigation.goBack()} userData={item} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={54} enabled={true}>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <FlatList 
            data={initialData}
            renderItem={({ item, index }) => {
              return (
                <MessengerMessage
                  is_from_me={item.is_from_me}
                  message={item}
                  lastMessage={initialData[index - 1]}
                />
              )
            }}
            extraData={messagesData}
            style={{ flex: 1, marginRight: 5, marginLeft: 20 }}
            keyExtractor={(i, index) => i.id}
            ref={(ref) => (this.flatList = ref)}
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({ animated: true })
            }
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>The start of the conversation.</Text>
              </View>
            }
          />
        </TouchableWithoutFeedback>
        <View style={{ width: '100%' }}>
          <SegmentedControlTab
            tabsContainerStyle={{ marginHorizontal: 10, marginBottom: 10 }}
            values={['Receiving', 'Sending']}
            selectedIndex={selectedReceiverIndex}
            onTabPress={(index) => setSelectedReceiverIndex(index)}
          />
          <MessengerTextInput messageInput={message} setMessageInput={setMessage} onSend={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessengerConversation
