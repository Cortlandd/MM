import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const IMessageContact = ({ name }) => {
  const icons = Icons()

  function isCharNumber(c) {
    return c >= '0' && c <= '9'
  }

  return (
    <View style={{ backgroundColor: '#fff' }}>
      {isCharNumber(name[0]) ? (
        <Avatar source={icons.ios_no_contact_icon} size={50} />
      ) : (
        <View
          style={{
            borderRadius: 50,
            backgroundColor: 'gray',
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>
            {name}
          </Text>
        </View>
      )}
    </View>
  )
}

export default IMessageContact
