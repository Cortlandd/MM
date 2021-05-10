import api, { handleError } from '@/Services'
import { Config } from '@/Config'

export default async (username) => {
  if (!username) {
    return handleError({ message: 'username is missing' })
  }

  const params = {
    usernames: username,
    'user.fields': 'name,username,profile_image_url',
  }
  api.defaults.params = params

  var response = await api.get(Config.twitterConfig.ENDPOINT, {
    headers: {
      Authorization: `Bearer ${Config.twitterCredentials.BEARER_TOKEN}`,
    },
  })

  if (response.data.errors) {
    return []
  } else {
    return response.data.data
  }
}
