import React, { useEffect, useState } from 'react'
import { View, Button, Text, FlatList, SafeAreaView } from 'react-native'
import { Config } from '@/Config'
import { useTheme } from '@/Theme'
import { ListItem, Avatar, ThemeProvider } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native'
import DatabaseManager from '@/Config/Database/DatabaseManager'
import * as Utils from '@/Config/Utils'
import Images from '@/Theme/Images'
import { useConversations } from '@/Hooks/useConversations'
import { useRecipients } from '@/Hooks/useRecipients'

const IndexHomeContainer = ({ navigation }) => {
  const { darkMode } = useTheme()
  const images = Images()
  // Use the useLists hook to simplify list management.
  const { conversations } = useConversations()

  const ConversationRow = ({ conversation }) => {
    const { conversationRecipient } = useRecipients(conversation.recipient_id)

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate(Utils.determineRoute(conversation.platform), {
            conversation: conversation,
            recipient: conversationRecipient && conversationRecipient,
          })
        }
      >
        <ListItem bottomDivider>
          <Avatar source={Utils.getPlatformLogo(conversation.platform)} />
          <ListItem.Content>
            <ListItem.Title>
              <Text style={{ fontWeight: 'bold' }}>
                {conversationRecipient && conversationRecipient.name}
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text style={{ color: 'gray', fontSize: 12 }}>{conversation.updated_at}</Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <ThemeProvider useDark={darkMode}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={conversations ? conversations : []}
          renderItem={({ item }) => item ? (<ConversationRow conversation={item} />) : (<View><Text>No Conversations</Text></View>)}
        />
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default IndexHomeContainer
