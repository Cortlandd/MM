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
import IMessageNavigationBar from '@/Components/NavigationBar/iMessage'
import Images from '@/Theme/Images'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import IMessageTextInput from '@/Components/TextInput/iMessage'
import { IMessageMessage } from '@/Components'
import { moderateScale } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { RouteProp } from '@react-navigation/native'
import * as Utils from '@/Config/Utils'
import { useMessages } from '@/Hooks/useMessages'
import { Message } from '@/Config/Types'
import { booleanToInteger, validateBoolean } from '@/Config/Utils'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'iMessageConversation'>;
  route: RouteProp<RootStackParamList, 'iMessageConversation'>
}

const IMessageConversation = ({ navigation, route }: Props) => {
  const { conversation, recipient } = route.params
  const { conversationMessages, createMessage, updateMessageBulk } = useMessages(conversation)
  const images = Images()

  const [initialData] = useState([])
  const [messagesData, setMessagesData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const ONE_MINUTE_SECONDS = 60

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
    }

    if (previousMessage) {
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
      // TODO: This is wrong?
      message.show_timestamp = booleanToInteger(true)
    }

    if (previousMessage) {
      updateMessageBulk(previousMessage.id, previousMessage).then(() => handleCreateMessage(message))
    } else {
      handleCreateMessage(message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <IMessageNavigationBar
        title={`${recipient.first_name} ${recipient.last_name}`}
        callback={() => navigation.goBack()}
        recipient={recipient}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={54}
        enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={conversationMessages}
            ListHeaderComponent={() => <Text style={{ alignSelf: 'center', color: 'gray'}}>iMessage</Text>}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginTop: 1, marginBottom: 1 }}>
                  <IMessageMessage
                    message={item}
                    previousMessage={conversationMessages && conversationMessages[index - 1]}
                    recipient={recipient}
                  />
                  {item.is_from_me && index === conversationMessages.length - 1 ? (
                    <View
                      style={{
                        marginVertical: moderateScale(3, 2),
                        ...!item.is_from_me && { marginLeft: 20 },
                        ...item.is_from_me && { marginRight: 20, alignSelf: 'flex-end' },
                      }}
                    >
                      <Text style={{ fontWeight: '500', color: 'gray', fontSize: 12 }}>
                        Delivered
                      </Text>
                    </View>
                  ) : null}
                </View>
              )
            }}
            style={{ flex: 1, marginRight: 5, marginLeft: 5 }}
            keyExtractor={(item, index) => item.time}
            ref={ (ref) => { this.myFlatListRef = ref } }
            onContentSizeChange={ () => { this.myFlatListRef.scrollToEnd({animated:false}) } }
            onLayout={ () => { this.myFlatListRef.scrollToEnd({animated:false}) } }
          />
        </TouchableWithoutFeedback>
        <View style={{ margin: 10 }}>
          <SegmentedControlTab
            values={['Receiving', 'Sending']}
            selectedIndex={selectedReceiverIndex}
            onTabPress={(index) => setSelectedReceiverIndex(index)}
          />
        </View>
        <IMessageTextInput
          messageInput={message}
          setMessageInput={setMessage}
          onSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default IMessageConversation
