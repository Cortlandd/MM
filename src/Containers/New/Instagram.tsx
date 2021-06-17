import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator, Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { Avatar, Button, Icon, Input, ThemeProvider } from 'react-native-elements'
import Icons from '@/Theme/Icons'
import { useTheme } from '@/Theme'
import { Conversation, InstagramUserASearch, Recipient } from '@/Config/Types'
import { booleanToInteger } from '@/Config/Utils'
import * as Utils from '@/Config/Utils'
import { Config } from '@/Config'
import { useConversations } from '@/Hooks/useConversations'
import { useRecipients } from '@/Hooks/useRecipients'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '@/Store/User'
import FetchInstagramUser from '@/Store/User/FetchInstagramUser'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'NewInstagramConversation'>
}

const NewInstagramConversation = ({ navigation }: Props) => {
  const icons = Icons()
  const dispatch = useDispatch()
  const { Fonts, darkMode } = useTheme()
  const { createConversation, getLastConversation, refreshConversations } = useConversations()
  const { createRecipient, getLastRecipient } = useRecipients()
  
  const fetchInstagramUserListener = useSelector((state: { user: UserState }) => state.user.fetchInstagramUser.results)
  const fetchInstagramUserError = useSelector((state: { user: UserState }) => state.user.fetchInstagramUser.error)
  const fetchInstagramUserLoading = useSelector((state: { user: UserState }) => state.user.fetchInstagramUser.loading)
  
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [followersCount, setFollowersCount] = useState()
  const [postCount, setPostCount] = useState()
  const [followEachother, setFollowEachother] = useState(false)
  const [followingSince, setFollowingSince] = useState()
  const [mutualFollow, setMutualFollow] = useState('')
  const [mutualFollowCount, setMutualFollowCount] = useState()
  const [activityIndicatorAnimating, setActivityIndicatorAnimating] = useState(false)
  const [profileImage, setProfileImage] = useState('')
  const [verified, setVerified] = useState(false)
  
  const [userSearchResult, setUserSearchResult] = useState<InstagramUserASearch>()

  useEffect(() => {}, [dispatch])
  
  const searchUser = () => {
    if (username === '') {
      Alert.alert(
        'User Search (beta)',
        'Enter a username to search'
      )
    } else {
      Alert.alert(
        'User Search (beta)',
        'This search feature is experimental. Does not guarantee results.',
        [
          {
            text: 'OK',
            onPress: () => {
              try {
                dispatch(FetchInstagramUser.action(username))
                setUserSearchResult(fetchInstagramUserListener)

                if (fetchInstagramUserError) {
                  Alert.alert('User Search Error', 'Try again or fill in user information.')
                }

                if (fetchInstagramUserListener) {
                  setDisplayName(fetchInstagramUserListener.full_name)
                  setFollowersCount(fetchInstagramUserListener.edge_followed_by.count)
                  setPostCount(fetchInstagramUserListener.edge_owner_to_timeline_media.count)
                  setProfileImage(fetchInstagramUserListener.profile_pic_url)
                  setVerified(fetchInstagramUserListener.is_verified)
                }
              } catch (e) {
                Alert.alert('User Search Error', 'Try again or fill in user information.')
                console.log(e)
              }
            },
            style: 'default' },
          { text: 'Cancel', style: 'cancel' }
        ]
      )
    }
  }
  
  const processSave = () => {
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
      image: profileImage,
      username: username,
      follower_count: followersCount,
      created_at: Utils.getDatetimeForSqlite(),
      post_count: postCount,
      is_mutual_friends: booleanToInteger(followEachother),
      verified: booleanToInteger(verified),
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
          {fetchInstagramUserLoading && (<ActivityIndicator animating={true} size={'large'} />)}
          {fetchInstagramUserListener && fetchInstagramUserListener.profile_pic_url ? (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 150,
                padding: 10,
                borderColor: 'gray',
                height: 100,
                width: 100,
              }}
            >
              <Avatar
                containerStyle={{
                  alignSelf: 'center',
                }}
                size={100}
                rounded={true}
                source={{ uri: profileImage }}
              />
            </View>
          ) : (
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
          )}
          <View>
            <View style={{ alignSelf: 'center', width: '50%' }}>
              <Input
                onChangeText={(value) => setDisplayName(value)}
                placeholder={'Display Name'} style={{padding: 0}}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{displayName}</Text>
              </Input>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <TextInput onChangeText={(value) => setUsername(value.toLowerCase())} style={{padding: 0}} placeholder={'Username'}>
                <Text style={{ color: 'orange', fontSize: 16 }}>{username}</Text>
              </TextInput>
              <Text style={{ fontSize: 16 }}> · </Text>
              <Text style={{ fontSize: 16 }}>Instagram</Text>
              <Icon name={'search'} size={20} onPress={searchUser} />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
              <TextInput style={{
                color: 'gray',
                fontWeight: darkMode ? '600' : '400',
                fontSize: 16,
                textAlign: 'right',
                padding: 0
              }} keyboardType={'numeric'} onChangeText={(value) => setFollowersCount(value)} placeholder={'Follower Count'}>
                <Text style={{ color: 'orange' }}>{followersCount}</Text>
              </TextInput>
              <Text style={{ fontWeight: darkMode ? '600' : '400', fontSize: 16 }}> followers</Text>
              <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '400', fontSize: 16 }}>{' '}·{' '}</Text>
              <TextInput style={{
                color: 'orange',
                fontWeight: darkMode ? '600' : '400',
                fontSize: 16,
                padding: 0
              }} keyboardType={'numeric'} onChangeText={(value) => setPostCount(value)} placeholder={'Post Count'}>
                <Text style={{ color: 'orange' }}>{postCount}</Text>
              </TextInput>
              <Text style={{ fontWeight: darkMode ? '600' : '400', fontSize: 16 }}> posts</Text>
            </View>
            
            <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
              {followEachother
                ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'black' }}>You follow each other on Instagram</Text>
                  </View>
                )
                : (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'black' }}>You've followed this Instagram account since </Text>
                    <TextInput keyboardType={'numeric'} maxLength={4} style={{ color: 'orange', fontWeight: darkMode ? '600' : '400', fontSize: 16, padding: 0 }} onChangeText={(value) => setFollowingSince(value)} placeholder={'Year'}>
                      <Text style={{ fontSize: 16, color: 'orange' }}>{followingSince}</Text>
                    </TextInput>
                  </View>
                )}
              <Switch
                style={{ alignSelf: 'center' }}
                trackColor={{ false: 'gray', true: 'gray' }}
                onValueChange={(value) => setFollowEachother(value)}
                value={followEachother}
              />
            </View>
            {followEachother && (
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>You both follow </Text>
                <TextInput style={{ color: 'gray', padding: 0}} onChangeText={(value) => setMutualFollow(value.toLowerCase())} placeholder={'Mutual Follow'}>
                  <Text style={{ fontSize: 16, color: 'orange' }}>{mutualFollow}</Text>
                </TextInput>
                <Text style={{ fontSize: 16 }}> and </Text>
                <TextInput style={{ color: 'gray', padding: 0 }} keyboardType={'numeric'} onChangeText={(value) => setMutualFollowCount(value)} placeholder={'Mutual Follow Count'}>
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
