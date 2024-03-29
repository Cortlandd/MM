import React, { useEffect, useRef, useState } from 'react'
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
import { useRecipients } from '@/Hooks/useRecipients'
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import * as RNFS from 'react-native-fs'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'InstagramConversation'>;
  route: RouteProp<RootStackParamList, 'InstagramConversation'>
}

const InstagramConversation = ({ navigation, route }: Props) => {
  const { conversation, recipient } = route.params
  const { conversationMessages, createMessage, updateMessage, updateSingleMessage, updateMessageBulk } = useMessages(conversation)
  const images = Images()
  const { darkMode } = useTheme()

  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)
  const scrollViewRef = useRef();

  const sendMessage = (image: string = "") => {
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
    
    if (image !== "") msg.image = image
    
    handleMessageData(msg)
    setMessage('')
  }

  function handleCreateMessage(message: Message) {
    createMessage(message, conversation && conversation.id)
  }
  
  const uploadImage = () => {
    console.log("Uploading Image...")
    
    let res: ImagePickerResponse

    return launchImageLibrary({ mediaType: 'photo' }).then((response) => {
      if (response !== undefined && !response.didCancel && response.errorMessage !== '' && response.assets.length > 0) {
        res = response.assets[0]

        const fileName = res.fileName
        const uri = res.uri
        sendImage(uri, fileName)
      }
    })
  }
  
  function sendImage(uri: string, filename: string) {
    const newPath = Utils.messageImagePath(filename)
    return RNFS.moveFile(uri, newPath)
      .then().finally(() => {
        sendMessage(newPath)
      })
  }
  
  const handleMessageData = (msg: Message, image: string = "") => {
    let message: Message = msg

    // Get message by time, because timestamp is always unique and subtract 1 to get the previous message
    let previousMessageIndex = conversationMessages.findIndex(v => v.time === message.time) + 1
    let previousMessage: Message = conversationMessages[previousMessageIndex]
    
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
          navigationClick={() => navigation.navigate('ConversationSettings', { conversation: conversation, recipient: recipient, backRoute: 'InstagramConversation', platform: conversation.platform })}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, paddingBottom: 15 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
              <InstagramProfile recipient={recipient} />
              <FlatList
                data={conversationMessages}
                inverted={true}
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
            </ScrollView>
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
            onSend={() => sendMessage()}
            onImageUpload={uploadImage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default InstagramConversation
