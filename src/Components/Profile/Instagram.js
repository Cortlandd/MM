import React from 'react'
import { View, Text, Platform, PlatformColor } from 'react-native'
import { Avatar, ThemeProvider } from 'react-native-elements'
import Images from '@/Theme/Images'
import { useTheme } from '@/Theme'
import Icons from '@/Theme/Icons'

const InstagramProfile = ({ user }) => {
  const images = Images()
  const icons = Icons()
  const { Fonts, darkMode } = useTheme()

  return (
    <ThemeProvider
      useDark={darkMode}
      style={{ justifyContent: 'center', alignSelf: 'center' }}
    >
      <Avatar
        containerStyle={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}
        size={100}
        rounded={true}
        source={icons.sample_bag}
      />
      <Text
        style={{
          ...Fonts.textRegular,
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 18,
        }}
      >
        {user.name}
      </Text>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center' }}
      >
        <Text style={Fonts.textRegular}>{user.name}</Text>
        <Text style={Fonts.textRegular}> · </Text>
        <Text style={Fonts.textRegular}>Instagram</Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center' }}
      >
        <Text
          style={{
            color: 'gray',
            fontWeight: darkMode ? '600' : '400',
            fontSize: 16,
          }}
        >
          486 followers
        </Text>
        <Text
          style={{
            color: 'gray',
            fontWeight: darkMode ? '600' : '400',
            fontSize: 16,
          }}
        >
          {' '}
          ·{' '}
        </Text>
        <Text
          style={{
            color: 'gray',
            fontWeight: darkMode ? '600' : '400',
            fontSize: 16,
          }}
        >
          8 posts
        </Text>
      </View>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          fontWeight: darkMode ? '600' : '400',
          fontSize: 16,
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
          fontWeight: darkMode ? '600' : '400',
          fontSize: 16,
        }}
      >
        You both follow username and 5 others
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: darkMode ? 'white' : 'lightgray',
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            ...Fonts.textRegular,
            fontWeight: 'bold',
            fontFamily: 'Helvetica',
          }}
        >
          View Profile
        </Text>
      </View>
    </ThemeProvider>
  )
}

export default InstagramProfile
