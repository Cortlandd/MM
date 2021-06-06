import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import Images from '@/Theme/Images'
import Svg, { Path } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'
import { Config } from '@/Config'

const TwitterMessage = ({ message, lastMessage }) => {
  const images = Images()

  var borderTopRightRadiusValue = 0
  var borderTopLeftRadiusValue = 0
  var borderBottomRightRadiusValue = 0
  var borderBottomLeftRadiusValue = 0

  if (message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
    } else {
      borderTopRightRadiusValue = 0
      borderTopLeftRadiusValue = 20
      borderBottomLeftRadiusValue = 20
      borderBottomRightRadiusValue = 0
    }
  }

  if (!message.is_from_me) {
    if (message.message_first_in_group) {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 20
      borderBottomRightRadiusValue = 20
    } else {
      borderTopRightRadiusValue = 20
      borderTopLeftRadiusValue = 0
      borderBottomLeftRadiusValue = 0
      borderBottomRightRadiusValue = 20
    }
  }

  const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({
    messageItem: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    message: {
      borderTopRightRadius: borderTopRightRadiusValue,
      borderTopLeftRadius: borderTopLeftRadiusValue,
      borderBottomLeftRadius: borderBottomLeftRadiusValue,
      borderBottomRightRadius: borderBottomRightRadiusValue,
      maxWidth: SCREEN_WIDTH * 0.6,
      backgroundColor: '#ddd',
      paddingHorizontal: 15,
    },
    msgText: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      color: message.is_from_me ? '#fff' : '#000',
      fontSize: 15,
    },
  })

  function getProfileImage() {
    if (
      (!message.is_from_me &&
        message.message_first_in_group &&
        message.message_last_in_group) ||
      (!message.is_from_me && message.message_last_in_group)
    ) {
      return message.recipient.image
    } else {
      return null
    }
  }

  const MessageTimestamp = () => {
    const dateValidation = (d) => {
      var dt = new Date(d)
      var date = dt.getDate()
      var diff_days = new Date().getDate() - date
      var diff_months = new Date().getMonth() - dt.getMonth()
      var diff_years = new Date().getFullYear() - dt.getFullYear()

      var is_today = diff_years === 0 && diff_months === 0 && diff_days === 0
      var is_yesterday = diff_years === 0 && diff_months === 0 && diff_days === 1

      if (is_today) {
        return message.time.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })
      } else if (is_yesterday) {
        const msg = message.time.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })

        return 'Yesterday ' + msg
      } else {
        return message.time.toLocaleTimeString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      }
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: message.is_from_me ? 'flex-end' : 'flex-start',
          marginTop: 2,
        }}
      >
        <Text style={{ color: 'gray', fontSize: 13 }}>
          {dateValidation(message.time)}
        </Text>
        {message.is_from_me && message.isMsgRead && (
          <Svg
            viewBox="0 0 24 24"
            width={moderateScale(15)}
            height={moderateScale(15)}
            aria-hidden="true"
            style={{ marginLeft: 3 }}
          >
            <Path
              d="M9 20a.995.995 0 01-.707-.293l-4.785-4.785a1 1 0 011.414-1.414l3.946 3.945L18.075 4.41a1 1 0 111.635 1.154L9.817 19.577A1.003 1.003 0 019 20z"
              fill={'#007AFF'}
            />
          </Svg>
        )}
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: message.is_from_me ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Avatar */}
      <View style={message.is_from_me && { display: 'none' }}>
        <Avatar
          rounded
          avatarStyle={!message.showAvatar && { display: 'none' }}
          source={
            __DEV__ ? images.sample_profile_woman : { uri: getProfileImage() }
          }
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: message.is_from_me ? 15 : 10,
        }}
      >
        {/* Message and timestamp */}
        <TouchableOpacity>
          <View
            style={{
              ...styles.messageItem,
              justifyContent: message.is_from_me ? 'flex-end' : 'flex-start',
              marginTop: message.message_first_in_group ? 15 : 2,
            }}
            activeOpacity={1}
          >
            <View
              style={[
                styles.message,
                {
                  alignItems: message.is_from_me ? 'flex-end' : 'flex-start',
                  backgroundColor: message.is_from_me ? '#1DA1F2' : '#E1E8ED',
                  marginRight: !message.is_from_me && 8,
                },
              ]}
            >
              <Text style={styles.msgText}>{message.message}</Text>
            </View>
            {!message.is_from_me && (
              <Svg
                style={{
                  display: message.is_from_me && !message.message_last_in_group && 'none'
                }}
                viewBox="0 0 24 24"
                aria-hidden="true"
                width={moderateScale(22.5)}
                height={moderateScale(22.5)}
              >
                <Path
                  fill={'#5b7083'}
                  d="M22.436 16.92H19.76v-2.673a.749.749 0 10-1.5 0v2.674h-2.676c-.413 0-.75.337-.75.75s.337.75.75.75h2.677v2.677c0 .413.337.75.75.75s.75-.337.75-.75V18.42h2.676a.75.75 0 000-1.5z"
                />
                <Path
                  fill={'#5b7083'}
                  d="M11.088 21.214c-2.61-.046-10.064-6.778-10.064-13.157 0-3.066 2.525-5.755 5.404-5.755 2.29 0 3.83 1.582 4.646 2.73.816-1.148 2.357-2.73 4.646-2.73 2.878 0 5.403 2.69 5.403 5.755 0 1.13-.232 2.323-.69 3.545a.75.75 0 11-1.404-.526c.394-1.053.594-2.07.594-3.02 0-2.266-1.824-4.254-3.903-4.254-2.525 0-3.94 2.937-3.952 2.966-.23.562-1.155.562-1.387 0-.01-.03-1.425-2.966-3.952-2.966-2.08 0-3.904 1.988-3.904 4.255 0 5.76 7.076 11.63 8.563 11.657.168-.003.764-.195 1.758-.892a.75.75 0 01.861 1.229c-1.085.76-1.966 1.153-2.618 1.164z"
                />
              </Svg>
            )}
          </View>
        </TouchableOpacity>
        {message.showTimestamp && <MessageTimestamp />}
      </View>
    </View>
  )
}

export default TwitterMessage
