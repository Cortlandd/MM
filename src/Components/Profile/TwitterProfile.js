import React from 'react'
import { View, Text } from 'react-native'

const TwitterProfile = ({ recipient }) => {

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 25 }}>
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{recipient.name} </Text>
          <Text style={{ color: '#1DA1F2', fontSize: 16 }}>@{recipient.username}</Text>
        </View>
        <Text style={{ fontSize: 15, marginBottom: 10, alignSelf: 'center', justifyContent: 'center' }}>{recipient.biography ? recipient.biography : 'This is the users biography'}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 2 }}>
            <Text style={{ fontWeight: 'bold' }}>{recipient.following ? recipient.following : '123'} </Text>
            <Text style={{ color: '#657786' }}>Following</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'baseline' }}>
            <Text style={{ fontWeight: 'bold' }}>{recipient.followers ? recipient.followers : '123'} </Text>
            <Text style={{ color: '#657786' }}>Followers</Text>
          </View>
        </View>
        <Text style={{ alignSelf: 'center', color: '#657786' }}>{recipient.created_at ? recipient.created_at : 'Joined August 2020'}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', opacity: 0.2 }}></View>
    </View>
  )
}

export default TwitterProfile
