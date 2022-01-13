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
import { Avatar, Button, Icon, Input, ThemeProvider, Overlay } from 'react-native-elements'
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
import * as ImagePicker from "react-native-image-picker"
import * as RNFS from 'react-native-fs'
import { Asset } from 'react-native-image-picker'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'NewInstagramConversation'>
}

const NewInstagramConversation = ({ navigation }: Props) => {
  const icons = Icons()
  const dispatch = useDispatch()
  const { Fonts, darkMode } = useTheme()
  const { createConversation, refreshConversations } = useConversations()
  const { createRecipient } = useRecipients()
  
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
  const [verified, setVerified] = useState(false)
  const [profileImage, setProfileImage] = useState('')
  const [localImage, setLocalImage] = useState<Asset>()
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [recipientImage, setRecipientImage] = useState('')
  const [finishedDownloading, setFinishedDownloading] = useState(false)
  const [tempLocalImage, setTempLocalImage] = useState('')

  useEffect(() => {}, [dispatch])

  function handleUrlProcessing() {
    if (localImage !== undefined) {
      RNFS.exists(Utils.imagePath(localImage.fileName)).then((exists) => {
        if (exists) {
          RNFS.unlink(Utils.imagePath(localImage.fileName)).then(() => {
            setLocalImage(undefined)
          })
        }
      })
    }
    
    const filename = profileImage.substring(profileImage.lastIndexOf('/') + 1);
    const ret = RNFS.downloadFile({ fromUrl: profileImage, toFile: Utils.imagePath(filename), });
    return ret.promise.then(async res => {
      setRecipientImage(Utils.imagePath(filename))
    }).catch(err => {
      console.error('Download Error: ', err);
    });
  }
  
  function processLocalImage() {
    if (profileImage !== '') {
      const filename = profileImage.substring(profileImage.lastIndexOf('/') + 1);
      RNFS.exists(Utils.imagePath(filename)).then((exists) => {
        if (exists) {
          RNFS.unlink(Utils.imagePath(filename)).then(() => {
            setProfileImage('')
          })
        }
      })
    }

    if (localImage !== undefined) {
      return RNFS.moveFile(localImage.uri, Utils.imagePath(localImage.fileName))
        .then(() => {
          setRecipientImage(Utils.imagePath(localImage.fileName))
          setTempLocalImage(Utils.imagePath(localImage.fileName))
        })
    }
  }
  
  function handleImageUpload() {
    const options: ImagePicker.ImageLibraryOptions = { 
      mediaType: 'photo',
    }
    ImagePicker.launchImageLibrary(options, async function(response) {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const res = response.assets[0]
        setLocalImage(res)
        setUrlInput('')

        setOverlayVisible(false)
      }
    })
  }
  
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

                if (fetchInstagramUserError) {
                  Alert.alert('User Search Error', 'Try again or fill in user information.')
                }

                if (fetchInstagramUserListener) {
                  setDisplayName(fetchInstagramUserListener.full_name)
                  setFollowersCount(fetchInstagramUserListener.edge_followed_by.count)
                  setPostCount(fetchInstagramUserListener.edge_owner_to_timeline_media.count)
                  setProfileImage(fetchInstagramUserListener.profile_pic_url)
                  setVerified(fetchInstagramUserListener.is_verified)
                  
                  // Clear local image
                  // setLocalImage(undefined)
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
        return
      }
    } else {
      if (username === '' || followingSince === '') {
        Alert.alert(
          "Required Fields Missing",
          "Username and Year are required."
        )
        return
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

    if (profileImage !== '') { handleUrlProcessing() }

    if (localImage !== undefined) { processLocalImage() }

    recipient.image = recipientImage

    createRecipient(recipient).then((r) => {
      conversation.recipient_id = r.id
      createConversation(conversation).then((c) => {
        setActivityIndicatorAnimating(false)
        refreshConversations().then(() => navigation.navigate(Config.containerNames.InstagramConversation, { conversation: c, recipient: r }))
      })
    })
  }
  
  return (
    <ThemeProvider useDark={darkMode} style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
        <View style={{ width: 350, padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: '500', textAlign: 'center' }}>Profile Image</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Input
              value={urlInput}
              onChangeText={(value) => setUrlInput(value)}
              placeholder={'Enter URL of Image'}
              textContentType={"URL"}
              rightIcon={(
                <Icon
                  name={'arrow-forward'}
                  color={'white'}
                  style={{ backgroundColor: Utils.isValidURL(urlInput) ? '#2089dc' : 'lightgray', borderRadius: 50, padding: 5 }}
                  type={'ionicon'}
                  onPress={() => {
                    setProfileImage(urlInput)
                    setLocalImage(undefined)
                    setOverlayVisible(false)
                  }}
                />
              )}
            />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', marginBottom: 10, color: 'gray' }}>Or</Text>
          <Button
            icon={
              <Icon name={'image'} type={'ionicon'} color={'white'} />
            }
            title={'Upload Image'}
            raised
            onPress={handleImageUpload}
          />
        </View>
      </Overlay>
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
          {profileImage || tempLocalImage ? (
            <View>
              <Icon name={'close'} style={{ alignSelf: 'center', marginLeft: 100, backgroundColor: 'lightgray', borderRadius: 50}} color={'red'} onPress={() => {
                setProfileImage('')
                setUrlInput('')
                setLocalImage(undefined)
              }} />
              <View style={{ alignSelf: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 150, borderColor: 'gray', height: 105, width: 105, }}>
                <Avatar
                  containerStyle={{
                    alignSelf: 'center',
                  }}
                  size={100}
                  rounded={true}
                  source={{ uri: profileImage !== '' ? profileImage : tempLocalImage }}
                  renderPlaceholderContent={(<ActivityIndicator animating={true} size={'large'} color={'white'} />)}
                />
              </View>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={() => setOverlayVisible(true)}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderRadius: 150,
                  padding: 10,
                  borderColor: 'gray',
                  height: 100,
                  width: 100,
                }}
              >
                <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: darkMode ? '#FFF' : 'gray', fontWeight: 'bold' }}>Profile Image</Text>
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
            <View style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'center', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <TextInput onChangeText={(value) => setUsername(value.toLowerCase())} style={{padding: 0}} placeholder={'Username'}>
                <Text style={{ color: 'orange', fontSize: 16 }}>{username}</Text>
              </TextInput>
              <Text style={{ fontSize: 16 }}> · </Text>
              <Text style={{ fontSize: 16 }}>Instagram</Text>
              <Icon name={'search'} size={20} onPress={searchUser} />
            </View>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
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
                style={{ marginBottom: 10, alignSelf: 'center' }}
                trackColor={{ false: 'gray', true: 'orange' }}
                onValueChange={(value) => setFollowEachother(value)}
                value={followEachother}
              />
            </View>
            {followEachother && (
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
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
