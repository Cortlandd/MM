import Images from '@/Theme/Images'

const images = Images()

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
]

export const SeedData = {
  TestConversationList: TestConversationList,
}
