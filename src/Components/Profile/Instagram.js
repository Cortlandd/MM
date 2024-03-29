import React from 'react'
import { View, Text, Platform, PlatformColor } from 'react-native'
import { Avatar, ThemeProvider } from 'react-native-elements'
import Images from '@/Theme/Images'
import { useTheme } from '@/Theme'
import Icons from '@/Theme/Icons'
import { validateBoolean } from '@/Config/Utils'
import * as Utils from '@/Config/Utils'

const InstagramProfile = ({ recipient }) => {
  const images = Images()
  const icons = Icons()
  const { Fonts, darkMode } = useTheme()

  console.log(recipient)
  
  return (
    <ThemeProvider
      useDark={darkMode}
      style={{ justifyContent: 'center', alignSelf: 'center' }}
    >
      <Avatar
        containerStyle={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 8,
        }}
        size={100}
        rounded={true}
        source={recipient.image !== "" ? { uri: "~/Documents/" + Utils.extractFilename(recipient.image) } : icons.sample_bag}
      />
      <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
        <Text
          style={{
            ...Fonts.textRegular,
            color: darkMode ? 'white' : 'black',
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: '700',
          }}
        >
          {recipient.name}
        </Text>
        {recipient.verified ? (
          <Avatar size={18} source={icons.instagram_verified_icon} />
        ) : null }
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}
      >
        {recipient.username ? (<Text style={{ fontSize: 16, color: '#8e8e8e', fontWeight: '400', }}>{recipient.username}</Text>) : null}
        {recipient.name ? (<Text style={{ fontSize: 16, color: '#8e8e8e', fontWeight: '400', }}> · </Text>) : null}
        <Text style={{ fontSize: 16, color: '#8e8e8e', fontWeight: '400', }}>Instagram</Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}
      >
        <Text
          style={{
            color: '#8e8e8e',
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          {Utils.convertFollowNumber(recipient.follower_count)} followers
        </Text>
        <Text
          style={{
            color: '#8e8e8e',
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          {' '}
          ·{' '}
        </Text>
        <Text
          style={{
            color: '#8e8e8e',
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          {Utils.convertFollowNumber(recipient.post_count)} posts
        </Text>
      </View>
      {validateBoolean(recipient.is_mutual_friends) && recipient.mutual_friend && recipient.mutual_friends_count ? (
        <View>
          <Text
            style={{
              color: '#8e8e8e',
              flexDirection: 'row',
              alignSelf: 'center',
              fontWeight: '400',
              fontSize: 16,
              marginBottom: 3
            }}
          >
            You follow each other on Instagram
          </Text>
          <Text
            style={{
              color: '#8e8e8e',
              flexDirection: 'row',
              alignSelf: 'center',
              marginBottom: 10,
              fontWeight: '400',
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
              color: '#8e8e8e',
              flexDirection: 'row',
              alignSelf: 'center',
              fontWeight: '400',
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
          borderColor: '#8e8e8e',
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
