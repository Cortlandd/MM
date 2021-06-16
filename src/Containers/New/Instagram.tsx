import React, { useState } from 'react'
import {
  ActivityIndicator, Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { Button, Icon, Input, ThemeProvider } from 'react-native-elements'
import Icons from '@/Theme/Icons'
import { useTheme } from '@/Theme'
import { Conversation, Recipient } from '@/Config/Types'
import { booleanToInteger } from '@/Config/Utils'
import * as Utils from '@/Config/Utils'
import { Config } from '@/Config'
import { useConversations } from '@/Hooks/useConversations'
import { useRecipients } from '@/Hooks/useRecipients'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'NewInstagramConversation'>
}

const NewInstagramConversation = ({ navigation }: Props) => {
  const icons = Icons()
  const { Fonts, darkMode } = useTheme()
  const { createConversation, getLastConversation, refreshConversations } = useConversations()
  const { createRecipient, getLastRecipient } = useRecipients()
  
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [followersCount, setFollowersCount] = useState()
  const [postCount, setPostCount] = useState()
  const [followEachother, setFollowEachother] = useState(false)
  const [followingSince, setFollowingSince] = useState()
  const [mutualFollow, setMutualFollow] = useState('')
  const [mutualFollowCount, setMutualFollowCount] = useState()
  const [activityIndicatorAnimating, setActivityIndicatorAnimating] = useState(false)

  const processSave = () => {
    console.log('SAVE CLICKED')

    if (followEachother) {
      if (username === '') {
        Alert.alert(
          "Required Field Missing",
          "Username is required"
        )
      }
    } else {
      if (username === '' || followingSince === '') {
        Alert.alert(
          "Required Fields Missing",
          "Username and Year are required."
        )
      }
    }

    setActivityIndicatorAnimating(true)
    
    let recipient: Recipient = {
      name: displayName,
      username: username,
      follower_count: followersCount,
      created_at: Utils.getDatetimeForSqlite(),
      post_count: postCount,
      is_mutual_friends: booleanToInteger(followEachother),
    }
    
    if (followEachother) {
      recipient.mutual_friend = mutualFollow
      recipient.mutual_friends_count = mutualFollowCount
    } else {
      recipient.friend_since_year = followingSince
    }

    const conversation: Conversation = {
      created_at: Utils.getDatetimeForSqlite(),
      updated_at: Utils.getDatetimeForSqlite(),
      platform: Config.messagingPlatforms.Instagram,
    }

    createRecipient(recipient).then(() => {
      getLastRecipient().then((r) => {
        conversation.recipient_id = r.id
        createConversation(conversation).then(() => {
          getLastConversation().then((c) => {
            setActivityIndicatorAnimating(false)
            refreshConversations().then(() => navigation.navigate(Config.containerNames.InstagramConversation, { conversation: c, recipient: r }))
          })
        })
      })
    })
  }
  
  return (
    <ThemeProvider useDark={darkMode} style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ alignSelf: 'flex-end' }}><Icon name={'close'} onPress={() => navigation.goBack()} size={40} /></View>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}>
          <TouchableWithoutFeedback onPress={() => console.log('')}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 150,
                padding: 10,
                borderColor: 'gray',
                height: 150,
                width: 150,
              }}
            >
              <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: darkMode ? '#FFF' : 'gray', fontWeight: 'bold' }}>Upload Profile Image</Text>
                <Icon name={'add'} color={'green'} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <View style={{ alignSelf: 'center', width: '50%' }}>
              <Input
                onChangeText={(value) => setDisplayName(value)}
                placeholder={'Display Name'}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{displayName}</Text>
              </Input>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', justifyContent: 'center', marginBottom: 10 }}>
              <TextInput onChangeText={(value) => setUsername(value.toLowerCase())} placeholder={'Username'}>
                <Text style={{ color: 'orange', fontSize: 16 }}>{username}</Text>
              </TextInput>
              <Text style={{ fontSize: 16 }}> · </Text>
              <Text style={{ fontSize: 16 }}>Instagram</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
              <TextInput style={{
                color: 'gray',
                fontWeight: darkMode ? '600' : '400',
                fontSize: 16,
              }} keyboardType={'numeric'} onChangeText={(value) => setFollowersCount(value)} placeholder={'Follower Count'}>
                <Text style={{ color: 'orange' }}>{followersCount}</Text>
              </TextInput>
              <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '400', fontSize: 16 }}> followers</Text>
              <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '400', fontSize: 16 }}>{' '}·{' '}</Text>
              <TextInput style={{
                color: 'orange',
                fontWeight: darkMode ? '600' : '400',
                fontSize: 16,
              }} keyboardType={'numeric'} onChangeText={(value) => setPostCount(value)} placeholder={'Post Count'}>
                <Text style={{ color: 'orange' }}>{postCount}</Text>
              </TextInput>
              <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '400', fontSize: 16 }}> posts</Text>
            </View>
            
            <View style={{ justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }}>
              {followEachother
                ? (
                  <Text style={{ color: 'gray', fontSize: 16 }}>You follow each other on Instagram</Text>
                )
                : (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>You've followed this Instagram account since </Text>
                    <TextInput keyboardType={'numeric'} maxLength={4} style={{ color: 'orange', fontWeight: darkMode ? '600' : '400', fontSize: 16 }} onChangeText={(value) => setFollowingSince(value)} placeholder={'Year'}>
                      <Text style={{ fontSize: 16, color: 'orange' }}>{followingSince}</Text>
                    </TextInput>
                  </View>
                )}
              <Switch
                style={{ alignSelf: 'center' }}
                trackColor={{ false: '#765077', true: '#81b0ff' }}
                onValueChange={(value) => setFollowEachother(value)}
                value={followEachother}
              />
            </View>
            {followEachother && (
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ fontSize: 16 }}>You both follow </Text>
                <TextInput style={{ color: 'gray'}} onChangeText={(value) => setMutualFollow(value.toLowerCase())} placeholder={'Mutual Follow'}>
                  <Text style={{ fontSize: 16, color: 'orange' }}>{mutualFollow}</Text>
                </TextInput>
                <Text style={{ fontSize: 16 }}> and </Text>
                <TextInput style={{ color: 'gray'}} keyboardType={'numeric'} onChangeText={(value) => setMutualFollowCount(value)} placeholder={'Mutual Follow Count'}>
                  <Text style={{ fontSize: 16, color: 'orange' }}>{mutualFollowCount}</Text>
                </TextInput>
                <Text style={{ fontSize: 16 }}> others</Text>
              </View>
            )}
          </View>
          <ActivityIndicator animating={activityIndicatorAnimating} color={'gray'} size={'large'} />
        </KeyboardAvoidingView>
        <Button onPress={() => processSave()} title={'Save'} />
      </SafeAreaView>
    </ThemeProvider>  
  )
}

export default NewInstagramConversation
