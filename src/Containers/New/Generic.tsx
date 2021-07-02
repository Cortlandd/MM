import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  PlatformColor, Image, TouchableWithoutFeedback, ActivityIndicator, Alert,
} from 'react-native'
import { Icon, Input, Button, ThemeProvider, Overlay, Avatar } from 'react-native-elements'
import { useTheme } from '@/Theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Config } from '@/Config'
import ImageUploadOverlay from '@/Components/ImageUploadOverlay'
import * as Utils from '@/Config/Utils'
import * as ImagePicker from "react-native-image-picker"
import * as RNFS from 'react-native-fs'
import { RootStackParamList } from '@/Navigators/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Asset, ImageLibraryOptions } from 'react-native-image-picker'
import { Conversation, Recipient } from '@/Config/Types'
import { useConversations } from '@/Hooks/useConversations'
import { useRecipients } from '@/Hooks/useRecipients'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'NewGenericConversation'>;
  route: RouteProp<RootStackParamList, 'NewGenericConversation'>
}

const NewGenericConversation = ({ navigation, route }: Props) => {
  const dispatch = useDispatch()
  const { platform } = route.params
  const { darkMode } = useTheme()
  const { createConversation, refreshConversations } = useConversations()
  const { createRecipient } = useRecipients()

  // Facebook
  const [isFaceBookFriends, setIsFacebookFriends] = useState(false)
  
  // Form Specific
  const [urlInput, setUrlInput] = useState('')
  const [uploadResponse, setUploadResponse] = useState<Asset>()
  const [overlayVisibility, setOverlayVisibility] = useState(false)
  const [tempUploadImage, setTempUploadImage] = useState('')
  const [profileURL, setProfileURL] = useState('')
  const [activityIndicatorAnimating, setActivityIndicatorAnimating] = useState(false)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [username, setUsername] = useState('')
  const [friendCount, setFriendCount] = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [followerCount, setFollowerCount] = useState<number>(0)
  const [followingCount, setFollowingCount] = useState<number>(0)
  const [recipientImage, setRecipientImage] = useState<string>()
  
  useEffect(() =>{
    if (profileURL !== '') processURLImage()
  }, [profileURL])

  useEffect(() => {
    if (uploadResponse !== undefined) processLocalImage()
  }, [uploadResponse])

  function openPhotos() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }

    // Handle selected image
    ImagePicker.launchImageLibrary(options, async function(response) {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const res = response.assets[0]
        setUploadResponse(res)
        setOverlayVisibility(false)
      }
    })
  }
  
  function processLocalImage() {
    if (profileURL !== '') {
      const filename = profileURL.substring(profileURL.lastIndexOf('/') + 1);
      RNFS.exists(Utils.imagePath(filename)).then((exists) => {
        if (exists) RNFS.unlink(Utils.imagePath(filename)).then(() => {setProfileURL('')})
      })
    }
    
    if (uploadResponse && uploadResponse.uri) {
      RNFS.moveFile(uploadResponse.uri, Utils.imagePath(uploadResponse.fileName))
        .then(() => {
          setRecipientImage(Utils.imagePath(uploadResponse.fileName))
          setTempUploadImage(Utils.imagePath(uploadResponse.fileName))
        })
    }
  }
  
  function discardImages() {
    if (profileURL !== '') {
      const filename = profileURL.substring(profileURL.lastIndexOf('/') + 1);
      RNFS.exists(Utils.imagePath(filename)).then((exists) => {
        if (exists) RNFS.unlink(Utils.imagePath(filename)).then(() => {setProfileURL('')})
      })
    }

    if (uploadResponse !== undefined) {
      RNFS.exists(Utils.imagePath(uploadResponse.fileName)).then((exists) => {
        if (exists) {
          RNFS.unlink(Utils.imagePath(uploadResponse.fileName)).then(() => {
            setUploadResponse(undefined)
          })
        }
      })
    }
  }
  
  function errorCheck() {
    switch (platform) {
      case Config.messagingPlatforms.Messenger: {
        if (firstName === '' || lastName === '') {
          Alert.alert('Required Field Missing', 'First Name and Last Name are required.')
          return
        }
        break
      }
      case Config.messagingPlatforms.iMessage: {
        if (firstName === '' || firstName === ' ') {
          Alert.alert('Required Field Missing', 'First Name is a required.')
          return
        }
        break
      }
      case Config.messagingPlatforms.Twitter: {
        
      }
      default: {
        break
      }
    }
  }
  
  function processURLImage() {
    // Clear uploaded image if applicable
    if (uploadResponse !== undefined) {
      RNFS.exists(Utils.imagePath(uploadResponse.fileName)).then((exists) => {
        if (exists) {
          RNFS.unlink(Utils.imagePath(uploadResponse.fileName)).then(() => {
            setUploadResponse(undefined)
          })
        }
      })
    }
    
    if (profileURL !== '') {
      const fileExtension = Utils.getURLExtension(profileURL)
      const filename = `${Utils.createGuid()}.${fileExtension}`
      const ret = RNFS.downloadFile({ fromUrl: profileURL, toFile: Utils.imagePath(filename) })
      ret.promise.then(async res => {
        setRecipientImage(Utils.imagePath(filename))
      }).catch((error) => {
        console.log('Download Error:', error)
      })
    }
  }
  
  function processSave() {
    errorCheck()

    setActivityIndicatorAnimating(true)

    let recipient: Recipient = {}
    
    switch (platform) {
      case Config.messagingPlatforms.Messenger: {
        recipient.first_name = firstName
        recipient.last_name = lastName
        recipient.is_mutual_friends = Utils.booleanToInteger(isFaceBookFriends)
        recipient.created_at = Utils.getDatetimeForSqlite()
        recipient.city = city
        recipient.state = state
        recipient.mutual_friends_count = friendCount | 0
        recipient.image = recipientImage
        break
      }
      
      case Config.messagingPlatforms.iMessage: {
        recipient.first_name = firstName
        recipient.last_name = lastName
        recipient.created_at = Utils.getDatetimeForSqlite()
        recipient.image = recipientImage
        break
      }
      
      case Config.messagingPlatforms.Twitter: {
        break
      }
      
      default: {
        break
      }
    }
    
    const conversation: Conversation = {
      created_at: Utils.getDatetimeForSqlite(),
      updated_at: Utils.getDatetimeForSqlite(),
      platform: platform,
    }

    createRecipient(recipient).then((r) => {
      conversation.recipient_id = r.id
      createConversation(conversation).then((c) => {
        setActivityIndicatorAnimating(false)
        refreshConversations().then(() => navigation.navigate(Utils.getConversationContainer(platform), { conversation: c, recipient: r }))
      })
    })
    
  }

  return (
    <ThemeProvider useDark={darkMode}>
      <Overlay isVisible={overlayVisibility} onBackdropPress={() => setOverlayVisibility(false)}>
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
                    setProfileURL(urlInput)
                    setOverlayVisibility(false)
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
            onPress={openPhotos}
          />
        </View>
      </Overlay>
      <SafeAreaView
        style={{
          flex: 1,
          ...Platform.select({
            ios: { backgroundColor: PlatformColor('systemBackground') },
            android: { backgroundColor: 'white' },
          }),
        }}
      >
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Icon name={'close'} onPress={() => navigation.goBack()} size={40} />
        </View>
        <ActivityIndicator animating={activityIndicatorAnimating} color={'gray'} size={'large'} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          {profileURL || tempUploadImage ? (
            <View>
              <Icon
                name={'close'}
                style={{ alignSelf: 'center', marginLeft: 100, backgroundColor: 'lightgray', borderRadius: 50}}
                color={'red'}
                onPress={() => {
                  setUrlInput('')
                  discardImages()
                  setProfileURL('')
                  setUploadResponse(undefined)
                }}
              />
              <View style={{ alignSelf: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 150, borderColor: 'gray', height: 105, width: 105, }}>
                <Avatar
                  containerStyle={{
                    alignSelf: 'center',
                  }}
                  size={100}
                  rounded={true}
                  source={{ uri: profileURL !== '' ? profileURL : tempUploadImage }}
                  renderPlaceholderContent={(<ActivityIndicator animating={true} size={'large'} color={'white'} />)}
                />
              </View>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={() => setOverlayVisibility(true)}>
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
          <Grid>
            {platform === Config.messagingPlatforms.Twitter ? (
              <View>
                <Row style={{ height: 50 }}>
                  <Col>
                    <Input value={displayName} onChangeText={(value) => setDisplayName(value)} placeholder={'Display Name'} />
                  </Col>
                  <Col>
                    <Input value={username} onChangeText={(value) => setUsername(value)} placeholder={'Username'} />
                  </Col>
                </Row>
              </View>
            ) : (
              <View>
                <Row style={{ height: 50 }}>
                  <Col>
                    <Input value={firstName} onChangeText={(value) => setFirstName(value)} placeholder={'First Name'} />
                  </Col>
                  <Col>
                    <Input value={lastName} onChangeText={(value) => setLastName(value)} placeholder={'Last Name'} />
                  </Col>
                </Row>
              </View>
            )}
            <Row style={{ height: 50 }}>
              {platform === Config.messagingPlatforms.Messenger && (
                <Col style={{ width: '50%' }}>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Friend Count'}
                    value={friendCount.toString()}
                    onChangeText={(value) => setFriendCount(value)}
                  />
                </Col>
              )}
              {platform === Config.messagingPlatforms.Twitter && (
                <Col>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Follower Count'}
                    value={followerCount.toString()}
                    onChangeText={(value) => setFollowerCount(value)}
                  />
                </Col>
              )}
              {platform === Config.messagingPlatforms.Twitter && (
                <Col>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Following Count'}
                    value={followingCount.toString()}
                    onChangeText={(value) => setFollowingCount(value)}
                  />
                </Col>
              )}
            </Row>
            {platform === Config.messagingPlatforms.Messenger && (
              <View>
                <Row style={{ height: 50 }}>
                  <Col>
                    <Input value={city} onChangeText={(value) => setCity(value)} placeholder={'City (Optional)'} />
                  </Col>
                  <Col>
                    <Input value={state} onChangeText={(value) => setState(value)} placeholder={'State (Optional)'} />
                  </Col>
                </Row>
                <Row style={{ height: 50, marginLeft: 10 }}>
                  <Col>
                    <Text style={{ color: darkMode ? '#FFF' : '#000' }}>
                      Facebook Friends?
                    </Text>
                    <Switch
                      trackColor={{ false: '#765077', true: '#81b0ff' }}
                      onValueChange={(value) => setIsFacebookFriends(value)}
                      value={isFaceBookFriends}
                    />
                  </Col>
                </Row>
              </View>
            )}
          </Grid>
        </KeyboardAvoidingView>
        <Button
          title={'Save'}
          onPress={processSave}
        />
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default NewGenericConversation
