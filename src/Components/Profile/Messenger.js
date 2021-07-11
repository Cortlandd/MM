import React from 'react'
import { View, Text, Platform } from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'
import * as Utils from '@/Config/Utils'

const MessengerProfile = ({ recipient }) => {
  const images = Images()

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
      <Avatar containerStyle={{ alignSelf: 'center', margin: 10 }} rounded={true} size={100} source={{ uri: recipient.image }} />
      <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 22, marginBottom: 3 }}>{`${recipient.first_name} ${recipient.last_name}`}</Text>
      <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: '700' }}>Facebook</Text>
      <Text
        style={{
          color: 'gray',
          flexDirection: 'row',
          alignSelf: 'center',
          fontWeight: 'bold',
          marginBottom: 2,
          fontSize: 14,
        }}
      >
        {Utils.validateBoolean(recipient.is_mutual_friends) ? "You're friends on Facebook" : "You're not friends on Facebook" }
      </Text>
      {Utils.validateBoolean(recipient.is_mutual_friends) ? (
        <View style={{ marginBottom: 2 }}>
          {recipient.city && recipient.state ? (
            <Text
              style={{
                color: 'gray',
                flexDirection: 'row',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              {`Lives in ${recipient.city}, ${recipient.state}`}
            </Text>
          ) : null}
        </View>
      ) : null}
      {recipient.works_at || recipient.education ? (
        <View style={{ marginBottom: 5 }}>
          {recipient.works_at ? (
            <Text style={{ color: 'gray', flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold', fontSize: 14 }}>{`Works at ${recipient.works_at}`}</Text>
          ) : null}
          {recipient.education ? (
            <Text style={{ color: 'gray', flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold', fontSize: 14 }}>{`Studied at ${recipient.education}`}</Text>
          ) : null}
        </View>
      ) : null}
      <View style={{ paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#ececec', alignSelf: 'center', borderRadius: 20, marginTop: 5 }}>
        <Text style={{ fontWeight: '600', fontSize: 14 }}>VIEW PROFILE</Text>
      </View>
    </View>
  )
}

export default MessengerProfile
