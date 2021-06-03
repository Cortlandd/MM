import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'
import IMessageContact from '@/Components/iMessageContact'

const IMessageNavigationBar = ({ callback, title, userData }) => {
  const icons = Icons()
  const images = Images()

  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  const onCallback = () => {
    if (callback) {
      callback()
    }
  }

  const styles = StyleSheet.create({
    navigationBar: {
      width: '100%',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 1,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      zIndex: 1,
    },
    btnNavigation: {
      height: 44,
      width: 44,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 100,
    },
  })

  // https://stackoverflow.com/questions/8279859/get-first-letter-of-each-word-in-a-string-in-javascript
  function extractName(name) {
    return name.match(/\b\w/g).join('').toUpperCase()
  }

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity style={styles.btnNavigation} onPress={onCallback}>
        <Icon name="arrow-back-ios" color={'#147EFB'} />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <IMessageContact name={extractName(title)} />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>{userData.recipient.name}</Text>
          <Icon name={'chevron-right'} size={15} color={'gray'} />
        </View>
      </View>
    </View>
  )
}

export default IMessageNavigationBar
