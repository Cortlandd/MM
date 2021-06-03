import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Dimensions,
  Keyboard,
  Animated,
  TouchableWithoutFeedback, PlatformColor, Platform
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import Icons from '@/Theme/Icons'
import Svg, { Path } from 'react-native-svg'
import { Grid, Row, Col } from '@/Components'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const MessengerTextInput = ({ messageInput, setMessageInput, onSend }) => {
  const icons = Icons()

  const [additionalOptionsVisible, setAdditionalOptionsVisible] = useState(true)

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        width: SCREEN_WIDTH,
      }}
    >
      <Grid>
        <Col
          style={
            !additionalOptionsVisible && { width: 50, alignItems: 'center' }
          }
        >
          {additionalOptionsVisible ? (
            <Animated.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <TouchableOpacity>
                <Avatar source={icons.messenger_dot_icon} size={18} avatarStyle={{ tintColor: '#0099FF' }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name={'camera'}
                  type={'ionicon'}
                  size={25}
                  color={'#0099FF'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                {/*<Icon name={'photo'} style={{ borderRadius: 10 }} type={'foundation'} size={30} color={'#0099FF'} />*/}
                <Svg viewBox="0 0 36 36" height={33} width={33}>
                  <Path d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z" fill="#0099FF" />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z"
                    fill="#0099FF"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity>
                <Avatar
                  source={icons.facebook_microphone}
                  size={23}
                  avatarStyle={{ tintColor: '#0099FF' }}
                />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.btnNavigation}
                onPress={() => setAdditionalOptionsVisible(true)}
              >
                <Icon
                  name={'chevron-right'}
                  type={'feather'}
                  size={30}
                  color={'#0099FF'}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </Col>
        <Col style={{ height: 38 }}>
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
              selectionColor={'#0099FF'}
              placeholderTextColor={'#65676b'}
              placeholder={additionalOptionsVisible ? 'Aa' : 'Type a message...'}
            />
            <View style={styles.msgRightOptions}>
              <TouchableOpacity style={styles.btnNavigation}>
                <Svg height="33" viewBox="0 0 36 36" width="33">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 29c6.075 0 11-4.925 11-11S24.075 7 18 7 7 11.925 7 18s4.925 11 11 11zm-5.25-13c0-1.25.563-2 1.5-2 .938 0 1.5.75 1.5 2s-.563 2-1.5 2c-.938 0-1.5-.75-1.5-2zm7.5 0c0-1.25.563-2 1.5-2 .938 0 1.5.75 1.5 2s-.563 2-1.5 2c-.938 0-1.5-.75-1.5-2zm-7.52 5.464a1 1 0 011.41-.12 5.963 5.963 0 003.856 1.406c1.47 0 2.813-.528 3.856-1.406a1 1 0 111.288 1.53 7.962 7.962 0 01-5.144 1.876 7.962 7.962 0 01-5.144-1.877 1 1 0 01-.121-1.409z"
                    fill="#0099FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </Col>
        <Col style={{ width: 50 }}>
          <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }}>
            {messageInput.length > 0 ? (
              <TouchableWithoutFeedback onPress={onSend}>
                <View>
                  <Svg width="20px" height="20px" viewBox="0 0 24 24">
                    <Path
                      d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
                      fill="#0099FF"
                      fill-rule="evenodd"
                      stroke="none"
                    />
                  </Svg>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <Svg viewBox="0 0 22 23" height="20" width="20">
                <Path
                  d="M10.987 0c1.104 0 3.67.726 3.67 5.149 0 1.232-.123 2.001-.209 2.534a16.11 16.11 0 00-.048.314l-.001.005a.36.36 0 00.362.406c4.399 0 6.748 1.164 6.748 2.353 0 .533-.2 1.02-.527 1.395a.11.11 0 00.023.163 2.13 2.13 0 01.992 1.79c0 .86-.477 1.598-1.215 1.943a.11.11 0 00-.046.157c.207.328.329.713.329 1.128 0 .946-.547 1.741-1.406 2.029a.109.109 0 00-.068.137c.061.184.098.38.098.584 0 1.056-1.776 1.913-5.95 1.913-3.05 0-5.154-.545-5.963-.936-.595-.288-1.276-.81-1.276-2.34v-6.086c0-1.72.958-2.87 1.911-4.014C9.357 7.49 10.3 6.36 10.3 4.681c0-1.34-.091-2.19-.159-2.817-.039-.368-.07-.66-.07-.928 0-.527.385-.934.917-.936zM3.5 11h-2C.5 11 0 13.686 0 17s.5 6 1.5 6h2a1 1 0 001-1V12a1 1 0 00-1-1z"
                  fill="#0099FF"
                />
              </Svg>
            )}
          </TouchableOpacity>
        </Col>
      </Grid>
    </View>
  )
}

export default MessengerTextInput

const styles = StyleSheet.create({
  msgInputWrapper: {
    borderRadius: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f5',
    flex: 1,
    ...Platform.select({
      ios: { paddingHorizontal: 5 },
    }),
  },
  msgInput: {
    marginVertical: 7,
    fontSize: 15,
    marginHorizontal: 7,
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
  },
  msgRightOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  btnNavigation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
