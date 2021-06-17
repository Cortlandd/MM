import React from 'react'
import { View, Text, Platform, PlatformColor } from 'react-native'
import { Avatar, ThemeProvider } from 'react-native-elements'
import Images from '@/Theme/Images'
import { useTheme } from '@/Theme'
import Icons from '@/Theme/Icons'
import { validateBoolean } from '@/Config/Utils'

const InstagramProfile = ({ recipient }) => {
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
        source={recipient.image ? { uri: recipient.image } : icons.sample_bag}
      />
      <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
        <Text
          style={{
            ...Fonts.textRegular,
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: 18,
          }}
        >
          {recipient.name}
        </Text>
        {recipient.verified && (
          <Avatar size={18} source={icons.instagram_verified_icon} />
        )}
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}
      >
        {recipient.name && (<Text style={{ fontSize: 15 }}>{recipient.username}</Text>)}
        {recipient.name && (<Text style={{ fontSize: 15 }}> · </Text>)}
        <Text style={{ fontSize: 15 }}>Instagram</Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}
      >
        <Text
          style={{
            color: 'gray',
            fontWeight: darkMode ? '600' : '400',
            fontSize: 16,
          }}
        >
          {recipient.follower_count} followers
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
          {recipient.post_count} posts
        </Text>
      </View>
      {validateBoolean(recipient.is_mutual_friends) && recipient.mutual_friend && recipient.mutual_friends_count ? (
        <View>
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
            You both follow {recipient.mutual_friend} and {recipient.mutual_friends_count} others
          </Text>
        </View>
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              color: 'gray',
              flexDirection: 'row',
              alignSelf: 'center',
              fontWeight: darkMode ? '600' : '400',
              fontSize: 16,
            }}
          >
            You've followed this Instagram account since {recipient.friend_since_year}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: darkMode ? 'white' : 'lightgray',
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 13,
          paddingRight: 13,
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
