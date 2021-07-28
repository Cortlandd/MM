import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions, TouchableWithoutFeedback,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'
import IMessageContact from '@/Components/iMessageContact'

const IMessageNavigationBar = ({ callback, title, recipient, navigationClick }) => {
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
      <TouchableWithoutFeedback onPress={navigationClick}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          {recipient.image ? (
            <Avatar source={{ uri: recipient.image }} renderPlaceholderContent={() => <IMessageContact name={extractName(title)} />} rounded={true} size={50} />
          ) : recipient.first_name || recipient.last_name ? (
            <IMessageContact name={extractName(title)} />
          ) : (
            <Avatar source={icons.ios_no_contact_icon} />
          )}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>{`${recipient.first_name} ${recipient.last_name}`}</Text>
            <Icon name={'chevron-right'} size={15} color={'gray'} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default IMessageNavigationBar
