import React from 'react'
import { View, Text } from 'react-native'

const TwitterProfile = ({ recipient }) => {

  function convert(n) {
    var n_format
    if (n < 1000) {
      n_format = n.toFixed()
    } else if (n < 1000000) {
      // Anything less than a million
      n_format = (n / 1000).toFixed(1) + 'k'
    } else if (n < 1000000000) {
      // Anything less than a billion
      n_format = (n / 1000000).toFixed(1) + 'M'
    } else {
      // At least a billion
      n_format = (n / 1000000000).toFixed(1) + 'B'
    }
    return n_format
  }

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 25 }}>
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{recipient.name} </Text>
          <Text style={{ color: '#1DA1F2', fontSize: 16 }}>@{recipient.username}</Text>
        </View>
        <Text style={{ fontSize: 15, marginBottom: 10, alignSelf: 'center', textAlign: 'center' }}>{recipient.biography ? recipient.biography : 'No description'}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 2 }}>
            <Text style={{ fontWeight: 'bold' }}>{recipient.following_count ? convert(recipient.following_count) : convert(123)} </Text>
            <Text style={{ color: '#657786' }}>Following</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'baseline' }}>
            <Text style={{ fontWeight: 'bold' }}>
              {recipient.follower_count
                ? convert(recipient.follower_count)
                // TODO: Fix this
                : convert(12345)}
            </Text>
            <Text style={{ color: '#657786' }}> Followers</Text>
          </View>
        </View>
        <Text style={{ alignSelf: 'center', color: '#657786' }}>{recipient.join_date ? recipient.join_date : 'Joined August 2020'}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', opacity: 0.2 }}></View>
    </View>
  )
}

export default TwitterProfile
