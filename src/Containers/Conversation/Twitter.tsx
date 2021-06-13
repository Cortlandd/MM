import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  PlatformColor,
  StatusBar,
} from 'react-native'
import Images from '@/Theme/Images'
import { TwitterMessage } from '@/Components'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import TwitterNavigationBar from '@/Components/NavigationBar/Twitter'
import TwitterTextInput from '@/Components/TextInput/Twitter'
import { ThemeProvider } from 'react-native-elements'
import { useTheme } from '@/Theme'
import TwitterProfile from '@/Components/Profile/TwitterProfile'
import * as Utils from '@/Config/Utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { RouteProp } from '@react-navigation/native'
import { Message } from '@/Config/Types'
import { useMessages } from '@/Hooks/useMessages'
import { booleanToInteger, validateBoolean } from '@/Config/Utils'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'TwitterConversation'>;
  route: RouteProp<RootStackParamList, 'TwitterConversation'>
}

const TwitterConversation = ({ navigation, route }: Props) => {
  // 1. Fetch locally stored data
  // 2. Handle by handling if a timestamp should be shown based on twitters conditions
  // 3. THEN render data

  const { conversation, recipient } = route.params
  const { conversationMessages, createMessage, updateMessage, processTwitterMessage, updateSingleMessage, updateMessageBulk } = useMessages(conversation)
  const { darkMode } = useTheme()

  const [messagesData, setMessagesData] = useState<Message[]>([])
  const [messageText, setMessageText] = useState<string>('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const ONE_MINUTE_SECONDS = 60

  const sendMessage = () => {
    const msg: Message = {
      time: Utils.getDatetimeForSqlite(),
      text: messageText,
      conversation_id: conversation.id,
      message_seen: Utils.booleanToInteger(true), // True
      is_from_me: Utils.booleanToInteger(selectedReceiverIndex === 1),
      group_id: 0,
      message_first_in_group: Utils.booleanToInteger(true),
      message_last_in_group: Utils.booleanToInteger(true),
    }

    
    handleMessageData(msg)
    //handleCreateMessage(newMessage)

    //setInitialData(conversationMessages)
    //initialData.push(msg)
    //setMessagesData(initialData)

    setMessageText('')
  }

  async function handleUpdateMessage(message_id: number, field: any, val: any) {
    await updateMessage(message_id, field, val)
  }

  function handleCreateMessage(message: Message) {
    createMessage(message, conversation && conversation.id)
  }

  async function handleDeleteMessage(message_id: number) {}
  async function handleUpdateMessageField() {}
  
  function handleMessage(message: Message) {
    // Validate if first in group - could by only done once
    // Validate if timestamp should be shown
  }

  const handleMessageData = (msg: Message) => {
    let message: Message = msg
    
    // Get message by time, because timestamp is always unique and subtract 1 to get the previous message
    let previousMessageIndex = conversationMessages.findIndex(v => v.time === message.time) + 1
    let previousMessage: Message = conversationMessages[previousMessageIndex]
    
    if (previousMessage) {
      if (message.is_from_me === previousMessage.is_from_me) {
        const message_date = new Date(message.time)
        const previous_message_date = new Date(previousMessage.time)
        const secondsDifference = (message_date.getTime() - previous_message_date.getTime()) / 1000
        const within1MinuteCondition = secondsDifference < 60

        // Message and PreviousMessage sent within 1 minute of each other.
        if (within1MinuteCondition) {
          // Handle new message after initial first message in group
          // if (validateBoolean(previousMessage.message_first_in_group) && validateBoolean(previousMessage.message_last_in_group)) {
          //   previousMessage.message_last_in_group = booleanToInteger(false)
          // }

          message.message_first_in_group = booleanToInteger(false)
          previousMessage.message_last_in_group = booleanToInteger(false)
          message.group_id = previousMessage.group_id
        } else {
          message.group_id = previousMessage.group_id + 1
        }
        // END
      } else {
        message.group_id = previousMessage.group_id + 1
        message.message_last_in_group = booleanToInteger(true)
      }
    }

    if (previousMessage) {
      updateMessageBulk(previousMessage.id, previousMessage).then(() => handleCreateMessage(message)) 
    } else {
      handleCreateMessage(message)
    }
    
    //updateSingleMessage(previousMessage).then(() => Promise.resolve())
  }

  return (
    <ThemeProvider useDark={darkMode}>
      <SafeAreaView
        style={{
          flex: 1,
          ...Platform.select({
            ios: { backgroundColor: PlatformColor('systemBackground') },
            android: { backgroundColor: 'white' },
          }),
          paddingBottom: 8,
        }}
      >
        <StatusBar backgroundColor={'lightgrey'} />
        <TwitterNavigationBar
          title={recipient.name}
          callback={() => navigation.goBack()}
          userData={recipient}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          {Platform.OS === 'android' && <TwitterProfile recipient={recipient} />}
          <FlatList
            data={conversationMessages}
            inverted={true}
            renderItem={({ item, index }) => {
              return (
                <TwitterMessage
                  message={item}
                  recipient={recipient}
                />
              )
            }}
            extraData={messagesData}
            style={{ flex: 1,  marginLeft: 15 }}
            keyExtractor={(item, index) => item.time}
          />
          <View
            style={{
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
            }}
          >
            <SegmentedControlTab
              values={['Receiving', 'Sending']}
              selectedIndex={selectedReceiverIndex}
              onTabPress={(index) => setSelectedReceiverIndex(index)}
            />
          </View>
          <TwitterTextInput
            messageInput={messageText}
            setMessageInput={setMessageText}
            onSend={sendMessage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default TwitterConversation
