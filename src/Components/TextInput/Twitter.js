import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Dimensions, Button } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const TwitterTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()

  return (
    <View style={{ borderTopColor: 'lightgray', borderTopWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5, marginLeft: 20, marginTop: 10 }}>
        <Avatar source={icons.twitter_photo_album} size={25} avatarStyle={{ tintColor: '#1DA1F2' }} containerStyle={{  marginRight: 13}} />
        <Avatar source={icons.twitter_gif} size={25} avatarStyle={{ tintColor: '#1DA1F2' }} />
        <TextInput
          value={messageInput}
          onChangeText={setMessageInput}
          multiline={true}
          style={{
            backgroundColor: '#E1E8ED',
            borderRadius: 40,
            marginHorizontal: 15,
            flex: 1,
            width: SCREEN_WIDTH / 2,
            fontSize: 15,
            paddingLeft: 20,
            paddingTop: 8,
            paddingBottom: 10,
          }}
          placeholder={'Start a message'}
          placeholderTextColor={'gray'}
        />
        <Avatar
          source={icons.twitter_send}
          size={30}
          onPress={messageInput.length === 0 ? false : onSend}
          avatarStyle={{ tintColor: '#1DA1F2', opacity: messageInput.length === 0 ? 0.5 : 1 }}
          containerStyle={{ marginRight: 15}}
        />
      </View>
    </View>
  )
}

export default TwitterTextInput
