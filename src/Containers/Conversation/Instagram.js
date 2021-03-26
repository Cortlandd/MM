import React, { useState } from 'react'
import { View, TouchableOpacity, FlatList, SafeAreaView, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import Images from '@/Theme/Images'
import InstagramNavigationBar from '@/Components/NavigationBar/Instagram'
import { InstagramMessage, ReceivedMessage, SentMessage } from '@/Components'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import InstagramTextInput from '@/Components/TextInput/Instagram'

const InstagramConversation = ({ route, navigation }) => {
  const { item } = route.params
  const dispatch = useDispatch()
  const images = Images()

  const [initialData] = useState([])
  const [messageData, setMessageData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  const sendMessage = () => {
    const msg = {}
    msg.id = Math.round(Math.random() * 10000000).toString()
    msg.time = Date.now() + 10
    msg.message = message

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
    setMessageData(initialData.push(msg))
    setMessage('')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <InstagramNavigationBar
        title={item.recipient.name}
        callback={() => navigation.goBack()}
        userData={item}
      />
      <View style={{ flex: 1, marginRight: 5, marginLeft: 10 }}>
        <FlatList
          data={initialData}
          renderItem={({ item, index }) => {
            return (
              <InstagramMessage is_from_me={item.is_from_me} message={item} />
            )
          }}
          extraData={messageData}
          keyExtractor={(i, index) => i.id}
          ListEmptyComponent={
            <View>
              <Text>The start of the conversation.</Text>
            </View>
          }
        />
        <Text>{JSON.stringify(item)}</Text>
      </View>
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
    </SafeAreaView>
  )
}

export default InstagramConversation
