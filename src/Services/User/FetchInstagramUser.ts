import api, { handleError } from '@/Services'
import { Config } from '@/Config'

export default async (username: string) => {
  if (!username) {
    return handleError({ message: 'No username to be searched', data: null, status: 404 })
  }
  
  var response = await api.get(`https://instagram.com/${username}/channel/?__a=1`)
  
  if (response.data.errors) {
    return []
  } else {
    const user = response.data.graphql.user
    console.log(JSON.stringify(user))
    return user
  }
  
}
