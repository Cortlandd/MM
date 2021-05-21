import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'

const TwitterNavigationBar = ({ callback, title, userData }) => {
  const icons = Icons()
  const images = Images()

  const onCallback = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1.5,
        paddingBottom: 5,
        zIndex: 1,
      }}
    >
      <View style={styles.navigationBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.btnNavigation} onPress={onCallback}>
            <Icon name="arrow-back-ios" color={'#1DA1F2'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          {__DEV__ ? (
            <Avatar source={images.sample_profile_woman} rounded={true} />
          ) : (
            <Avatar source={{ uri: userData.recipient.image }} rounded={true} />
          )}
        </View>
        <View style={styles.rightOptions}>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon name={'info-outline'} color={'#1DA1F2'} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          {userData.recipient.name}
        </Text>
      </View>
    </View>
  )
}

export default TwitterNavigationBar

const STATUS_BAR_HEIGHT: number = getStatusBarHeight()
const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
