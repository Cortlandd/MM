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
import { validateBoolean } from '@/Config/Utils'

const IMessageMessage = ({ message, previousMessage, recipient }) => {
  message.is_from_me = validateBoolean(message.is_from_me)
  message.message_last_in_group = validateBoolean(message.message_last_in_group)
  message.message_first_in_group = validateBoolean(message.message_first_in_group)
  message.show_timestamp = validateBoolean(message.show_timestamp)

  const styles = StyleSheet.create({
    message: {
      flexDirection: 'row',
      ...previousMessage && {
        marginTop: (validateBoolean(message.is_from_me) === validateBoolean(previousMessage.is_from_me) && message.group_id !== previousMessage.group_id) ? 8 : 0
      },
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
      paddingBottom: moderateScale(5, 2),
      borderRadius: 20,
    },
    text: {
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

  const dateValidation = (d) => {
    var dt = new Date(d)
    var date = dt.getDate()
    var diff_days = new Date().getDate() - date
    var diff_months = new Date().getMonth() - dt.getMonth()
    var diff_years = new Date().getFullYear() - dt.getFullYear()

    var is_today = diff_years === 0 && diff_months === 0 && diff_days === 0
    var is_yesterday = diff_years === 0 && diff_months === 0 && diff_days === 1

    if (is_today) {
      const t = new Date(message.time).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })

      return 'Today ' + t
    } else if (is_yesterday) {
      const msg = new Date(message.time).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })

      return 'Yesterday ' + msg
    } else {
      return new Date(message.time).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    }
  }

  return (
    <View>
      {message.show_timestamp ? (
        <Text style={{ color: 'gray', alignSelf: 'center', marginBottom: 10 }}>
          {dateValidation(message.time)}
        </Text>
      ) : null}
      <View style={[styles.message, !message.is_from_me ? styles.mine : styles.not_mine]}>
        <View
          style={[
            styles.cloud,
            {
              backgroundColor: !message.is_from_me ? '#dddddd' : '#007aff',
            },
          ]}
        >
          <Text style={[styles.text, { color: message.is_from_me ? 'white' : 'black', },]}>
            {message.text}
          </Text>
          {message.message_last_in_group && (
            <View
              style={[
                styles.arrow_container,
                !message.is_from_me
                  ? styles.arrow_left_container
                  : styles.arrow_right_container,
              ]}
            >
              <Svg
                style={message.is_from_me ? styles.arrow_right : styles.arrow_left}
                width={moderateScale(15.5, 0.6)}
                height={moderateScale(17.5, 0.6)}
                viewBox="32.484 17.5 15.515 17.5"
                enable-background="new 32.485 17.5 15.515 17.5"
              >
                <Path
                  d={
                    !message.is_from_me
                      ? 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
                      : 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
                  }
                  fill={message.is_from_me ? '#007AFF' : '#dddddd'}
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
