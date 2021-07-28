import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback, Keyboard, TextInput, ScrollView,
} from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import MessengerNavigationBar from '@/Components/NavigationBar/Messenger'
import MessengerTextInput from '@/Components/TextInput/Messenger'
import MessengerMessage from '@/Components/Message/Messenger'
import MessengerProfile from '@/Components/Profile/Messenger'
import * as Utils from '@/Config/Utils'
import { booleanToInteger, validateBoolean } from '@/Config/Utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { RouteProp } from '@react-navigation/native'
import { useMessages } from '@/Hooks/useMessages'
import { Message } from '@/Config/Types'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'MessengerConversation'>;
  route: RouteProp<RootStackParamList, 'MessengerConversation'>
}

const MessengerConversation = ({ navigation, route }: Props) => {
  const { conversation, recipient } = route.params
  const { conversationMessages, createMessage, updateMessageBulk } = useMessages(conversation)

  const [message, setMessage] = useState('')
  const [messagesData, setMessagesData] = useState<Message[]>([])
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const sendMessage = () => {
    const msg: Message = {
      time: Utils.getDatetimeForSqlite(),
      text: message,
      conversation_id: conversation.id,
      message_seen: Utils.booleanToInteger(false),
      show_timestamp: Utils.booleanToInteger(false),
      is_from_me: Utils.booleanToInteger(selectedReceiverIndex === 1),
      group_id: 0,
      message_first_in_group: Utils.booleanToInteger(true),
      message_last_in_group: Utils.booleanToInteger(true)
    }
    
    handleMessageData(msg)
    setMessage('')
  }

  function handleCreateMessage(message: Message) {
    createMessage(message, conversation && conversation.id)
  }

  const handleMessageData = (msg: Message) => {
    let message: Message = msg

    let latestMessage: Message
    let latestMessageIndex
    let previousMessage: Message

    if (conversationMessages.length > 0) {
      latestMessage = conversationMessages.reduce((a, b) => {
        return new Date(a.time) > new Date(b.time) ? a : b;
      });

      latestMessageIndex = conversationMessages.findIndex(v => v.time === latestMessage.time)
      previousMessage = conversationMessages[latestMessageIndex]
    } else {
      previousMessage = undefined
    }

    if (previousMessage !== undefined) {
      const message_date = new Date(message.time)
      const previous_message_date = new Date(previousMessage.time)
      const secondsDifference = (message_date.getTime() - previous_message_date.getTime()) / 1000
      const within1MinuteCondition = secondsDifference < 60
      const within1HourCondition = secondsDifference < 3600 // 1 hour = 3600 seconds

      if (validateBoolean(message.is_from_me) === validateBoolean(previousMessage.is_from_me)) {
        if (within1HourCondition) {
          // Handle within 60 seconds if same
          // Message and PreviousMessage sent within 1 minute of each other.
          if (within1MinuteCondition) {
            message.message_first_in_group = booleanToInteger(false)
            previousMessage.message_last_in_group = booleanToInteger(false)
            message.group_id = previousMessage.group_id
          } else {
            message.group_id = previousMessage.group_id + 1
            message.message_first_in_group = booleanToInteger(true)
            message.message_last_in_group = booleanToInteger(true)
          }
          
        } else {
          // new group, show timestamp
          message.message_first_in_group = booleanToInteger(true)
          message.message_last_in_group = booleanToInteger(true)
          message.show_timestamp = booleanToInteger(true)
          message.group_id = previousMessage.group_id + 1
        }
        
      } else {
        message.group_id = previousMessage.group_id! + 1
        message.message_last_in_group = booleanToInteger(true)

        // if (!within1HourCondition) {
        //   message.show_timestamp = booleanToInteger(true)
        //   message.message_first_in_group = booleanToInteger(true)
        // }
      }
    } else {
      message.show_timestamp = booleanToInteger(true)
    }

    if (previousMessage) {
      updateMessageBulk(previousMessage.id, previousMessage).then(() => handleCreateMessage(message))
    } else {
      handleCreateMessage(message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 8 }}>
      <MessengerNavigationBar
        callback={() => navigation.goBack()}
        recipient={recipient}
        navigationLink={() => navigation.navigate('ConversationSettings', { conversation: conversation, recipient: recipient, backRoute: 'MessengerConversation' })}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={54} enabled={true}>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
            <MessengerProfile recipient={recipient} />
            <FlatList
              data={conversationMessages}
              renderItem={({ item, index }) => {
                return (
                  <MessengerMessage
                    message={item}
                    lastMessage={conversationMessages && conversationMessages[index-1]}
                    recipient={recipient}
                  />
                )
              }}
              style={{ flex: 1, marginTop: 30, marginRight: 5, marginLeft: 15 }}
              keyExtractor={(item, index) => item.time}
              ref={ (ref) => { this.myFlatListRef = ref } }
              onContentSizeChange={ () => { this.myFlatListRef.scrollToEnd({animated:false}) } }
              onLayout={ () => { this.myFlatListRef.scrollToEnd({animated:false}) } }
            />
          </ScrollView>
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
