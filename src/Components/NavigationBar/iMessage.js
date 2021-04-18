import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'

const iMessageNavigationBar = ({ callback, title, userData }) => {
  const icons = Icons()

  const onCallback = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <View>
      <Text>iMessage</Text>
    </View>
  )
}

export default iMessageNavigationBar