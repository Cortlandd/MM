import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import IMessageContact from '@/Components/iMessageContact'
import { Recipient } from '@/Config/Types'
import Icons from '@/Theme/Icons'

interface Props {
  recipient: Recipient,
  firstName: string,
  lastName: string,
  tempImage?: string
}

const IMessageFooter = ({ recipient, firstName, lastName, tempImage }: Props) => {
  const icons = Icons()
  
  const styles = StyleSheet.create({
    navigationBar: {
      width: '100%',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 1,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      zIndex: 1,
    },
    btnNavigation: {
      height: 44,
      width: 44,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 100,
    },
  })

  function extractName(name: String) {
    if (name !== '' || name !== null) {
      return name.match(/\b\w/g)!.join('').toUpperCase()
    } else {
      return ''
    }
  }
  
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
      }}
    >
      {recipient.image || tempImage ? (
        <Avatar source={{ uri: tempImage ? tempImage : recipient.image }} renderPlaceholderContent={<IMessageContact name={extractName(`${firstName} ${lastName}`)} />} rounded={true} size={50} />
      ) : firstName || lastName ? (
        <IMessageContact name={extractName(`${firstName} ${lastName}`)} />
      ) : (
        <Avatar source={icons.ios_no_contact_icon} />
      )}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
        }}
      >
        <Text style={{ fontSize: 12 }}>{`${firstName} ${lastName}`}</Text>
        <Icon name={'chevron-right'} size={15} color={'gray'} />
      </View>
    </View>
  )
}

export default IMessageFooter
