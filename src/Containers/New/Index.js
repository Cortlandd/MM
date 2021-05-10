import React, { useState } from 'react'
import { View, Button, Text, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Config } from '@/Config'
import { ListItem, Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const IndexNewConversation = () => {
  const navigation = useNavigation()
  const images = Images()

  const determineRoute = (name) => {
    switch (name) {
      case Config.messagingPlatforms.Instagram:
        return Config.containerNames.InstagramNewConversation
      case Config.messagingPlatforms.Twitter:
        return Config.containerNames.TwitterNewConversation
      case Config.messagingPlatforms.Messenger:
        return Config.containerNames.MessengerNewConversation
      case Config.messagingPlatforms.iMessage:
        return Config.containerNames.iMessageNewConversation
      default:
        break
    }
  }

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={Config.messagingPlatformList}
      renderItem={({ item }) => {
        return (
          <ListItem bottomDivider onPress={() => navigation.navigate(determineRoute(item.name)) }>
            <Avatar source={images[item.name]} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
      }}
    />
  )
}

export default IndexNewConversation
