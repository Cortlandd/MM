import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Dimensions, Keyboard } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const MessengerTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', minHeight: 44, width: SCREEN_WIDTH }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.btnNavigation}>
          <Icon name={'add-circle'} type={'ionicon'} size={30} color={'blue'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Icon name={'camera'} type={'ionicon'} size={30} color={'blue'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Icon name={'photo'} size={30} color={'blue'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Icon name={'mic'} size={30} color={'blue'} />
        </TouchableOpacity>
      </View>
      <View style={styles.msgInputWrapper}>
        <React.Fragment>
          <TextInput
            value={messageInput}
            onChangeText={setMessageInput}
            multiline={true}
            style={{
              ...styles.msgInput,
              width: SCREEN_WIDTH / 3,
              marginHorizontal: 15,
            }}
            placeholder={'Aa'}
          />
          <View style={styles.msgRightOptions}>
            <TouchableOpacity style={styles.btnNavigation}>
              <Icon name={'smile'} type={'feather'} size={25} color={'blue'} />
            </TouchableOpacity>
          </View>
        </React.Fragment>
      </View>
      <TouchableOpacity>
        <Icon name={'thumb-up'} type={'material'} size={30} color={'blue'} style={{ marginHorizontal: 10 }} />
      </TouchableOpacity>
    </View>
  )
}

export default MessengerTextInput

const styles = StyleSheet.create({
  msgInputWrapper: {
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgInput: {
    marginVertical: 5,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  msgRightOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  btnNavigation: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
