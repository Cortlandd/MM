import React from 'react'
import { createStackNavigator, HeaderBackButton, StackNavigationProp } from '@react-navigation/stack'
import { IndexHomeContainer as HomeScreen, TwitterConversation, InstagramConversation, MessengerConversation, NewTwitterConversation, NewGenericConversation, NewInstagramConversation } from '@/Containers'
import { IndexNewConversation as NewConversationScreen } from '@/Containers'
import { Config } from '@/Config'
import { Icon } from 'react-native-elements'
import { navigate, navigationRef } from '@/Navigators/Root'
import IMessageConversation from '@/Containers/Conversation/iMessage'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import { useTheme } from '@/Theme'
import { ConversationContextProvider } from '@/Config/Database/DatabaseContext'
import { Conversation, Recipient } from '@/Config/Types'

export type RootStackParamList = {
    Main: undefined
    Home: undefined
    NewConversation: undefined
    InstagramConversation: { conversation: Conversation, recipient: Recipient }
    TwitterConversation: { conversation: Conversation, recipient: Recipient }
    MessengerConversation: { conversation: Conversation, recipient: Recipient }
    iMessageConversation: { conversation: Conversation, recipient: Recipient }
    NewTwitterConversation: undefined
    NewGenericConversation: { platform: string }
    NewInstagramConversation: undefined
}

const MainStack = createStackNavigator<RootStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

function MainStackScreen() {
  const navigation = useNavigation<homeScreenProp>()
  const { darkMode } = useTheme()

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={Config.containerNames.Home}
        component={HomeScreen}
        options={{
          title: 'Conversations',
          headerStyle: {
            backgroundColor: darkMode ? 'black' : 'white',
            elevation: 0,
          },
          headerRight: () => (
            <Icon
              color={darkMode ? 'white' : 'black'}
              onPress={() =>
                navigation.navigate('NewConversation')
              }
              size={35}
              name="add"
              style={{
                marginRight: 5,
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name={Config.containerNames.NewConversation}
        component={NewConversationScreen}
        options={{
          title: 'Select Platform',
          headerStyle: {
            backgroundColor: darkMode ? 'black' : 'white',
            elevation: 0,
          },
        }}
      />
      <MainStack.Screen
        name={Config.containerNames.InstagramConversation}
        component={InstagramConversation}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={Config.containerNames.TwitterConversation}
        component={TwitterConversation}
        options={{
          headerShown: false,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <MainStack.Screen
        name={Config.containerNames.MessengerConversation}
        component={MessengerConversation}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={Config.containerNames.iMessageConversation}
        component={IMessageConversation}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  )
}

// @refresh reset
const MainNavigator = ({ navigation }) => {
  const { NavigationTheme } = useTheme()

  return (
    <ConversationContextProvider>
      <NavigationContainer independent={true} theme={NavigationTheme} ref={navigationRef}>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={MainStackScreen} />
          <RootStack.Screen
            name={Config.containerNames.NewTwitterConversation}
            component={NewTwitterConversation}
            options={{ headerShown: true }}
          />
          <RootStack.Screen
            name={Config.containerNames.NewGenericConversation}
            component={NewGenericConversation}
            options={{ headerShown: true }}
          />
          <RootStack.Screen
            name={Config.containerNames.NewInstagramConversation}
            component={NewInstagramConversation}
            options={{ headerShown: true }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ConversationContextProvider>
  )
}

export default MainNavigator
