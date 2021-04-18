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

const iMessageMessage = ({ is_from_me = false, showTimestamp = false, message, rowIndex }) => {
  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  return (
    <View>
      <Text>Message</Text>
    </View>
  )
}