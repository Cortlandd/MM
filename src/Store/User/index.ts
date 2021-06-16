import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchTwitterUser from './FetchTwitterUser'
import FetchInstagramUser from './FetchInstagramUser'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
}

export default buildSlice('user', [FetchTwitterUser, FetchInstagramUser], sliceInitialState).reducer

export interface UserState {
  item: {
    name: string
  }
  fetchTwitterUser: {
    results: any
    loading: boolean
    error: any
  }
  fetchInstagramUser: {
    results: any
    loading: boolean
    error: any
  }
}
