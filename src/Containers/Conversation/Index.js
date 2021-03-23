import React, { useState } from 'react'
import { View, Button, TextInput, Text, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { ReceivedMessage, SentMessage } from '@/Components'
import { Config } from '@/Config'
import { useDispatch } from 'react-redux'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import Images from '@/Theme/Images'

const IndexConversationContainer = ({ route, navigation }) => {
  const { item } = route.params
  const dispatch = useDispatch()
  const images = Images()

  function dynamicSort(property) {
    var sortOrder = 1
    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  }

  const [initialData] = useState([])
  const [messageData, setMessageData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(1)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginRight: 5, marginLeft: 10 }}>
        <FlatList
          data={initialData}
          renderItem={({ item, index }) => {
            if (item.type === 'sent') {
              return <SentMessage message={item} />
            } else {
              return <ReceivedMessage message={item} />
            }
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
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 5,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
          alignItems: 'center',
          height: 50,
        }}
      >
        <TextInput
          placeholder={'Message...'}
          style={{ width: '90%' }}
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <Icon
          name={'send'}
          style={{ marginLeft: 10 }}
          onPress={() => {
            const msg = {}
            msg.id = Math.round(Math.random() * 10000000).toString()
            msg.time = Date.now() + 10
            msg.message = message

            if (selectedReceiverIndex === 0) {
              // Receiver
              msg.type = 'received'
              msg.recipient = {
                name: 'Vito Corleone',
                image: images.FacebookMessenger,
              }
            } else {
              // Sender
              msg.type = 'sent'
              msg.recipient = {
                name: 'Vito Corleone',
                image: images.FacebookMessenger,
              }
            }
            setMessageData(initialData.push(msg))
            setMessage('')
          }}
        />
      </View>
    </View>
  )
}

export default IndexConversationContainer
