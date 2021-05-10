class TwitterUser {
  id
  name
  username
  profile_image_url

  constructor(data) {
    Object.assign(this, data)
  }
}

export const Models = {
  TwitterUser: [TwitterUser],
}
