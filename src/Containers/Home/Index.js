import React, { useState } from 'react'
import { View, Button, Text, FlatList } from 'react-native'
import { Config } from '@/Config'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/Theme'
import { ListItem, Avatar } from 'react-native-elements'

const IndexHomeContainer = () => {
  const navigation = useNavigation()
  const { Layout, Images } = useTheme()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Config.seedData.TestConversationList}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <Avatar source={Images[item.platform]} />
            <ListItem.Content>
              <ListItem.Title>To: {item.recipient}</ListItem.Title>
              <ListItem.Subtitle>From: {item.sender}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
    </View>
  )
}

export default IndexHomeContainer
