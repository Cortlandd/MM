import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Dimensions, Keyboard, Animated } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const MessengerTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()

  const [additionalOptionsVisible, setAdditionalOptionsVisible] = useState(true)

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', minHeight: 44, width: SCREEN_WIDTH }}>
      {additionalOptionsVisible ? (
        <Animated.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <TouchableOpacity style={{ ...styles.btnNavigation, marginLeft: 5 }}>
            <Icon name={'add-circle'} type={'ionicon'} size={30} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon name={'camera'} type={'ionicon'} size={30} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon name={'photo'} type={'foundation'} size={30} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon name={'mic'} size={30} color={'blue'} />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.btnNavigation} onPress={() => setAdditionalOptionsVisible(true)}>
            <Icon name={'chevron-right'} type={'feather'} size={30} color={'blue'} />
          </TouchableOpacity>
        </Animated.View>
      )}

      <View style={styles.msgInputWrapper}>
        <TextInput
          value={messageInput}
          onChangeText={(value) => {
            setMessageInput(value)
            setAdditionalOptionsVisible(false)
          }}
          onFocus={() => setAdditionalOptionsVisible(false)}
          multiline={true}
          style={{
            ...styles.msgInput,
          }}
          placeholder={' Aa'}
        />
        <View style={styles.msgRightOptions}>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon
              name={messageInput.length > 0 ? 'search' : 'smile'}
              type={'feather'}
              size={25}
              color={'blue'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={{ marginRight: 10 }}>
        {messageInput.length > 0
          ? (<Icon name={'send'} onPress={onSend} type={'material'} size={30} color={'blue'} />)
          : (<Icon name={'thumb-up'} type={'material'} size={30} color={'blue'}/>)}
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
    width: '50%',
    paddingHorizontal: 5,
    marginRight: 15,
    flex: 1,
  },
  msgInput: {
    marginVertical: 7,
    fontSize: 16,
    marginHorizontal: 7,
    paddingTop: 0,
    paddingBottom: 0,
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
