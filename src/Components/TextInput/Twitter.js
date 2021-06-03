import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Dimensions,
  Button, Platform,
} from 'react-native'
import { Icon, Avatar, Input } from 'react-native-elements'
import Icons from '@/Theme/Icons'
import { useTheme } from '@/Theme'
import Svg, { Path, Circle } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'
import { Grid, Col, Row } from 'react-native-easy-grid'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const TwitterTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()
  const { darkMode } = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={{ borderTopWidth: 0.5, width: SCREEN_WIDTH, borderColor: '#AAB8C2', flex: 1, maxHeight: 42 }}>
      <Grid style={{ marginHorizontal: 5 }}>
        <Col style={{ width: '20%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
            <Avatar source={icons.twitter_photo_album} size={23} avatarStyle={{ tintColor: '#1DA1F2' }} />
            <Avatar source={icons.twitter_gif} size={23} avatarStyle={{ tintColor: '#1DA1F2' }} />
          </View>
        </Col>
        <Col style={{ width: '65%' }}>
          {Platform.OS === 'ios' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: darkMode ? '#202327' : '#ebeef0',
                  color: darkMode ? '#fff' : '#000',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: isFocused && darkMode ? '#202327' : '#ebeef0',
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
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', alignContent: 'center' }}>
              <Input
                value={messageInput}
                onChangeText={setMessageInput}
                multiline={true}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                placeholder={'Start a message'}
                placeholderTextColor={'#657786'}
                selectionColor={'#1DA1F2'}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                style={{
                  borderBottomWidth: isFocused ? 2 : 1,
                  borderColor: isFocused ? '#1DA1F2' : '#AAB8C2',
                  fontSize: 15,
                  padding: 0,
                }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 6, justifyContent: 'space-between' }}>
                <View style={{ backgroundColor: 'lightgray', width: 0.5, height: 28, marginRight: 15 }}></View>
                <View>
                  <Avatar
                    source={icons.twitter_send}
                    size={25}
                    onPress={messageInput.length === 0 ? false : onSend}
                    avatarStyle={{
                      tintColor: '#1DA1F2',
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </Col>
      </Grid>
    </View>
  )
}

export default TwitterTextInput
