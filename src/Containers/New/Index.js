import React, { useState } from 'react'
import { View, Button, Text, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Config } from '@/Config'
import { ListItem, Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const IndexNewConversation = () => {
  const navigation = useNavigation()
  const images = Images()

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={Config.messagingPlatformList}
      renderItem={({ item }) => {
        return (
          <ListItem bottomDivider onPress={() => console.log(item.name)}>
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
