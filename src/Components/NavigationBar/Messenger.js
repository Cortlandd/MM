import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'

const MessengerNavigationBar = ({ callback, userData }) => {
  const icons = Icons()

  const onCallback = () => {
    if (callback) callback()
  }

  return (
    <View style={styles.navigationBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.btnNavigation} onPress={onCallback}>
          <Icon name="arrow-back-ios" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo}>
          <View>
            <Avatar source={userData.recipient.image} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: '600', fontSize: 20 }}>
              {userData.recipient.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightOptions}>
        <TouchableOpacity style={styles.btnNavigation}>
          <Image style={{ height: 40, width: 40 }} source={icons.facebook_phone} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Image style={{ height: 30, width: 30, tintColor: '#000' }} source={icons.facebook_video} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessengerNavigationBar

const styles = StyleSheet.create({
  navigationBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    zIndex: 1,
  },
  rightOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  btnNavigation: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
