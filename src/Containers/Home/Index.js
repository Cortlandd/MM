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
import { Svg, Path } from 'react-native-svg'

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
              {conversationRecipient && (
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {conversationRecipient.name}
                  </Text>
                  {conversationRecipient.verified && (
                    <Svg viewBox="0 0 24 24" width={20} fill={'#1DA1F2'} aria-label="Verified account">
                      <Path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25a3.606 3.606 0 00-1.336-.25c-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5a.749.749 0 01-1.041.208l-.115-.094-2.415-2.415a.749.749 0 111.06-1.06l1.77 1.767 3.825-5.74a.75.75 0 011.25.833z" />
                    </Svg>
                  )}
                </View>
              )}
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
