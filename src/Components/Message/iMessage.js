// Got from: https://bug2star.com/post/2/react-native-chat-ui-message-bubble

import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Avatar } from 'react-native-elements'
import { moderateScale } from 'react-native-size-matters'

const IMessageMessage = ({
  is_from_me = false,
  showTimestamp = false,
  message,
}) => {
  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({
    message: {
      flexDirection: 'row',
    },
    mine: {
      marginLeft: 20,
    },
    not_mine: {
      alignSelf: 'flex-end',
      marginRight: 20,
    },
    cloud: {
      maxWidth: moderateScale(250, 2),
      paddingHorizontal: moderateScale(10, 2),
      paddingTop: moderateScale(5, 2),
      paddingBottom: moderateScale(7, 2),
      borderRadius: 20,
    },
    text: {
      paddingTop: 3,
      fontSize: 17,
      lineHeight: 22,
    },
    arrow_container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      flex: 1,
    },
    arrow_left_container: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    arrow_right_container: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    arrow_left: {
      left: moderateScale(-6, 0.5),
    },
    arrow_right: {
      right: moderateScale(-6, 0.5),
    },
  })

  return (
    <View>
      <View style={[styles.message, !is_from_me ? styles.mine : styles.not_mine]}>
        <View
          style={[
            styles.cloud,
            {
              backgroundColor: !is_from_me ? '#dddddd' : '#007aff',
            },
          ]}
        >
          {message.message ? (
            <Text
              style={[
                styles.text,
                {
                  color: is_from_me ? 'white' : 'black',
                },
              ]}
            >
              {message.message}
            </Text>
          ) : null}
          {message.show_arrow && (
            <View
              style={[
                styles.arrow_container,
                !is_from_me
                  ? styles.arrow_left_container
                  : styles.arrow_right_container,
              ]}
            >
              <Svg
                style={is_from_me ? styles.arrow_right : styles.arrow_left}
                width={moderateScale(15.5, 0.6)}
                height={moderateScale(17.5, 0.6)}
                viewBox="32.484 17.5 15.515 17.5"
                enable-background="new 32.485 17.5 15.515 17.5"
              >
                <Path
                  d={
                    !is_from_me
                      ? 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
                      : 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
                  }
                  fill={is_from_me ? '#007AFF' : '#dddddd'}
                  x="0"
                  y="0"
                />
              </Svg>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default IMessageMessage
