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
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon, SearchBar, Card, ListItem, Avatar } from 'react-native-elements'
import FetchTwitterUser from '@/Store/User/FetchTwitterUser'
import { Config } from '@/Config'

const NewTwitterConversation = ({ route, navigation }) => {
  const dispatch = useDispatch()

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
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        platform={'default'}
        placeholder={'Search by username'}
        onChangeText={(text) => setTerm(text)}
        onClear={() => setTerm('')}
        value={term}
        round={true}
        onSubmitEditing={search} // <== Your Navigation handler
        returnKeyType={'search'}
      />
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
                      },
                      platform: 'Twitter',
                    }
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
            ref={(ref) => (this.flatList = ref)}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>No Results</Text>
              </View>
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NewTwitterConversation
