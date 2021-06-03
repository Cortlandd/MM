import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Platform } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'
import Svg, { Path, Circle } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'
import { useTheme } from '@/Theme'

const TwitterNavigationBar = ({ callback, title, userData }) => {
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
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 1,
        borderBottomColor: darkMode ? '#17191b' : '#ebeef0',
        borderBottomWidth: 1,
        paddingBottom: 5,
        zIndex: 1,
        paddingRight: 5,
        paddingLeft: 10,
      }}
    >
      <View style={styles.navigationBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.btnNavigation} onPress={onCallback}>
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
        </View>
        <View style={{ alignItems: 'center' }}>
          {__DEV__ ? (
            <Avatar source={images.sample_profile_woman} rounded={true} />
          ) : (
            <Avatar source={{ uri: userData.recipient.image }} rounded={true} />
          )}
        </View>
        <View style={styles.rightOptions}>
          <TouchableOpacity style={styles.btnNavigation}>
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
              <Path fill={'#1DA1F2'} d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: darkMode ? '#fff' : '#000' }}>
          {userData.recipient.name}
        </Text>
      </View>
    </View>
  )
}

export default TwitterNavigationBar

const STATUS_BAR_HEIGHT: number = getStatusBarHeight()
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
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
