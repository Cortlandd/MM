import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { View, TextInput, Text } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { Button, Switch, Avatar, Input, Icon, Overlay } from 'react-native-elements'
import { SettingsData, SettingsScreen } from 'react-native-settings-screen'
import { booleanToInteger, validateBoolean } from '@/Config/Utils'
import { Config } from '@/Config'
import { CommonActions } from '@react-navigation/native';
import IMessageFooter from '@/Components/Footer/IMessageFooter'
import MessengerProfile from '@/Components/Profile/Messenger'
import MessengerFooter from '@/Components/Footer/MessengerFooter'
import TwitterFooter from '@/Components/Footer/TwitterFooter'
import InstagramFooter from '@/Components/Footer/InstagramFooter'
import { useRecipients } from '@/Hooks/useRecipients'
import { Recipient } from '@/Config/Types'
import * as RNFS from 'react-native-fs'
import * as Utils from '@/Config/Utils'
import * as ImagePicker from "react-native-image-picker"
import { Asset } from 'react-native-image-picker'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ConversationSettings'>,
  route: RouteProp<RootStackParamList, 'ConversationSettings'>,
}

const ConversationSettings = ({ navigation, route }: Props) => {
  const { conversation, recipient, backRoute } = route.params
  
  const { updateRecipient } = useRecipients(conversation.id)
  
  // Conversation
  const [conversationPlatform, setConversationPlatform] = useState(conversation.platform)
  
  // Misc
  const [tempImage, setTempImage] = useState()
  const [tempImagePath, setTempImagePath] = useState()
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [uploadResponse, setUploadResponse] = useState<Asset>()
  
  // Recipient
  const [name, setName] = useState(recipient.name)
  const [firstName, setFirstName] = useState(recipient.first_name)
  const [lastName, setLastName] = useState(recipient.last_name)
  const [image, setImage] = useState(recipient.image || tempImage)
  const [username, setUsername] = useState(recipient.username)
  const [worksAt, setWorksAt] = useState(recipient.works_at)
  const [education, setEducation] = useState(recipient.education)
  const [city, setCity] = useState(recipient.city)
  const [state, setState] = useState(recipient.state)
  const [followerCount, setFollowerCount] = useState(recipient.follower_count)
  const [followingCount, setFollowingCount] = useState(recipient.following_count)
  const [postCount, setPostCount] = useState(recipient.post_count)
  const [joinDate, setJoinDate] = useState(recipient.join_date)
  const [biography, setBiography] = useState(recipient.biography)
  const [verified, setVerified] = useState(validateBoolean(recipient.verified))
  const [isMutualFriends, setIsMutualFriends] = useState(validateBoolean(recipient.is_mutual_friends))
  const [mutualFriendsCount, setMutualFriendsCount] = useState(recipient.mutual_friends_count)
  const [mutualFriend, setMutualFriend] = useState(recipient.mutual_friend)
  const [friendSinceYear, setFriendSinceYear] = useState(recipient.friend_since_year)
  
  function processLocalImage() {
    if (uploadResponse !== undefined) {
      if (urlInput !== '') {
        const filename = image.substring(image.lastIndexOf('/') + 1);
        const ret = RNFS.downloadFile({ fromUrl: image, toFile: Utils.imagePath(filename)});
        return ret.promise.then(async res => {
          setTempImagePath(Utils.imagePath(filename))
        }).catch(err => {
          console.error('Download Error: ', err);
        });
      } else {
        return RNFS.moveFile(uploadResponse.uri, Utils.imagePath(uploadResponse.fileName))
          .then(() => {
            setImage(Utils.imagePath(uploadResponse.fileName))
            setTempImage(Utils.imagePath(uploadResponse.fileName))
          })
      }
    }
  }

  function handleImageUpload() {
    setUploadResponse(undefined)
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
        setUploadResponse(res)
        setTempImage(res.uri)
        setTempImagePath(Utils.imagePath(res.fileName))
        setUrlInput('')
        console.log('upload response', uploadResponse)

        setOverlayVisible(false)
      }
    })
  }
  
  const conversationData: SettingsData = [
    {
      type: 'SECTION',
      header: 'Recipient',
      rows: [
        {
          title: 'Image',
          renderAccessory: () => (
            <View>
              <Avatar rounded={true} source={{ uri: tempImage ? tempImage : recipient.image }} />
            </View>
          ),
          onPress: () => setOverlayVisible(true),
          showDisclosureIndicator: true,
        },
      ]
    },
    {
      type: 'CUSTOM_VIEW',
      render: () => {
        if (conversation.platform === Config.messagingPlatforms.iMessage) {
          return (<IMessageFooter recipient={recipient} firstName={firstName} tempImage={tempImage} lastName={lastName} />)
        } else if (conversation.platform === Config.messagingPlatforms.Messenger) {
          return (<MessengerFooter isFriends={isMutualFriends} tempImage={tempImage} city={city} state={state} firstName={firstName} lastName={lastName} worksAt={worksAt} education={education} image={recipient.image} platform={conversation.platform} />)
        } else if (conversation.platform === Config.messagingPlatforms.Twitter) {
          return (<TwitterFooter name={name} username={username} following_count={followingCount} follower_count={followerCount} join_date={joinDate} biography={biography} verified={verified} />)
        } else if (conversation.platform === Config.messagingPlatforms.Instagram) {
          return (<InstagramFooter name={name} tempImage={tempImage} username={username} image={image} verified={verified} follower_count={followerCount} is_mutual_friends={isMutualFriends} mutual_friend={mutualFriend} post_count={postCount} mutual_friends_count={mutualFriendsCount} friend_since_year={friendSinceYear} />)
        }
      }
    }
  ]
  
  function instagramFields() {
    conversationData[0].rows.push(
      {
        title: 'Display Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setName} placeholder={'Name'} value={name} />
        )
      },
      {
        title: 'Username',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setUsername} placeholder={'Username'} value={username} />
        )
      },
      {
        title: 'Follower Count',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setFollowerCount} placeholder={'Follower Count'} value={followerCount.toString()} />
        )
      },
      {
        title: 'Post Count',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setPostCount} keyboardType={'numeric'} placeholder={'Post Count'} value={postCount.toString()} />
        )
      },
      {
        title: 'Follow each other',
        renderAccessory: () => (
          <Switch value={isMutualFriends} onValueChange={setIsMutualFriends} />
        )
      },
      {
        title: 'Mutual Follower',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setMutualFriend} placeholder={'Mutual Friend'} value={mutualFriend} />
        )
      },
      {
        title: 'Mutual Follow Since Year',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} keyboardType={'numeric'} onChangeText={setFriendSinceYear} placeholder={'Friend Since Year'} value={friendSinceYear} />
        )
      },
      {
        title: 'Verified',
        renderAccessory: () => (
          <Switch value={verified} onValueChange={setVerified} />
        )
      },
    )
  }
  
  function iMessageFields() {
    conversationData[0].rows.push(
      {
        title: 'First Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setFirstName} placeholder={'First Name'} value={firstName} />
        )
      },
      {
        title: 'Last Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setLastName} placeholder={'Last Name'} value={lastName} />
        )
      },
    )
  }
  
  function twitterFields() {
    conversationData[0].rows.push(
      {
        title: 'Display Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setName} placeholder={'Name'} value={name} />
        )
      },
      {
        title: 'Username',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setUsername} placeholder={'Username'} value={username} />
        )
      },
      {
        title: 'Biography',
      },
      {
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setBiography} multiline={true} numberOfLines={4} placeholder={'Biography'} value={biography} />
        )
      },
      {
        title: 'Follower Count',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setFollowerCount} placeholder={'Follower Count'} value={followerCount.toString()} />
        )
      },
      {
        title: 'Following Count',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setFollowingCount} placeholder={'Following Count'} value={followingCount.toString()} />
        )
      },
      {
        title: 'Join Date',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setJoinDate} placeholder={'Join Date'} value={joinDate} />
        )
      },
      {
        title: 'Verified',
        renderAccessory: () => (
          <Switch value={verified} onValueChange={setVerified} />
        )
      },
    )
  }
  
  function messengerFields() {
    conversationData[0].rows.push(
      {
        title: 'First Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setFirstName} placeholder={'First Name'} value={firstName} />
        )
      },
      {
        title: 'Last Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setLastName} placeholder={'Last Name'} value={lastName} />
        )
      },
      {
        title: 'Is Friends',
        renderAccessory: () => (
          <Switch value={isMutualFriends} onValueChange={setIsMutualFriends} />
        )
      },
      {
        title: 'Works At',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setWorksAt} placeholder={'Works At'} value={worksAt} />
        )
      },
      {
        title: 'Education',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setEducation} placeholder={'Education'} value={education} />
        )
      },
      {
        title: 'City',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setCity} placeholder={'City'} value={city} />
        )
      },
      {
        title: 'State',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} onChangeText={setState} placeholder={'State'} value={state} />
        )
      },
      
    )
  }

  switch (conversation.platform) {
    case Config.messagingPlatforms.Instagram:
      instagramFields()
      break
    case Config.messagingPlatforms.Twitter:
      twitterFields()
      break
    case Config.messagingPlatforms.Messenger:
      messengerFields()
      break
    case Config.messagingPlatforms.iMessage:
      iMessageFields()
      break
    default:
      break
  }
  
  function saveRecipient() {
    let rec: Recipient = {}
    rec.id = recipient.id
    rec.image = tempImagePath
    processLocalImage()
    
    switch (conversation.platform) {
      case Config.messagingPlatforms.Instagram:
        rec.name = name
        rec.username = username
        rec.follower_count = followerCount
        rec.post_count = postCount
        rec.is_mutual_friends = booleanToInteger(isMutualFriends)
        rec.mutual_friend = mutualFriend
        rec.friend_since_year = friendSinceYear
        rec.verified = booleanToInteger(verified)
        break
      case Config.messagingPlatforms.Twitter:
        rec.name = name
        rec.username = username
        rec.follower_count = followerCount
        rec.biography = biography
        rec.following_count = followingCount
        rec.created_at = joinDate
        rec.verified = booleanToInteger(verified)
        break
      case Config.messagingPlatforms.Messenger:
        rec.first_name = firstName
        rec.last_name = lastName
        rec.is_mutual_friends = booleanToInteger(isMutualFriends)
        rec.works_at = worksAt
        rec.education = education
        rec.city = city
        rec.state = state
        break
      case Config.messagingPlatforms.iMessage:
        rec.first_name = firstName
        rec.last_name = lastName
        break
      default:
        break
    }
  
    updateRecipient(recipient.id, rec).then(() => {
      return navigation.navigate(backRoute, { recipient: rec })
    })
  }
  
  return (
    <View style={{ flex: 1 }}>
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
                    setImage(urlInput)
                    setTempImage(urlInput)
                    const filename = urlInput.substring(urlInput.lastIndexOf('/') + 1);
                    setTempImagePath(Utils.imagePath(filename))
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
      <SettingsScreen data={conversationData} />
      <Button
        title={'Save'}
        onPress={saveRecipient}
      />
    </View>
  )
}

export default ConversationSettings
