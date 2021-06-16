import {
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { InstagramUserASearch } from '@/Config/Types'
import fetchInstagramUserService from '@/Services/User/FetchInstagramUser'

export default {
  initialState: {
    fetchInstagramUser: { results: [], loading: false, error: null }
  },
  action: buildAsyncActions('user/fetchInstagramUser', fetchInstagramUserService),
  reducers: buildAsyncReducers({
    itemKey: 'fetchInstagramUser.results',
    errorKey: 'fetchInstagramUser.error',
    loadingKey: 'fetchInstagramUser.loading',
  })
}
