import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Dimensions } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'
import { useTheme } from '@/Theme'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const InstagramTextInput = ({ messageInput, setMessageInput, onSend, onImageUpload }) => {
  const icons = Icons()
  const { Fonts, darkMode } = useTheme()

  return (
    <View style={styles.msgInputWrapper}>
      <React.Fragment>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnCamera}>
          <Icon size={24} name={'camera'} type={'ionicon'} color={'#fff'} />
          {/*<Image style={{ width: 20, height: 20 }} source={icons.instagram_camera_white} />*/}
        </TouchableOpacity>
        <TextInput
          value={messageInput}
          onChangeText={setMessageInput}
          multiline={true}
          style={{
            ...styles.msgInput,
            color: darkMode ? '#FFF' : '#000',
            width:
              messageInput.length > 0
                ? SCREEN_WIDTH - 30 - 44 - 60
                : SCREEN_WIDTH - 30 - 44,
          }}
          placeholder="Message..."
          placeholderTextColor={'lightgray'}
        />
        {messageInput.length === 0 ? (
          <View style={styles.msgRightOptions}>
            <TouchableOpacity style={styles.btnNavigation}>
              <Image style={{ width: 30, height: 30, tintColor: darkMode ? '#fff' : '#000' }} source={icons.instagram_microphone} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNavigation} onPress={onImageUpload}>
              <Image style={{ width: 25, height: 25, tintColor: darkMode ? '#fff' : '#000' }} source={icons.instagram_photo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNavigation}>
              <Image style={{ width: 25, height: 25, tintColor: darkMode ? '#fff' : '#000' }} source={icons.instagram_emoji} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={{ ...styles.btnSend, right: 0, bottom: 0, marginRight: 8, }} onPress={onSend}>
            <Text style={{ fontWeight: 'bold', color: '#318bfb', fontSize: 18 }}>Send</Text>
          </TouchableOpacity>
        )}
      </React.Fragment>
    </View>
  )
}

export default InstagramTextInput

const styles = StyleSheet.create({
  msgInputWrapper: {
    marginTop: 10,
    width: SCREEN_WIDTH - 20,
    marginHorizontal: 10,
    minHeight: 44,
    borderRadius: 44,
    borderWidth: 1,
    paddingRight: 10,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnCamera: {
    height: 35,
    width: 35,
    margin: 4,
    marginRight: 7,
    borderRadius: 34,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgInput: {
    marginVertical: 7,
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  btnSend: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  msgRightOptions: {
    flexDirection: 'row',
    height: 44,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: 8,
  },
  btnNavigation: {
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
