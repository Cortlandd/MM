import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchTwitterUserService from '@/Services/User/FetchTwitterUser'

export default {
  initialState: {
    fetchTwitterUser: { results: [], loading: false, error: null },
  },
  action: buildAsyncActions('user/fetchTwitterUser', fetchTwitterUserService),
  reducers: buildAsyncReducers({
    itemKey: 'fetchTwitterUser.results',
    errorKey: 'fetchTwitterUser.error',
    loadingKey: 'fetchTwitterUser.loading',
  }),
}
