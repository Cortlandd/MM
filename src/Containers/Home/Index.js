import React, { useState } from 'react'
import { View, Button, Text, FlatList, SafeAreaView } from 'react-native'
import { Config } from '@/Config'
import { useTheme } from '@/Theme'
import { ListItem, Avatar, ThemeProvider } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native'

const IndexHomeContainer = ({ navigation }) => {
  const { darkMode } = useTheme()

  const determineRoute = (route) => {
    switch (route) {
      case Config.messagingPlatforms.Instagram:
        return Config.containerNames.InstagramConversation
      case Config.messagingPlatforms.Twitter:
        return Config.containerNames.TwitterConversation
      case Config.messagingPlatforms.Messenger:
        return Config.containerNames.MessengerConversation
      case Config.messagingPlatforms.iMessage:
        return Config.containerNames.iMessageConversation
      default:
        break
    }
  }

  return (
    <ThemeProvider useDark={darkMode}>
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
    </ThemeProvider>
  )
}

export default IndexHomeContainer
