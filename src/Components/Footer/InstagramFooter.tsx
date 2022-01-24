import React from 'react'
import Icons from '@/Theme/Icons'
import { useTheme } from '@/Theme'
import { Avatar, ThemeProvider } from 'react-native-elements'
import { Text, View } from 'react-native'
import { validateBoolean } from '@/Config/Utils'
import * as Utils from '@/Config/Utils'

interface Props {
  name: string,
  username: string,
  image: string,
  verified: boolean,
  follower_count: number,
  is_mutual_friends: boolean,
  mutual_friend: string,
  post_count: string,
  mutual_friends_count: number,
  friend_since_year: number,
  tempImage?: string
}

const InstagramFooter = ({...props}: Props) => {
  const icons = Icons()
  const { Fonts, darkMode } = useTheme()

  return (
    <ThemeProvider
      useDark={darkMode}
      // @ts-ignore
      style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <Avatar
        containerStyle={{
          alignSelf: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}
        size={100}
        rounded={true}
        source={props.tempImage !== undefined || props.image !== "" ? { uri: props.tempImage !== "" ? props.tempImage : "~/Documents/" + Utils.extractFilename(props.image) } : {}}
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
          {props.name}
        </Text>
        {validateBoolean(props.verified) ? (
          <Avatar size={18} source={icons.instagram_verified_icon} />
        ) : null }
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center' }}
      >
        {props.username ? (<Text style={{ fontSize: 15, color: 'gray' }}>{props.username}</Text>) : null}
        {props.name ? (<Text style={{ fontSize: 15, color: 'gray' }}> · </Text>) : null}
        <Text style={{ fontSize: 15, color: 'gray' }}>Instagram</Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center' }}
      >
        <Text
          style={{
            color: 'gray',
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          {Utils.convertFollowNumber(props.follower_count)} followers
        </Text>
        <Text
          style={{
            color: 'gray',
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          {' '}
          ·{' '}
        </Text>
        <Text
          style={{
            color: 'gray',
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          {Utils.convertFollowNumber(props.post_count)} posts
        </Text>
      </View>
      {validateBoolean(props.is_mutual_friends) && props.mutual_friend !== "" && props.mutual_friends_count !== null ? (
        <View>
          <Text
            style={{
              color: 'gray',
              flexDirection: 'row',
              alignSelf: 'center',
              fontWeight: '400',
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
              fontWeight: '400',
              fontSize: 16,
            }}
          >
            You both follow {props.mutual_friend} and {props.mutual_friends_count} others
          </Text>
        </View>
      ) : (
        <View style={{ marginBottom: 5 }}>
          <Text
            style={{
              color: 'gray',
              flexDirection: 'row',
              alignSelf: 'center',
              fontWeight: '400',
              fontSize: 16,
            }}
          >
            You've followed this Instagram account since {props.friend_since_year}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: darkMode ? 'gray' : 'lightgray',
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

export default InstagramFooter
