import React, { useState } from 'react'
import { View, Button, Text, FlatList, SafeAreaView } from 'react-native'
import { Config } from '@/Config'
import { useTheme } from '@/Theme'
import { ListItem, Avatar } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native'

const IndexHomeContainer = ({ navigation }) => {
  const { Layout, Images } = useTheme()

  const determineRoute = (route) => {
    switch (route) {
      case Config.messengerPlatforms.Instagram:
        return Config.containerNames.InstagramConversation
      case Config.messengerPlatforms.Twitter:
        return Config.containerNames.TwitterConversation
      case Config.messengerPlatforms.Messenger:
        return Config.containerNames.MessengerConversation
      case Config.messengerPlatforms.iMessage:
        return Config.containerNames.iMessageConversation
      default:
        break
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Config.seedData.TestConversationList}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate(determineRoute(item.platform), {
                item: item,
              })
            }
          >
            <ListItem bottomDivider>
              <Avatar source={item.recipient.image} />
              <ListItem.Content>
                <ListItem.Title>To: {item.recipient.name}</ListItem.Title>
                <ListItem.Subtitle>From: {item.sender.name}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  )
}

export default IndexHomeContainer
