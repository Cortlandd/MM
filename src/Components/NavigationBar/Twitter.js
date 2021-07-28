import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'
import Svg, { Path, Circle } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'
import { useTheme } from '@/Theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import * as Utils from '@/Config/Utils'

const TwitterNavigationBar = ({ callback, title, userData, navigationClick }) => {
  const icons = Icons()
  const images = Images()
  const { darkMode } = useTheme()

  const onCallback = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <View
      style={{
        width: '100%',
        borderBottomColor: darkMode ? '#c4cfd6' : '#c4cfd6',
        borderBottomWidth: 0.5,
        minHeight: Platform.OS === 'android' ? 55 : 44,
        paddingRight: Platform.OS === 'android' ? 16 : 10,
        paddingLeft: Platform.OS === 'android' ? 16 : 15,
        ...Platform.select({
          android: {
            paddingTop: 3,
          },
        }),
      }}
    >
      <Grid>
        <Row>
          <Col
            style={{
              width: '15%',
              ...Platform.select({
                android: {
                  justifyContent: 'center',
                },
              }),
            }}
          >
            <TouchableOpacity
              style={{ ...styles.btnNavigation, alignSelf: 'flex-start' }}
              onPress={onCallback}
            >
              {Platform.select({
                ios: (
                  <Icon
                    name="arrow-back-ios"
                    color={'#1DA1F2'}
                    size={moderateScale(24)}
                  />
                ),
                android: (
                  <Svg
                    width={moderateScale(24)}
                    height={moderateScale(24)}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <Path
                      fill={'#1DA1F2'}
                      d="M20 11H7.414l4.293-4.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a.996.996 0 001.414 0 1 1 0 000-1.414L7.414 13H20a1 1 0 100-2z"
                    />
                  </Svg>
                ),
              })}
            </TouchableOpacity>
          </Col>
          <Col
            style={{
              width: '70%',
            }}
          >
            {Platform.OS === 'asdf' ? (
              <View style={{ alignItems: 'center' }}>
                {__DEV__ ? (
                  <Avatar source={images.sample_profile_woman} rounded={true} />
                ) : (
                  <Avatar source={{ uri: userData.image }} rounded={true} />
                )}
              </View>
            ) : (
              <View
                style={{
                  alignItems:
                    Platform.OS === 'android' ? 'flex-start' : 'center',
                }}
              >
                <View style={{ flexDirection: 'row', marginBottom: Platform.OS === 'android' ? -3 : 0 }}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: 'bold',
                      ...Platform.select({
                        android: {
                          color: 'black',
                        },
                      }),
                    }}
                  >
                    {userData.name}
                  </Text>
                  {Utils.validateBoolean(userData.verified) && (
                    <Svg viewBox="0 0 24 24" width={20} fill={'#1DA1F2'} aria-label="Verified account">
                      <Path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25a3.606 3.606 0 00-1.336-.25c-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5a.749.749 0 01-1.041.208l-.115-.094-2.415-2.415a.749.749 0 111.06-1.06l1.77 1.767 3.825-5.74a.75.75 0 011.25.833z" />
                    </Svg>
                  )}
                </View>
                <Text style={{ color: '#657786', fontSize: 14 }}>
                  @{userData.username}
                </Text>
              </View>
            )}
          </Col>
          <Col
            style={{
              width: '15%',
              ...Platform.select({
                android: {
                  justifyContent: 'center',
                },
              }),
            }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity style={styles.btnNavigation} onPress={navigationClick}>
                <Svg
                  width={moderateScale(23)}
                  height={moderateScale(23)}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <Path
                    d="M12 18.042a1 1 0 01-1-1v-5.5a1 1 0 112 0v5.5a1 1 0 01-1 1z"
                    fill={'#1DA1F2'}
                  />
                  <Circle cx={12} cy={8.042} r={1.25} fill={'#1DA1F2'} />
                  <Path
                    fill={'#1DA1F2'}
                    d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </Col>
        </Row>
        {Platform.OS === 'asdf' && (
          <Row style={{ alignSelf: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: darkMode ? '#fff' : '#000',
              }}
            >
              {userData.name}
            </Text>
          </Row>
        )}
      </Grid>
    </View>
  )
}

export default TwitterNavigationBar

const STATUS_BAR_HEIGHT = getStatusBarHeight()
const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnNavigation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
