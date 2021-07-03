import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'

const MessengerProfile = ({ recipient }) => {
  const images = Images()

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
      <Avatar containerStyle={{ alignSelf: 'center', margin: 10 }} size={'large'} rounded={true} source={{ uri: recipient.image }} />
      <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 20, marginBottom: 5 }}>{`${recipient.first_name} ${recipient.last_name}`}</Text>
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
        {recipient.is_mutual_friends ? "You're friends on Facebook" : "You're not friends on Facebook" }
      </Text>
      {recipient.is_mutual_friends ? (
        <View>
          {recipient.city && recipient.state ? (
            <Text
              style={{
                color: 'gray',
                flexDirection: 'row',
                alignSelf: 'center',
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              {`Lives in ${recipient.city}, ${recipient.state}`}
            </Text>
          ) : null}
        </View>
      ) : recipient.works_at || recipient.education ? (
        <View>
          {recipient.works_at ? (
            <Text style={{ color: 'gray', flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold', marginBottom: 2 }}>{`Works at ${recipient.works_at}`}</Text>
          ) : null}
          {recipient.education ? (
            <Text style={{ color: 'gray', flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold', marginBottom: 2 }}>{`Studied at ${recipient.education}`}</Text>
          ) : null}
        </View>
      ) : (
        <Text
          style={{
            color: 'gray',
            flexDirection: 'row',
            alignSelf: 'center',
            fontWeight: 'bold',
            marginBottom: 2,
          }}
        >
          {recipient.city && recipient.state && `Lives in ${recipient.city}, ${recipient.state}`}
        </Text>
      )}
    </View>
  )
}

export default MessengerProfile
