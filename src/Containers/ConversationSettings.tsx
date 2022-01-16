import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Main'
import { View, TextInput, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
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
import { Conversation, Recipient } from '@/Config/Types'
import * as RNFS from 'react-native-fs'
import * as Utils from '@/Config/Utils'
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { useConversations } from '@/Hooks/useConversations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from '@/Theme'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ConversationSettings'>,
  route: RouteProp<RootStackParamList, 'ConversationSettings'>,
}

const ConversationSettings = ({ navigation, route }: Props) => {
  const { conversation, recipient, backRoute, platform } = route.params
  const { createConversation, refreshConversations } = useConversations()
  const { updateRecipient, createRecipient } = useRecipients(conversation?.id)
  const { Fonts, darkMode } = useTheme()
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveRecipient} style={{ marginRight: 15 }}>
          <Text style={{ color: '#006ee6', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      )
    })
  })
  
  // Misc
  const [tempImage, setTempImage] = useState<string>()
  const [tempImagePath, setTempImagePath] = useState<string>()
  const [tempImageName, setTempImageName] = useState<string>()
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [urlInput, setUrlInput] = useState<string>()
  const [activityIndicatorAnimating, setActivityIndicatorAnimating] = useState(false)
  
  // Recipient
  const [name, setName] = useState(recipient?.name)
  const [firstName, setFirstName] = useState(recipient?.first_name)
  const [lastName, setLastName] = useState(recipient?.last_name)
  const [image, setImage] = useState(recipient?.image)
  const [username, setUsername] = useState(recipient?.username)
  const [worksAt, setWorksAt] = useState(recipient?.works_at)
  const [education, setEducation] = useState(recipient?.education)
  const [city, setCity] = useState(recipient?.city)
  const [state, setState] = useState(recipient?.state)
  const [followerCount, setFollowerCount] = useState(recipient?.follower_count)
  const [followingCount, setFollowingCount] = useState(recipient?.following_count)
  const [postCount, setPostCount] = useState(recipient?.post_count)
  const [joinDate, setJoinDate] = useState(recipient?.join_date)
  const [biography, setBiography] = useState(recipient?.biography)
  const [verified, setVerified] = useState(validateBoolean(recipient?.verified))
  const [isMutualFriends, setIsMutualFriends] = useState(validateBoolean(recipient?.is_mutual_friends))
  const [mutualFriendsCount, setMutualFriendsCount] = useState(recipient?.mutual_friends_count)
  const [mutualFriend, setMutualFriend] = useState(recipient?.mutual_friend)
  const [friendSinceYear, setFriendSinceYear] = useState(recipient?.friend_since_year)

  /*
  useEffect(() => {
    recipient.image = image

    // Strings
    if (name !== "") recipient.name = name
    if (username !== "") recipient.username = username
    if (followerCount !== "") recipient.follower_count = followerCount
    if (postCount !== "") recipient.post_count = postCount
    if (mutualFriend !== "") recipient.mutual_friend = mutualFriend
    if (friendSinceYear !== "") recipient.friend_since_year = friendSinceYear
    if (biography !== "") recipient.biography = biography
    if (followingCount !== "") recipient.following_count = followingCount
    if (firstName !== "") recipient.first_name = firstName
    if (lastName !== "") recipient.last_name = lastName
    if (worksAt !== "") recipient.works_at = worksAt
    if (education !== "") recipient.education = education
    if (city !== "") recipient.city = city
    if (state !== "") recipient.state = state

    // Dates?
    if (joinDate !== "") recipient.join_date = joinDate

    // Boolean
    recipient.is_mutual_friends = booleanToInteger(isMutualFriends)
    recipient.verified = booleanToInteger(verified)
  }, [name, firstName, lastName, image, username, worksAt, education, city, state, followerCount, followingCount, postCount, joinDate, biography, verified, isMutualFriends, mutualFriendsCount, mutualFriend, friendSinceYear])
  */
  
  useEffect(() => {
    if (urlInput !== undefined || (tempImage !== undefined && tempImageName !== undefined)) {
      processLocalImage()
    }
  }, [tempImage, urlInput, tempImageName])
  
  function processLocalImage() {
    if (urlInput !== undefined) {
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ret = RNFS.downloadFile({ fromUrl: image, toFile: Utils.imagePath(filename)});
      return ret.promise.then(async res => {
        setTempImagePath(Utils.imagePath(filename))
      }).catch(err => {
        console.error('Download Error: ', err);
      });
    } else if (tempImage !== undefined) {
      const newPath = Utils.imagePath(tempImageName)
      return RNFS.moveFile(tempImage, newPath)
        .then().finally(() => {
          setImage(newPath)
          setTempImage(newPath)

          recipient.image = newPath
          console.log('newImage', recipient.image)
        })
    }
  }

  const handleImageUpload = () => {
    let res: ImagePickerResponse

    return launchImageLibrary({ mediaType: 'photo' }).then((response) => {
      if (!response.didCancel && response.errorMessage !== '' && response.assets.length > 0) {
        res = response.assets[0]
      }
    }).finally(() => {
      if (res !== undefined) {
        const fileName = res.fileName
        const uri = res.uri
  
        setTempImage(uri)
        setTempImagePath(uri)
        setTempImageName(fileName)
  
        setUrlInput('')
        setOverlayVisible(false)
      }
    })
  }
  
  const conversationData: SettingsData = [
    {
      type: 'CUSTOM_VIEW',
      render: () => {
        if (platform === Config.messagingPlatforms.iMessage) {
          return (<IMessageFooter recipient={recipient} firstName={firstName} tempImage={tempImage} lastName={lastName} />)
        } else if (platform === Config.messagingPlatforms.Messenger) {
          return (<MessengerFooter isFriends={isMutualFriends} tempImage={tempImage} city={city} state={state} firstName={firstName} lastName={lastName} worksAt={worksAt} education={education} image={recipient?.image} platform={platform} />)
        } else if (platform === Config.messagingPlatforms.Twitter) {
          return (<TwitterFooter name={name} username={username} following_count={followingCount} follower_count={followerCount} join_date={joinDate} biography={biography} verified={verified} />)
        } else if (platform === Config.messagingPlatforms.Instagram) {
          return (<InstagramFooter name={name} tempImage={tempImage} username={username} image={image} verified={verified} follower_count={followerCount} is_mutual_friends={isMutualFriends} mutual_friend={mutualFriend} post_count={postCount} mutual_friends_count={mutualFriendsCount} friend_since_year={friendSinceYear} />)
        }
      }
    },
    {
      type: 'SECTION',
      header: 'Recipient',
      rows: [
        {
          title: 'Image',
          renderAccessory: () => (
            <View>
              <Avatar rounded={true} title={"Image"} source={{ uri: tempImage ? tempImage : "~/Documents/" + Utils.extractFilename(image) }} />
            </View>
          ),
          onPress: () => setOverlayVisible(true),
          showDisclosureIndicator: true,
        },
      ]
    },
  ]
  
  function instagramFields() {
    conversationData[1].rows.push(
      {
        title: 'Display Name',
        renderAccessory: () => (
          <TextInput
            style={{ color: 'orange' }}
            returnKeyType={'next'}
            onSubmitEditing={() => this.usernameTextInput.focus()}
            placeholderTextColor={'lightgray'}
            onChangeText={setName}
            placeholder={'Name'}
            value={name}
          />
        )
      },
      {
        title: 'Username',
        renderAccessory: () => (
          <TextInput 
            returnKeyType={'next'}
            ref={(input) => { this.usernameTextInput = input }}
            onSubmitEditing={() => this.followerCountTextInput.focus()}
            style={{ color: 'orange' }}
            placeholderTextColor={'lightgray'}
            onChangeText={setUsername}
            placeholder={'Username'}
            value={username}
          />
        )
      },
      {
        title: 'Follower Count',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            ref={(input) => { this.followerCountTextInput = input }}
            onSubmitEditing={() => this.postCountTextInput.focus()}
            style={{ color: 'orange' }}
            placeholderTextColor={'lightgray'}
            onChangeText={(value) => setFollowerCount(value.toString())}
            placeholder={'Follower Count'}
            value={followerCount?.toString()}
          />
        )
      },
      {
        title: 'Post Count',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            ref={(input) => { this.postCountTextInput = input }}
            onSubmitEditing={() => this.followSinceTextInput.focus() }
            style={{ color: 'orange' }}
            placeholderTextColor={'lightgray'}
            onChangeText={(value) => setPostCount(value.toString())}
            placeholder={'Post Count'}
            value={postCount?.toString()}
          />
        )
      },
      {
        title: 'Follow Since Year',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            style={{ color: 'orange' }}
            ref={(input) => { this.followSinceTextInput = input; }}
            onSubmitEditing={() => this.mutualFollowerTextInput.focus() }
            placeholderTextColor={'lightgray'}
            onChangeText={(value) => setFriendSinceYear(value.toString())}
            placeholder={'Friend Since Year'}
            value={friendSinceYear?.toString()}
          />
        )
      },
      {
        title: 'Follow each other',
        renderAccessory: () => (
          <Switch value={isMutualFriends} onValueChange={setIsMutualFriends} />
        )
      },
      {
        title: 'Mutual Follower Name',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            style={{ color: 'orange' }}
            ref={(input) => { this.mutualFollowerTextInput = input }}
            placeholderTextColor={'lightgray'}
            onSubmitEditing={() => this.mutualFollowTextInput.focus()}
            onChangeText={setMutualFriend}
            placeholder={'Mutual Friend'}
            value={mutualFriend}
          />
        )
      },
      {
        title: 'Mutual Follows Count',
        renderAccessory: () => (
          <TextInput
            style={{ color: 'orange' }}
            ref={(input) => { this.mutualFollowTextInput = input }}
            placeholderTextColor={'lightgray'}
            onChangeText={(value) => setMutualFriendsCount(value.toString())}
            placeholder={'Mutual Follow Count'}
            value={mutualFriendsCount}
          />
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
    conversationData[1].rows.push(
      {
        title: 'First Name',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            style={{ color: 'orange' }}
            onSubmitEditing={() => this.lastNameTextInput.focus()}
            placeholderTextColor={'lightgray'} 
            onChangeText={setFirstName} 
            placeholder={'First Name'} 
            value={firstName} 
          />
        )
      },
      {
        title: 'Last Name',
        renderAccessory: () => (
          <TextInput
            ref={(input) => { this.lastNameTextInput = input }}
            style={{ color: 'orange' }}
            placeholderTextColor={'lightgray'}
            onChangeText={setLastName}
            placeholder={'Last Name'}
            value={lastName}
          />
        )
      },
    )
  }
  
  function twitterFields() {
    conversationData[1].rows.push(
      {
        title: 'Display Name',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setName} placeholder={'Name'} value={name} />
        )
      },
      {
        title: 'Username',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setUsername} placeholder={'Username'} value={username} />
        )
      },
      {
        title: 'Biography',
      },
      {
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setBiography} multiline={true} numberOfLines={4} placeholder={'Biography'} value={biography} />
        )
      },
      {
        title: 'Follower Count',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={(value) => setFollowerCount(value.toString())} placeholder={'Follower Count'} value={followerCount?.toString()} />
        )
      },
      {
        title: 'Following Count',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={(value) => setFollowingCount(value.toString())} placeholder={'Following Count'} value={followingCount?.toString()} />
        )
      },
      {
        title: 'Join Date',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setJoinDate} placeholder={'Join Date'} value={joinDate} />
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
    conversationData[1].rows.push(
      {
        title: 'First Name',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            onSubmitEditing={() => this.lastNameTextInput.focus()}
            style={{ color: 'orange' }}
            placeholderTextColor={'lightgray'}
            onChangeText={setFirstName}
            placeholder={'First Name'}
            value={firstName} />
        )
      },
      {
        title: 'Last Name',
        renderAccessory: () => (
          <TextInput
            returnKeyType={'next'}
            
            ref={(input) => this.lastNameTextInput = input}
            style={{ color: 'orange' }}
            placeholderTextColor={'lightgray'}
            onChangeText={setLastName}
            placeholder={'Last Name'}
            value={lastName} />
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
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setWorksAt} placeholder={'Works At'} value={worksAt} />
        )
      },
      {
        title: 'Education',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setEducation} placeholder={'Education'} value={education} />
        )
      },
      {
        title: 'City',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setCity} placeholder={'City'} value={city} />
        )
      },
      {
        title: 'State',
        renderAccessory: () => (
          <TextInput style={{ color: 'orange' }} placeholderTextColor={'lightgray'} onChangeText={setState} placeholder={'State'} value={state} />
        )
      },
      
    )
  }

  // Render Fields
  switch (platform) {
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
    setActivityIndicatorAnimating(true)
    // TODO: May not need to update image

    if (backRoute === 'Home') { // New Recipient
      console.log('Creating New Recipient')
      
      let rec: Recipient = {}
      
      rec.image = image

      // Strings
      if (name !== "") rec.name = name
      if (username !== "") rec.username = username
      if (followerCount !== "") rec.follower_count = followerCount
      if (postCount !== "") rec.post_count = postCount
      if (mutualFriend !== "") rec.mutual_friend = mutualFriend
      if (mutualFriendsCount !== "") rec.mutual_friends_count = mutualFriendsCount
      if (friendSinceYear !== "") rec.friend_since_year = friendSinceYear
      if (biography !== "") rec.biography = biography
      if (followingCount !== "") rec.following_count = followingCount
      if (firstName !== "") rec.first_name = firstName
      if (lastName !== "") rec.last_name = lastName
      if (worksAt !== "") rec.works_at = worksAt
      if (education !== "") rec.education = education
      if (city !== "") rec.city = city
      if (state !== "") rec.state = state

      // Dates?
      if (joinDate !== "") rec.join_date = joinDate

      // Boolean
      rec.is_mutual_friends = booleanToInteger(isMutualFriends)
      rec.verified = booleanToInteger(verified)

      const conversation: Conversation = {
        created_at: Utils.getDatetimeForSqlite(),
        updated_at: Utils.getDatetimeForSqlite(),
        platform: platform,
      }

      createRecipient(rec).then((r) => {
        conversation.recipient_id = r.id
        createConversation(conversation).then((c) => {
          setActivityIndicatorAnimating(false)
          refreshConversations().then(() => {
            console.log('Recipient Image', recipient.image)
            navigation.popToTop()
            navigation.navigate(Utils.determineRoute(platform), { conversation: c, recipient: r })
          })
        })
      })
    } else { // Updating Recipient
      console.log('Updating Recipient')

      // Strings
      if (name !== "") recipient.name = name
      if (username !== "") recipient.username = username
      if (followerCount !== "") recipient.follower_count = followerCount
      if (postCount !== "") recipient.post_count = postCount
      if (mutualFriend !== "") recipient.mutual_friend = mutualFriend
      if (mutualFriendsCount !== "") recipient.mutual_friends_count = mutualFriendsCount
      if (friendSinceYear !== "") recipient.friend_since_year = friendSinceYear
      if (biography !== "") recipient.biography = biography
      if (followingCount !== "") recipient.following_count = followingCount
      if (firstName !== "") recipient.first_name = firstName
      if (lastName !== "") recipient.last_name = lastName
      if (worksAt !== "") recipient.works_at = worksAt
      if (education !== "") recipient.education = education
      if (city !== "") recipient.city = city
      if (state !== "") recipient.state = state
      
      // Dates?
      if (joinDate !== "") recipient.join_date = joinDate
      
      // Boolean
      recipient.is_mutual_friends = booleanToInteger(isMutualFriends)
      recipient.verified = booleanToInteger(verified)
      
      updateRecipient(recipient.id, recipient).then(() => {
        console.log('Recipient Image', recipient.image)
        return navigation.navigate(backRoute, { recipient: recipient })
      })
    }
  }
  
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={30}
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{ flex: 1, position: "relative" }}
    >
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
                  style={{ backgroundColor: Utils.isValidURL(urlInput || '') ? '#2089dc' : 'lightgray', borderRadius: 50, padding: 5 }}
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
          <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', marginBottom: 10, color: 'lightgray' }}>Or</Text>
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
      <ActivityIndicator style={{ display: activityIndicatorAnimating ? "flex" : "none" }} animating={activityIndicatorAnimating} color={'lightgray'} size={'large'} />
      <SettingsScreen style={{ backgroundColor: darkMode ? 'black' : 'white' }} data={conversationData} />
    </KeyboardAwareScrollView>
  )
}

export default ConversationSettings
