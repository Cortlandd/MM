import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  PlatformColor,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon, SearchBar, Card, ListItem, Avatar, ThemeProvider } from 'react-native-elements'
import FetchTwitterUser from '@/Store/User/FetchTwitterUser'
import { Config } from '@/Config'
import { useTheme } from '@/Theme'

const NewTwitterConversation = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { darkMode } = useTheme()

  const fetchTwitterUserListener = useSelector(
    (state) => state.user.fetchTwitterUser.results,
  )

  const fetchTwitterUserLoading = useSelector(
    (state) => state.user.fetchTwitterUser.loading,
  )

  const fetchTwitterUserError = useSelector(
    (state) => state.user.fetchTwitterUser.error,
  )

  const [term, setTerm] = useState('')

  const search = () => {
    dispatch(FetchTwitterUser.action(term))
  }

  //let searchDebounced = debounce(search, 1500)

  return (
    <ThemeProvider useDark={darkMode}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingRight: 5,
            paddingLeft: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        >
          <Icon
            name={'close'}
            style={{
              marginRight: 5,
            }}
            color={'#1DA1F2'}
            iconStyle={{ color: '#1DA1F2' }}
            onPress={() => navigation.goBack()}
            size={30}
          />
          <SearchBar
            containerStyle={{
              width: '90%',
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
            }}
            inputContainerStyle={{ backgroundColor: 'transparent' }}
            platform={'default'}
            placeholder={'Search by username'}
            inputStyle={{
              ...Platform.select({
                ios: { color: PlatformColor('label') },
                android: { color: 'black' },
              }),
            }}
            onChangeText={(text) => setTerm(text)}
            onClear={() => setTerm('')}
            value={term}
            round={true}
            selectionColor={'#1DA1F2'}
            onSubmitEditing={search} // <== Your Navigation handler
            returnKeyType={'search'}
          />
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={54}
          enabled={true}
        >
          {fetchTwitterUserLoading && (
            <ActivityIndicator
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          )}
          {fetchTwitterUserError ? (
            <Text style={{ textAlign: 'center' }}>
              {fetchTwitterUserError.message}
            </Text>
          ) : (
            <FlatList
              data={fetchTwitterUserListener}
              renderItem={({ item, index }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      const conversation = {
                        time: Date.now(),
                        recipient: {
                          name: item.name,
                          image: item.profile_image_url,
                          username: item.username,
                          biography: item.description,
                          followers: item.public_metrics.followers_count,
                          following: item.public_metrics.following_count,
                          created_at: item.created_at,
                          verified: item.verified,
                        },
                        platform: 'Twitter',
                      }
                      console.log(JSON.stringify(item))
                      navigation.navigate(
                        Config.containerNames.TwitterConversation,
                        {
                          item: conversation,
                        },
                      )
                    }}
                  >
                    <Card>
                      <ListItem key={item.id.toString()}>
                        <Avatar source={{ uri: item.profile_image_url }} />
                        <ListItem.Content>
                          <ListItem.Title>{item.name}</ListItem.Title>
                          <ListItem.Subtitle>@{item.username}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </Card>
                  </TouchableWithoutFeedback>
                )
              }}
              ListEmptyComponent={
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text>No Results</Text>
                </View>
              }
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default NewTwitterConversation
