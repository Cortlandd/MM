import React from 'react'
import { View, Text, Platform, PlatformColor } from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'
import { useTheme } from '@/Theme'

const InstagramProfile = ({ user }) => {
  const images = Images()
  const { Fonts, darkMode } = useTheme()

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <Avatar containerStyle={{ alignSelf: 'center', margin: 10, borderColor: 'gray', borderWidth: 1 }} size={'large'} rounded={true} source={images.sample_profile_woman} />
      <Text style={{ ...Fonts.textRegular, fontWeight: '600', alignSelf: 'center', marginBottom: 3, fontSize: 18 }}>{user.name}</Text>
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}>
        <Text style={Fonts.textRegular}>{user.name}</Text>
        <Text style={Fonts.textRegular}> · </Text>
        <Text style={Fonts.textRegular}>Instagram</Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}
      >
        <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '' }}>486 followers</Text>
        <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '' }}> · </Text>
        <Text style={{ color: 'gray', fontWeight: darkMode ? '600' : '' }}>8 posts</Text>
      </View>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 3,
          fontWeight: darkMode ? '600' : '',
        }}
      >
        You follow each other on Instagram
      </Text>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 10,
          fontWeight: darkMode ? '600' : '',
        }}
      >
        You both follow yesterdaynite and 5 others
      </Text>
      <Text
        style={{
          ...Fonts.textRegular,
          flexDirection: 'row',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: 'lightgray',
          padding: 4,
          borderRadius: 5,
          fontWeight: 'bold',
          paddingLeft: 8,
          paddingRight: 8,
          fontFamily: 'Helvetica',
        }}
      >
        View Profile
      </Text>
    </View>
  )
}

export default InstagramProfile
