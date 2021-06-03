import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  PlatformColor, Image, TouchableWithoutFeedback,
} from 'react-native'
import { Icon, Input, Button, ThemeProvider } from 'react-native-elements'
import { useTheme } from '@/Theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Config } from '@/Config'

const NewGenericConversation = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { item } = route.params
  const { darkMode } = useTheme()

  const [isFaceBookFriends, setIsFacebookFriends] = useState(false)

  return (
    <ThemeProvider useDark={darkMode}>
      <SafeAreaView
        style={{
          flex: 1,
          ...Platform.select({
            ios: { backgroundColor: PlatformColor('systemBackground') },
            android: { backgroundColor: 'white' },
          }),
        }}
      >
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Icon name={'close'} onPress={() => navigation.goBack()} size={40} />
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          <TouchableWithoutFeedback onPress={() => console.log('hello')}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 150,
                padding: 10,
                borderColor: 'gray',
                height: 150,
                width: 150,
              }}
            >
              <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: darkMode ? '#FFF' : 'gray', fontWeight: 'bold' }}>Upload Profile Image</Text>
                <Icon name={'add'} color={'green'} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Grid>
            {item.name === Config.messagingPlatforms.Instagram ? (
              <View>
                <Row style={{ height: 50 }}>
                  <Col>
                    <Input placeholder={'Display Name'} />
                  </Col>
                  <Col>
                    <Input placeholder={'Username'} />
                  </Col>
                </Row>
              </View>
            ) : (
              <View>
                <Row style={{ height: 50 }}>
                  <Col>
                    <Input placeholder={'First Name'} />
                  </Col>
                  <Col>
                    <Input placeholder={'Last Name'} />
                  </Col>
                </Row>
              </View>
            )}
            <Row style={{ height: 50 }}>
              {item.name === Config.messagingPlatforms.Messenger && (
                <Col style={{ width: '50%' }}>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Friend Count'}
                  />
                </Col>
              )}
              {item.name === Config.messagingPlatforms.Instagram && (
                <Col>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Follower Count'}
                  />
                </Col>
              )}
              {item.name === Config.messagingPlatforms.Instagram && (
                <Col>
                  <Input
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={'Following Count'}
                  />
                </Col>
              )}
            </Row>
            {item.name === Config.messagingPlatforms.Instagram && (
              <Row style={{ width: '50%' }}>
                <Input
                  keyboardType={'numeric'}
                  maxLength={10}
                  placeholder={'Post Count'}
                />
              </Row>
            )}
            {item.name === Config.messagingPlatforms.Messenger && (
              <View>
                <Row style={{ height: 50 }}>
                  <Col>
                    <Input placeholder={'City'} />
                  </Col>
                  <Col>
                    <Input placeholder={'State'} />
                  </Col>
                </Row>
                <Row style={{ height: 50, marginLeft: 10 }}>
                  <Col>
                    <Text style={{ color: darkMode ? '#FFF' : '#000' }}>
                      Facebook Friends?
                    </Text>
                    <Switch
                      trackColor={{ false: '#765077', true: '#81b0ff' }}
                      onValueChange={(value) => setIsFacebookFriends(value)}
                      value={isFaceBookFriends}
                    />
                  </Col>
                </Row>
              </View>
            )}
          </Grid>
          <Button title={'Save'} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default NewGenericConversation
