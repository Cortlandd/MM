import React from 'react'
import { View, Image, Text } from 'react-native'
import { useTheme } from '@/Theme'

const Brand = ({ height = 200, width = 200, mode = 'contain' }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} resizeMode={mode} />
    </View>
  )
}

export default Brand
