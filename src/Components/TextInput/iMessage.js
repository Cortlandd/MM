import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Dimensions } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const iMessageTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()

  return (
    <View>
      <Text>iMessage</Text>
    </View>
  )
}

export default iMessageTextInput
