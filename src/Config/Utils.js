// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing. https://stackoverflow.com/a/61241621
import { Config } from '@/Config/index'
import Images from '@/Theme/Images'
import { Platform } from 'react-native'

const TRUE_VALUES = [true, 1, '1', 't', 'true', 'y', 'yes', 'Y']
const FALSE_VALUES = [false, 0, 'no', 'n', 'N']

let RNFS = require('react-native-fs');

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    if (!timer) {
      func.apply(this, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

export const determineRoute = (route) => {
  switch (route) {
    case Config.messagingPlatforms.Instagram:
      return Config.containerNames.InstagramConversation
    case Config.messagingPlatforms.Twitter:
      return Config.containerNames.TwitterConversation
    case Config.messagingPlatforms.Messenger:
      return Config.containerNames.MessengerConversation
    case Config.messagingPlatforms.iMessage:
      return Config.containerNames.iMessageConversation
    default:
      break
  }
}

export const getPlatformLogo = (platform) => {
  const images = Images()

  switch (platform) {
    case Config.messagingPlatforms.Instagram:
      return images.Instagram
    case Config.messagingPlatforms.Twitter:
      return images.Twitter
    case Config.messagingPlatforms.Messenger:
      return images.Messenger
    case Config.messagingPlatforms.iMessage:
      return images.iMessage
    default:
      break
  }
}

export const getDatetimeForSqlite = () => {
  var dt = new Date()
  return `${(dt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${dt
    .getDate()
    .toString()
    .padStart(2, '0')}/${dt
    .getFullYear()
    .toString()
    .padStart(4, '0')} ${dt
    .getHours()
    .toString()
    .padStart(2, '0')}:${dt
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`
}

export const validateBoolean = (value) => {
  if (TRUE_VALUES.includes(value)) {
    return true
  } else if (FALSE_VALUES.includes(value)) {
    return false
  } else {
    return null
  }
} 

export const booleanToInteger = (value) => {
  if (value) {
    return 1
  } else {
    return 0
  }
}

export function createGuid() {
  function _p8(s) {
    let p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

export const dateValidation = (d) => {
  var dt = new Date(d)
  var date = dt.getDate()
  var diff_days = new Date().getDate() - date
  var diff_months = new Date().getMonth() - dt.getMonth()
  var diff_years = new Date().getFullYear() - dt.getFullYear()

  var is_today = diff_years === 0 && diff_months === 0 && diff_days === 0
  var is_yesterday = diff_years === 0 && diff_months === 0 && diff_days === 1

  if (is_today) {
    return dt.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
  } else if (is_yesterday) {
    const msg = dt.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })

    return 'Yesterday ' + msg
  } else {
    return dt.toLocaleTimeString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }
}

export const imagePath = (file_name) => {
  const extension = Platform.OS === 'android' ? 'file://' : ''
  return `${extension}${RNFS.DocumentDirectoryPath}/${file_name}`
}

export const isValidURL = (str) => {
  if (str === '' || str === ' ') return false

  var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}

export const getURLExtension = (url) => {
  if (url === '') return null

  return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const getConversationContainer = (platform) => {
  switch (platform) {
    case Config.messagingPlatforms.Instagram: {
      return Config.containerNames.InstagramConversation
    }
    case Config.messagingPlatforms.iMessage: {
      return Config.containerNames.iMessageConversation
    }
    case Config.messagingPlatforms.Messenger: {
      return Config.containerNames.MessengerConversation
    }
    case Config.messagingPlatforms.Twitter: {
      return Config.containerNames.TwitterConversation
    }
    default: {
      break
    }
  }
}

export const recipientImageExist = (path) => {
  RNFS.exists(path).then((exists) => {
    return exists
  })
}

export const parseTwitterDate = (d) => {
  const date = new Date(d)
  const options = { year: 'numeric', month: 'long' };
  // TODO: Handle this by user settings
  // TODO: Use something like moment for handling dates in android
  const parsed = date.toLocaleDateString('en-US', options);
  return 'Joined ' + parsed
}
