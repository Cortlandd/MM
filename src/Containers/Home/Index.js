import React, { useState } from 'react'
import { View, Button, Text, FlatList } from 'react-native'
import { Config } from '@/Config'
import { useTheme } from '@/Theme'
import { ListItem, Avatar } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native'

const IndexHomeContainer = ({ navigation }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Config.seedData.TestConversationList}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate(Config.containerNames.Conversation, {
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
    </View>
  )
}

export default IndexHomeContainer
