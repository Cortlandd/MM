import Images from '@/Theme/Images'
import { Config } from '@/Config/index'

const images = Images()

const TestConversation = [
  {
    id: 1,
    time: Date.now(),
    message: 'Hello',
    type: 'sent',
    recipient: {
      name: 'Vito Corleone',
      image: images.Messenger,
    },
  },
  {
    id: 2,
    time: Date.now(),
    message: 'My name is Cortland',
    type: 'sent',
    recipient: {
      name: 'Vito Corleone',
      image: images.Messenger,
    },
  },
  {
    id: 3,
    time: Date.now() + 10,
    message: 'Hello Cortland, how can I help you?',
    type: 'received',
    recipient: {
      name: 'Vito Corleone',
      image: images.Messenger,
    },
  },
  {
    id: 4,
    time: Date.now() + 10,
    message: 'Just saying hi. Wanted to introduce myself. and testing this',
    type: 'sent',
    recipient: {
      name: 'Vito Corleone',
      image: images.Messenger,
    },
  },
  {
    id: 5,
    time: Date.now() + 10,
    message: 'Okay',
    type: 'received',
    recipient: {
      name: 'Vito Corleone',
      image: images.Messenger,
    },
  },
]

const TestConversationList = [
  {
    recipient: {
      name: 'Vito Corleone',
      image: images.Messenger,
    },
    sender: {
      name: 'Jack White',
      image: images.Messenger,
    },
    platform: 'Messenger',
  },
  {
    recipient: {
      name: 'Sonny Corleone',
      image: images.Instagram,
    },
    sender: {
      name: 'Sam Smith',
      image: images.Instagram,
    },
    platform: 'Instagram',
  },
  {
    recipient: {
      name: 'Luca Brasi',
      image: images.Twitter,
    },
    sender: {
      name: 'Dude Love',
      image: images.Twitter,
    },
    platform: 'Twitter',
  },
  {
    recipient: {
      name: 'Tony Salvatore',
      image: images.iMessage,
    },
    sender: {
      name: 'Jackson Strong',
      image: images.iMessage,
    },
    platform: 'iMessage',
  },
]

export const SeedData = {
  TestConversationList: TestConversationList,
  TestConversation: TestConversation,
}
