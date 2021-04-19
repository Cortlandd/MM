import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Dimensions,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const IMessageTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()

  const styles = StyleSheet.create({
    msgInputWrapper: {
      borderRadius: 44,
      borderWidth: 1,
      borderColor: '#ddd',
      flexDirection: 'row',
      alignItems: 'center',
      width: '75%',
      paddingHorizontal: 5,
      marginRight: 15,
      flex: 1,
    },
    msgInput: {
      marginVertical: 7,
      fontSize: 16,
      marginHorizontal: 10,
      paddingTop: 0,
      paddingBottom: 0,
    },
    msgRightOptions: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
    },
    btnNavigation: {
      height: 44,
      width: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minHeight: 44,
        width: SCREEN_WIDTH,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
      >
        <TouchableOpacity style={{ ...styles.btnNavigation }}>
          <Icon name={'camera'} color={'gray'} type={'ionicon'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.btnNavigation, marginRight: 10 }}>
          <Icon name={'camera'} color={'gray'} type={'ionicon'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.msgInputWrapper, marginRight: 20 }}>
        <TextInput
          value={messageInput}
          onChangeText={(value) => setMessageInput(value)}
          multiline={true}
          style={styles.msgInput}
          placeholder={'iMessage'}
        />
        <View style={styles.msgRightOptions}>
          <TouchableOpacity style={{ marginRight: 3 }}>
            <Avatar source={messageInput.length > 0 ? icons.ios_send_message_icon : icons.ios_record_icon} size={30} onPress={messageInput.length > 0 && onSend} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default IMessageTextInput
