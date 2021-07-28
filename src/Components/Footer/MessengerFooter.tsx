import React from 'react'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as Utils from '@/Config/Utils'

interface Props {
  platform: string,
  image: string,
  firstName: string,
  lastName: string,
  isFriends: boolean,
  worksAt: string,
  education: string,
  city: string,
  state: string,
  tempImage?: string,
}

const MessengerFooter = ({ ...props }: Props) => {

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', marginHorizontal: 10, marginTop: -20 }}>
      <Avatar containerStyle={{ alignSelf: 'center', margin: 10 }} rounded={true} size={100} source={{ uri: props.tempImage ? props.tempImage : props.image }} />
      <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 22, marginBottom: 3 }}>{`${props.firstName} ${props.lastName}`}</Text>
      <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: '700' }}>{props.platform}</Text>
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
        {Utils.validateBoolean(props.isFriends) ? "You're friends on Facebook" : "You're not friends on Facebook" }
      </Text>
      {Utils.validateBoolean(props.isFriends) ? (
        <View style={{ marginBottom: 2 }}>
          {props.city && props.state ? (
            <Text
              style={{
                color: 'gray',
                flexDirection: 'row',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              {`Lives in ${props.city}, ${props.state}`}
            </Text>
          ) : null}
        </View>
      ) : null}
      {props.worksAt || props.education ? (
        <View style={{ marginBottom: 5 }}>
          {props.worksAt ? (
            <Text style={{ color: 'gray', flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold', fontSize: 14 }}>{`Works at ${props.worksAt}`}</Text>
          ) : null}
          {props.education ? (
            <Text style={{ color: 'gray', flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold', fontSize: 14 }}>{`Studied at ${props.education}`}</Text>
          ) : null}
        </View>
      ) : null}
      <View style={{ paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#ececec', alignSelf: 'center', borderRadius: 20, marginTop: 5 }}>
        <Text style={{ fontWeight: '600', fontSize: 14 }}>VIEW PROFILE</Text>
      </View>
    </View>
  )
}

export default MessengerFooter
