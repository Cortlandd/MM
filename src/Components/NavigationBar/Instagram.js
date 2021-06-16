import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Platform } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'
import { useTheme } from '@/Theme'

const InstagramNavigationBar = ({ callback, title, recipient }) => {
  const icons = Icons()
  const images = Images()
  const { Fonts, darkMode, Colors } = useTheme()

  const onCallback = () => {
    if (callback) callback()
  }

  return (
    <View style={styles.navigationBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.btnNavigation} onPress={onCallback}>
          {Platform.OS === 'ios' ? (
            <Icon name="arrow-back-ios" size={22} />
          ) : (
            <Avatar
              source={icons.instagram_back_arrow}
              size={22}
              avatarStyle={{ tintColor: 'white' }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo}>
          <View>
            <Avatar
              source={icons.sample_bag}
              size={28}
              rounded={true}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...Fonts.textSmall, fontWeight: 'bold', fontSize: 13 }}>
              {recipient.name}
            </Text>
            {Platform.OS === 'ios' && (
              <Text style={{ fontSize: 12, color: 'grey', marginTop: 2 }}>
                {recipient.username}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightOptions}>
        <TouchableOpacity style={styles.btnNavigation}>
          <Image style={{ height: 23, width: 23, tintColor: Colors.text }} source={icons.instagram_info} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Image source={icons.instagram_video_call} style={{ height: 26, width: 26, tintColor: Colors.text }}  />
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
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
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
