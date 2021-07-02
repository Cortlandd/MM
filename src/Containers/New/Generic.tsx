import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  PlatformColor, Image, TouchableWithoutFeedback,
} from 'react-native'
import { Icon, Input, Button, ThemeProvider, Overlay } from 'react-native-elements'
import { useTheme } from '@/Theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Config } from '@/Config'
import ImageUploadOverlay from '@/Components/ImageUploadOverlay'
import * as Utils from '@/Config/Utils'
import * as ImagePicker from "react-native-image-picker"
import * as RNFS from 'react-native-fs'

const NewGenericConversation = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { item } = route.params
  const { darkMode } = useTheme()

  // Facebook
  const [isFaceBookFriends, setIsFacebookFriends] = useState(false)
  
  // Form Specific
  const [urlInput, setUrlInput] = useState('')
  const [uploadResponse, setUploadResponse] = useState(undefined)
  const [overlayVisibility, setOverlayVisibility] = useState(false)
  const [tempUploadImage, setTempUploadImage] = useState('')
  const [profileURL, setProfileURL] = useState('')
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [username, setUsername] = useState('')
  const [friendCount, setFriendCount] = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [recipientImage, setRecipientImage] = useState()
  
  useEffect(() =>{
    if (profileURL !== '') {
      processURLImage()
    }
  }, [profileURL])

  useEffect(() => {
    if (uploadResponse !== undefined) processLocalImage()
  }, [uploadResponse])

  function openPhotos() {
    const options = {
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
    if (uploadResponse === undefined) { return }

    if (profileURL !== '') {
      const filename = profileURL.substring(profileURL.lastIndexOf('/') + 1);
      RNFS.exists(Utils.imagePath(filename)).then((exists) => {
        if (exists) RNFS.unlink(Utils.imagePath(filename)).then(() => {setProfileURL('')})
      })
    }
    
    RNFS.moveFile(uploadResponse.uri, Utils.imagePath(uploadResponse.fileName))
      .then(() => {
        setRecipientImage(Utils.imagePath(uploadResponse.fileName))
        setTempUploadImage(Utils.imagePath(uploadResponse.fileName))
      })
    
  }
  
  function processURLImage() {
    if (profileURL === '') { return }

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
                    setProfileImage(urlInput)
                    setLocalImage(undefined)
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          {profileURL || tempUploadImage ? (
            <View>
              
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
            {item.name === Config.messagingPlatforms.Twitter ? (
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
              {item.name === Config.messagingPlatforms.Messenger && (
                <Col style={{ width: '50%' }}>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Friend Count'}
                    value={friendCount}
                    onChangeText={(value) => setFriendCount(value)}
                  />
                </Col>
              )}
              {item.name === Config.messagingPlatforms.Twitter && (
                <Col>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Follower Count'}
                    value={followerCount}
                    onChangeText={(value) => setFollowerCount(value)}
                  />
                </Col>
              )}
              {item.name === Config.messagingPlatforms.Twitter && (
                <Col>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Following Count'}
                    value={followingCount}
                    onChangeText={(value) => setFollowingCount(value)}
                  />
                </Col>
              )}
            </Row>
            {item.name === Config.messagingPlatforms.Messenger && (
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
          <Button title={'Save'} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default NewGenericConversation
