import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Dimensions } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const InstagramTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()
  return (
    <View style={styles.msgInputWrapper}>
      <React.Fragment>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnCamera}>
          <Image style={{ width: 20, height: 20 }} source={icons.instagram_camera_white} />
        </TouchableOpacity>
        <TextInput
          value={messageInput}
          onChangeText={setMessageInput}
          multiline={true}
          style={{
            ...styles.msgInput,
            width:
              messageInput.length > 0
                ? SCREEN_WIDTH - 30 - 44 - 60
                : SCREEN_WIDTH - 30 - 44,
          }}
          placeholder="Message..."
        />
        {messageInput.length === 0 ? (
          <View style={styles.msgRightOptions}>
            <TouchableOpacity style={styles.btnNavigation}>
              <Image style={{ width: 25, height: 25 }} source={icons.instagram_microphone} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNavigation}>
              <Image style={{ width: 25, height: 25 }} source={icons.instagram_photo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNavigation}>
              <Image style={{ width: 25, height: 25 }} source={icons.instagram_emoji} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.btnSend} onPress={onSend}>
            <Text style={{ fontWeight: '600', color: '#318bfb' }}>Send</Text>
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
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnCamera: {
    height: 34,
    width: 34,
    margin: 4,
    borderRadius: 34,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgInput: {
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: 8,
  },
  btnNavigation: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
