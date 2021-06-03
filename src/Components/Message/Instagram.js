import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const InstagramMessage = ({
  is_from_me = false,
  showTime = false,
  message,
  lastMessage,
  rowIndex,
}) => {
  const images = Images()

  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
  const styles = StyleSheet.create({
    messageItem: {
      width: '100%',
      flexDirection: 'row',
      marginVertical: 3,
      alignItems: 'flex-end',
    },
    message: {
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 20,
      maxWidth: SCREEN_WIDTH * 0.6,
      backgroundColor: '#ddd',
      marginHorizontal: 15,
    },
    textMessage: {
      paddingHorizontal: 15,
    },
    msgText: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    myMessage: {
      backgroundColor: '#ddd',
      marginHorizontal: 15,
    },
    yourAvatar: {
      height: 25,
      width: 25,
      borderRadius: 40,
    },
    yourMessage: {
      backgroundColor: 'transparent',
    },
  })
  return (
    <TouchableOpacity
      style={{
        ...styles.messageItem,
        justifyContent: is_from_me ? 'flex-end' : 'flex-start',
        paddingBottom: 0,
      }}
      activeOpacity={1}
    >
      <View style={{ ...styles.yourAvatar, marginLeft: 5 }}>
        {!is_from_me && (
          <Avatar style={styles.yourAvatar} rounded={true} source={images.sample_profile_woman} />
        )}

        {/* Set constraint so that if the last message and current has 15 min difference show other don't. */}
      </View>
      <View
        style={[
          styles.message,
          is_from_me ? styles.myMessage : styles.yourMessage,
          styles.textMessage,
          {
            alignItems: is_from_me ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <Text style={styles.msgText}>{message.message}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default InstagramMessage
