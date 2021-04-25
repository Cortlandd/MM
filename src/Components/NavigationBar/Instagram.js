import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'

const InstagramNavigationBar = ({ callback, title, userData }) => {
  const icons = Icons()
  const images = Images()

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
            <Avatar source={images.sample_profile_woman} size={28} rounded={true} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: '600', fontSize: 15 }}>{userData.recipient.name}</Text>
            <Text style={{ fontSize: 11, color: 'grey' }}>{userData.recipient.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightOptions}>
        <TouchableOpacity style={styles.btnNavigation}>
          <Image style={{ height: 26, width: 26 }} source={icons.instagram_video_call} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Image style={{ height: 23, width: 23 }} source={icons.instagram_info} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InstagramNavigationBar

const STATUS_BAR_HEIGHT: number = getStatusBarHeight()
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
    marginRight: 5,
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
