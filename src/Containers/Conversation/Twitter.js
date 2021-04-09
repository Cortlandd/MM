import React, { useState } from 'react'
import { View, TouchableOpacity, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import Images from '@/Theme/Images'
import { TwitterMessage } from '@/Components'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import InstagramTextInput from '@/Components/TextInput/Instagram'
import TwitterNavigationBar from '@/Components/NavigationBar/Twitter'
import InstagramNavigationBar from '@/Components/NavigationBar/Instagram'
import TwitterTextInput from '@/Components/TextInput/Twitter'

const TwitterConversation = ({ route, navigation }) => {
  // 1. Fetch locally stored data
  // 2. Handle by handling if a timestamp should be shown based on twitters conditions
  // 3. THEN render data

  const { item } = route.params
  const dispatch = useDispatch()

  const [initialData] = useState([])
  const [messageData, setMessageData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const FIVE_MINUTE_SECONDS = 300
  const ONE_MINUTE_SECONDS = 60

  function lastMessageWithin1Minute() {
    const within1MinuteCondition = lastMessage && is_from_me === lastMessage.is_from_me && message.time - lastMessage.time < ONE_MINUTE
    const within5MinutesCondition = lastMessage && is_from_me === lastMessage.is_from_me && message.time - lastMessage.time < FIVE_MINUTES
  }

  const sendMessage = () => {
    const msg = {}
    msg.id = Math.round(Math.random() * 10000000).toString()
    msg.time = new Date()
    msg.message = message
    msg.showTimestamp = true
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
    setMessageData(initialData)
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
          lastMessage.showTimestamp = false
        } else {
          msg.lastMessage_is_from_me_within_1_minute = false
        }

        msg.lastMessage_is_from_me = lastMessage &&  msg.is_from_me === lastMessage.is_from_me
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TwitterNavigationBar
        title={item.recipient.name}
        callback={() => navigation.goBack()}
        userData={item}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={54} enabled={true}>
        <FlatList
          data={initialData}
          renderItem={({ item, index }) => {
            return (
              <TwitterMessage
                is_from_me={item.is_from_me}
                message={item}
                lastMessage={initialData[index - 1]}
              />
            )
          }}
          initialScrollIndex={initialData.length - 1}
          extraData={messageData}
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
        <View style={{ marginBottom: 10, marginLeft: 10, marginRight: 10, marginTop: 3 }}>
          <SegmentedControlTab
            values={['Receiving', 'Sending']}
            selectedIndex={selectedReceiverIndex}
            onTabPress={(index) => setSelectedReceiverIndex(index)}
          />
        </View>
        <TwitterTextInput
          messageInput={message}
          setMessageInput={setMessage}
          onSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default TwitterConversation
