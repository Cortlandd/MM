import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  PlatformColor,
  Image,
  TouchableWithoutFeedback, ActivityIndicator, FlatList,
} from 'react-native'
import {
  Icon,
  Input,
  Button,
  ThemeProvider,
  SearchBar, Card, ListItem, Avatar,
} from 'react-native-elements'
import { useTheme } from '@/Theme'
import { Grid, Col, Row } from '@/Components'
import { Config } from '@/Config'
import Images from '@/Theme/Images'
import axios from 'axios'
import FetchInstagramUser from '@/Store/User/FetchInstagramUser'

const NewInstagramConversation = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { darkMode } = useTheme()

  const fetchInstagramUserListener = useSelector(
    (state) => state.user.fetchInstagramUser.results,
  )

  const fetchInstagramUserLoading = useSelector(
    (state) => state.user.fetchInstagramUser.loading,
  )

  const fetchInstagramUserError = useSelector(
    (state) => state.user.fetchInstagramUser.error,
  )

  const [term, setTerm] = useState('')

  const search = () => {
    axios.get(Config.instagramConfig.ENDPOINT + `/${term}/?__a=1`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 3000,
    })
    dispatch(FetchInstagramUser.action(term))
    console.log(fetchInstagramUserListener)
  }

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
            color={'gray'}
            iconStyle={{ color: 'gray' }}
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
                android: { color: 'white' },
              }),
            }}
            onChangeText={(text) => setTerm(text)}
            onClear={() => setTerm('')}
            value={term}
            round={true}
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
          {fetchInstagramUserLoading && (
            <ActivityIndicator
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          )}
          {fetchInstagramUserError ? (
            <Text style={{ textAlign: 'center' }}>
              {fetchInstagramUserError.message}
            </Text>
          ) : (
            <FlatList
              data={fetchInstagramUserListener}
              renderItem={({ item, index }) => {
                return (
                  // <TouchableWithoutFeedback
                  //   onPress={() => {
                  //     const conversation = {
                  //       time: Date.now(),
                  //       recipient: {
                  //         name: item.graphql.user.full_name,
                  //         image: item.graphql.user.profile_pic_url_hd,
                  //       },
                  //       platform: 'Twitter',
                  //     }
                  //     navigation.navigate(
                  //       Config.containerNames.TwitterConversation,
                  //       {
                  //         item: conversation,
                  //       },
                  //     )
                  //   }}
                  // >
                  //   <Card>
                  //     <ListItem key={item.logging_page_id}>
                  //       <Avatar source={{ uri: item.graphql.user.profile_pic_url_hd }} />
                  //       <ListItem.Content>
                  //         <ListItem.Title>{item.graphql.user.full_name}</ListItem.Title>
                  //         <ListItem.Subtitle>@{item.graphql.user.username}</ListItem.Subtitle>
                  //       </ListItem.Content>
                  //     </ListItem>
                  //   </Card>
                  // </TouchableWithoutFeedback>
                  <Text>{JSON.stringify(item)}</Text>
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
    </ThemeProvider>
  )
}

export default NewInstagramConversation
