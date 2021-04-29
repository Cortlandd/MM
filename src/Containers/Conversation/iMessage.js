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
import IMessageNavigationBar from '@/Components/NavigationBar/iMessage'
import Images from '@/Theme/Images'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import IMessageTextInput from '@/Components/TextInput/iMessage'
import { IMessageMessage } from '@/Components'
import { moderateScale } from 'react-native-size-matters'

const IMessageConversation = ({ route, navigation }) => {
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
    msg.group_id = 0
    msg.message_first_in_group = false
    msg.is_from_me = selectedReceiverIndex === 1
    msg.show_arrow = true
    msg.recipient = {
      name: item.recipient.name,
      image: item.recipient.image,
    }

    initialData.push(msg)
    handleMessageData()
    setMessagesData(initialData)
    setMessage('')
  }

  const handleMessageData = () => {
    initialData.forEach(function (msg, index) {
      var lastMessage = initialData[index - 1]

      if (lastMessage) {
        if (msg.is_from_me !== lastMessage.is_from_me) {
          msg.message_first_in_group = true
          msg.group_id = lastMessage.group_id + 1
        } else {
          msg.group_id = lastMessage.group_id
          lastMessage.show_arrow = false
          msg.show_arrow = true
        }
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <IMessageNavigationBar
        title={item.recipient.name}
        callback={() => navigation.goBack()}
        userData={item}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={54}
        enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={initialData}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginTop: 1, marginBottom: 1 }}>
                  <IMessageMessage
                    is_from_me={item.is_from_me}
                    message={item}
                    lastMessage={initialData[index - 1]}
                  />
                  {item.is_from_me && index === initialData.length - 1 && (
                    <View
                      style={{
                        marginVertical: moderateScale(3, 2),
                        marginLeft: !item.is_from_me && 20,
                        marginRight: item.is_from_me && 20,
                        alignSelf: item.is_from_me && 'flex-end',
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'gray',
                          fontSize: 12,
                        }}
                      >
                        Delivered
                      </Text>
                    </View>
                  )}
                </View>
              )
            }}
            extraData={messagesData}
            style={{ flex: 1, marginRight: 5, marginLeft: 5 }}
            keyExtractor={(i, index) => i.id}
            ref={(ref) => (this.flatList = ref)}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>iMessage</Text>
              </View>
            }
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
