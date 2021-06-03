import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Platform } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icons from '@/Theme/Icons'
import Images from '@/Theme/Images'
import Svg, { Path } from 'react-native-svg'

const MessengerNavigationBar = ({ callback, userData }) => {
  const icons = Icons()
  const images = Images()

  const onCallback = () => {
    if (callback) callback()
  }

  return (
    <View style={styles.navigationBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.btnNavigation} onPress={onCallback}>
          {Platform.OS === 'ios' ? (
            <Icon name="arrow-back-ios" size={22} />
          ) : (
            <Icon name="arrow-back" color={'#0099FF'} size={22} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo}>
          <View>
            <Avatar source={images.sample_profile_woman} size={28} rounded={true} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {userData.recipient.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightOptions}>
        <TouchableOpacity style={styles.btnNavigation}>
          <Svg role="presentation" fill="#0099FF" width="34" height="34" viewBox="-5 -5 30 30"><Path d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648a15.9 15.9 0 011.713 1.147c.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z" /></Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Svg role="presentation" fill="#0099FF" width="34" height="34" viewBox="-5 -5 30 30"><Path d="M19.492 4.112a.972.972 0 00-1.01.063l-3.052 2.12a.998.998 0 00-.43.822v5.766a1 1 0 00.43.823l3.051 2.12a.978.978 0 001.011.063.936.936 0 00.508-.829V4.94a.936.936 0 00-.508-.828zM10.996 18A3.008 3.008 0 0014 14.996V5.004A3.008 3.008 0 0010.996 2H3.004A3.008 3.008 0 000 5.004v9.992A3.008 3.008 0 003.004 18h7.992z" /></Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigation}>
          <Svg role="presentation" fill="#0099FF" width="24" height="24" viewBox="0 0 36 36"><Path d="M18 8.4a3 3 0 100 6 3 3 0 000-6zm-2.4 18a1.2 1.2 0 001.2 1.2h2.4a1.2 1.2 0 001.2-1.2V18a1.2 1.2 0 00-1.2-1.2h-2.4a1.2 1.2 0 00-1.2 1.2v8.4zm2.4 6c-7.953 0-14.4-6.447-14.4-14.4S10.047 3.6 18 3.6 32.4 10.047 32.4 18 25.953 32.4 18 32.4z" /></Svg>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessengerNavigationBar

const styles = StyleSheet.create({
  navigationBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    zIndex: 1,
  },
  rightOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  btnNavigation: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
