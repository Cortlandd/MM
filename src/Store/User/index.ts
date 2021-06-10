import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchTwitterUser from './FetchTwitterUser'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
}

export default buildSlice('user', [FetchTwitterUser], sliceInitialState).reducer

export interface UserState {
  item: {
    name: string
  }
  fetchTwitterUser: {
    results: any
    loading: boolean
    error: any
  }
}
