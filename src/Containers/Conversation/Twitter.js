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

  const ONE_MINUTE_SECONDS = 60

  const sendMessage = () => {
    const msg = {}
    msg.id = Math.round(Math.random() * 10000000).toString()
    msg.time = new Date()
    msg.message = message
    msg.showTimestamp = true
    msg.messageIndex = initialData.length
    msg.isMsgRead = true
    msg.lastMessage_is_from_me_within_1_minute = false
    msg.group_id = 0
    msg.message_first_in_group = false
    msg.message_last_in_group = true
    msg.is_from_me = selectedReceiverIndex === 1
    msg.recipient = {
      name: item.recipient.name,
      image: item.recipient.image,
    }

    initialData.push(msg)
    handleMessageData()
    setMessageData(initialData)
    setMessage('')
  }

  const handleMessageData = () => {
    initialData.forEach(function (msg, index) {
      var lastMessage = initialData[index - 1]

      if (!lastMessage) {
        msg.message_first_in_group = true
        msg.message_last_in_group = true
      }

      if (lastMessage) {
        if (msg.is_from_me !== lastMessage.is_from_me) {
          msg.message_first_in_group = true
          msg.group_id = lastMessage.group_id + 1
        }

        if (msg.is_from_me === lastMessage.is_from_me) {
          const secondsDifference = (msg.time.getTime() - lastMessage.time.getTime()) / 1000
          const within1MinuteCondition = secondsDifference < ONE_MINUTE_SECONDS

          if (within1MinuteCondition) {
            msg.lastMessage_is_from_me_within_1_minute = true
            lastMessage.showTimestamp = false
            msg.group_id = lastMessage.group_id
          } else {
            msg.lastMessage_is_from_me_within_1_minute = false
            msg.message_first_in_group = true
            msg.group_id = lastMessage.group_id + 1
          }

          if (lastMessage.message_first_in_group) {
            lastMessage.message_last_in_group = false
          }

          if (msg.message_first_in_group && lastMessage.message_first_in_group) {
            lastMessage.message_last_in_group = true
          }

          if (msg.group_id !== lastMessage.group_id) {
            msg.message_first_in_group = true
            msg.message_last_in_group = true
          }
        }
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
          extraData={messageData}
          style={{ flex: 1, marginRight: 5, marginLeft: 20 }}
          keyExtractor={(i, index) => i.id}
          ref={(ref) => (this.flatList = ref)}
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
