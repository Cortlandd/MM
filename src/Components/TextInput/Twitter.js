import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Dimensions,
  Button,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'
import { useTheme } from '@/Theme'
import Svg, { Path, Circle } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const TwitterTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()
  const { darkMode } = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  return (
    <View
      style={{
        borderTopColor: darkMode ? '#17191b' : '#ebeef0',
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 5,
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <Avatar
          source={icons.twitter_photo_album}
          size={25}
          avatarStyle={{ tintColor: '#1DA1F2' }}
          containerStyle={{ marginRight: 13 }}
        />
        <Avatar
          source={icons.twitter_gif}
          size={25}
          avatarStyle={{ tintColor: '#1DA1F2' }}
        />
        <View
          style={{
            backgroundColor: darkMode ? '#202327' : '#ebeef0',
            color: darkMode ? '#fff' : '#000',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: isFocused && darkMode ? '#202327' : '#ebeef0',
            marginHorizontal: 15,
            flex: 1,
            width: SCREEN_WIDTH / 2,
            fontSize: 15,
          }}
        >
          <TextInput
            value={messageInput}
            onChangeText={setMessageInput}
            multiline={true}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            placeholder={'Start a message'}
            placeholderTextColor={'gray'}
            selectionColor={'#1DA1F2'}
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              width: '100%',
            }}
          />
        </View>
        <Avatar
          source={icons.twitter_send}
          size={30}
          onPress={messageInput.length === 0 ? false : onSend}
          avatarStyle={{
            tintColor: '#1DA1F2',
            opacity: messageInput.length === 0 ? 0.5 : 1,
          }}
          containerStyle={{ marginRight: 15 }}
        />
      </View>
    </View>
  )
}

export default TwitterTextInput
