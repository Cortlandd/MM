import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const MessengerProfile = ({ user }) => {
  const images = Images()

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <Avatar containerStyle={{ alignSelf: 'center', margin: 10 }} size={'large'} rounded={true} source={images.sample_profile_woman} />
      <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 20, marginBottom: 5 }}>{user.name}</Text>
      <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: '700', marginBottom: 2 }}>Facebook</Text>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          fontWeight: 'bold',
          marginBottom: 2,
        }}
      >
        You're friends on Facebook
      </Text>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          fontWeight: 'bold',
          marginBottom: 2,
        }}
      >
        Lives in Memphis, Tennessee
      </Text>
    </View>
  )
}

export default MessengerProfile
