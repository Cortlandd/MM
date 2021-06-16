import React, { useState } from 'react'
import { View, Button, Text, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Config } from '@/Config'
import { ListItem, Avatar, ThemeProvider } from 'react-native-elements'
import Images from '@/Theme/Images'
import { useTheme } from '@/Theme'

const IndexNewConversation = () => {
  const navigation = useNavigation()
  const images = Images()
  const { darkMode } = useTheme()

  const determineRoute = (name) => {
    switch (name) {
      case Config.messagingPlatforms.Instagram:
        return Config.containerNames.NewInstagramConversation
      case Config.messagingPlatforms.Twitter:
        return Config.containerNames.NewTwitterConversation
      case Config.messagingPlatforms.Messenger:
        return Config.containerNames.NewGenericConversation
      case Config.messagingPlatforms.iMessage:
        return Config.containerNames.NewGenericConversation
      default:
        break
    }
  }

  return (
    <ThemeProvider useDark={darkMode}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Config.messagingPlatformList}
        renderItem={({ item }) => {
          return (
            <ListItem bottomDivider onPress={() => navigation.navigate(determineRoute(item.name), { item: item }) }>
              <Avatar source={images[item.name]} />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }}
      />
    </ThemeProvider>
  )
}

export default IndexNewConversation
