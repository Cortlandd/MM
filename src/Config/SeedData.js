import Images from '@/Theme/Images'

const images = Images()

const TestConversation = [
  {
    id: 1,
    time: Date.now(),
    message: 'Hello',
    type: 'sent',
    recipient: {
      name: 'Vito Corleone',
      image: images.FacebookMessenger,
    },
  },
  {
    id: 2,
    time: Date.now(),
    message: 'My name is Cortland',
    type: 'sent',
    recipient: {
      name: 'Vito Corleone',
      image: images.FacebookMessenger,
    },
  },
  {
    id: 3,
    time: Date.now() + 10,
    message: 'Hello Cortland, how can I help you?',
    type: 'received',
    recipient: {
      name: 'Vito Corleone',
      image: images.FacebookMessenger,
    },
  },
  {
    id: 4,
    time: Date.now() + 10,
    message: 'Just saying hi. Wanted to introduce myself. and testing this',
    type: 'sent',
    recipient: {
      name: 'Vito Corleone',
      image: images.FacebookMessenger,
    },
  },
  {
    id: 5,
    time: Date.now() + 10,
    message: 'Okay',
    type: 'received',
    recipient: {
      name: 'Vito Corleone',
      image: images.FacebookMessenger,
    },
  },
]

const TestConversationList = [
  {
    recipient: {
      name: 'Vito Corleone',
      image: images.FacebookMessenger,
    },
    sender: {
      name: 'Jack White',
      image: images.FacebookMessenger,
    },
    platform: 'FacebookMessenger',
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
      name: 'Michael Corleone',
      image: images.Instagram,
    },
    sender: {
      name: 'Sydney Jones',
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
]

export const SeedData = {
  TestConversationList: TestConversationList,
  TestConversation: TestConversation,
}
