import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const InstagramProfile = ({ user }) => {
  const images = Images()

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <Avatar containerStyle={{ alignSelf: 'center', margin: 10 }} size={'large'} rounded={true} source={images.sample_profile_woman} />
      <Text style={{ fontWeight: '600', alignSelf: 'center', marginBottom: 3, fontSize: 16 }}>{user.name}</Text>
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}>
        <Text>{user.name}</Text>
        <Text> · </Text>
        <Text>Instagram</Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 3 }}>
        <Text style={{ color: 'gray' }}>486 followers</Text>
        <Text style={{ color: 'gray' }}> · </Text>
        <Text style={{ color: 'gray' }}>8 posts</Text>
      </View>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 3,
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
        }}
      >
        You both follow yesterdaynite and 5 others
      </Text>
      <Text
        style={{
          color: 'black',
          flexDirection: 'row',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: 'lightgray',
          padding: 5,
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
