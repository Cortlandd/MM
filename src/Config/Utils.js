// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing. https://stackoverflow.com/a/61241621
import { Config } from '@/Config/index'
import Images from '@/Theme/Images'

const TRUE_VALUES = [true, 1, '1', 't', 'true', 'y', 'yes']
const FALSE_VALUES = [false, 0, 'no', 'n']

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
