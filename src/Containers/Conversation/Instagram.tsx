import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  PlatformColor,
} from 'react-native'
import Images from '@/Theme/Images'
import InstagramNavigationBar from '@/Components/NavigationBar/Instagram'
import { InstagramMessage } from '@/Components'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import InstagramTextInput from '@/Components/TextInput/Instagram'
import InstagramProfile from '@/Components/Profile/Instagram'
import { useTheme } from '@/Theme'
import { ThemeProvider } from 'react-native-elements'
import { booleanToInteger } from '@/Config/Utils'
import * as Utils from '@/Config/Utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { RouteProp } from '@react-navigation/native'
import { Message } from '@/Config/Types'
import { useMessages } from '@/Hooks/useMessages'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'InstagramConversation'>;
  route: RouteProp<RootStackParamList, 'InstagramConversation'>
}

const InstagramConversation = ({ navigation, route }: Props) => {
  const { conversation, recipient } = route.params
  const { conversationMessages, createMessage, updateMessage, updateSingleMessage, updateMessageBulk } = useMessages(conversation)
  const images = Images()
  const { darkMode } = useTheme()

  const [messageData, setMessageData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const sendMessage = () => {
    const msg: Message = {
      time: Utils.getDatetimeForSqlite(),
      text: message,
      is_from_me: booleanToInteger(selectedReceiverIndex === 1),
      show_timestamp: booleanToInteger(false),
      group_id: 0,
      message_first_in_group: Utils.booleanToInteger(true),
      message_last_in_group: Utils.booleanToInteger(true),
      conversation_id: conversation.id,
      message_seen: booleanToInteger(true), // True 
    }
    
    handleMessageData(msg)
    setMessage('')
  }

  function handleCreateMessage(message: Message) {
    createMessage(message, conversation && conversation.id)
  }
  
  const handleMessageData = (msg: Message) => {
    let message: Message = msg

    // Get message by time, because timestamp is always unique and subtract 1 to get the previous message
    let previousMessage: Message = conversationMessages[conversationMessages.length - 1]
    
    if (previousMessage) {
      // Handle Message sent within an our
      const message_date = new Date(message.time)
      const previous_message_date = new Date(previousMessage.time)
      const secondsDifference = (message_date.getTime() - previous_message_date.getTime()) / 1000
      const within1HourCondition = secondsDifference < 3600 // 1 hour = 3600 seconds

      if (message.is_from_me === previousMessage.is_from_me) {
        if (within1HourCondition) {
          message.message_first_in_group = booleanToInteger(false)
          previousMessage.message_last_in_group = booleanToInteger(false)
          message.group_id = previousMessage.group_id
        } else {
          message.group_id = previousMessage.group_id + 1
          message.show_timestamp = booleanToInteger(true)
          message.message_first_in_group = booleanToInteger(true)
        }

      } else {
        message.group_id = previousMessage.group_id + 1
        
        if (!within1HourCondition) {
          message.show_timestamp = booleanToInteger(true)
          message.message_first_in_group = booleanToInteger(true)
        }
      }

    } else {
      // No Previous Message so it has to be the first message
      message.show_timestamp = booleanToInteger(true)
    }

    if (previousMessage) {
      updateMessageBulk(previousMessage.id, previousMessage).then(() => handleCreateMessage(message))
    } else {
      handleCreateMessage(message)
    }

  }

  return (
    <ThemeProvider useDark={darkMode}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <InstagramNavigationBar
          title={recipient.name}
          callback={() => navigation.goBack()}
          recipient={recipient}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, paddingBottom: 15 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={conversationMessages}
              ListHeaderComponent={<InstagramProfile recipient={recipient} />}
              renderItem={({ item, index }) => {
                return (
                  <InstagramMessage
                    message={item}
                    lastMessage={conversationMessages[index - 1]}
                    recipient={recipient}
                  />
                )
              }}
              style={{ flex: 1, marginRight: 5, marginLeft: 10 }}
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
          <InstagramTextInput
            messageInput={message}
            setMessageInput={setMessage}
            onSend={sendMessage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default InstagramConversation
