import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexHomeContainer as HomeScreen, TwitterConversation, InstagramConversation, MessengerConversation, NewTwitterConversation, NewGenericConversation } from '@/Containers'
import { IndexNewConversation as NewConversationScreen } from '@/Containers'
import { Config } from '@/Config'
import { Icon } from 'react-native-elements'
import { navigate, navigationRef } from '@/Navigators/Root'
import IMessageConversation from '@/Containers/Conversation/iMessage'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Theme'

const Stack = createStackNavigator()
const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

function MainStackScreen({ navigation }) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={Config.containerNames.Home}
        component={HomeScreen}
        options={{
          title: 'Msg Maker',
          headerRight: () => (
            <Icon
              color={'gray'}
              onPress={() =>
                navigation.navigate(Config.containerNames.NewConversation)
              }
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
      />
      <MainStack.Screen
        name={Config.containerNames.InstagramConversation}
        component={InstagramConversation}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={Config.containerNames.TwitterConversation}
        component={TwitterConversation}
        options={{ headerShown: false }}
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
  const { Layout, darkMode, NavigationTheme } = useTheme()

  return (
    <NavigationContainer independent={true} theme={NavigationTheme} ref={navigationRef}>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen
          name={Config.containerNames.TwitterNewConversation}
          component={NewTwitterConversation}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name={Config.containerNames.NewGenericConversation}
          component={NewGenericConversation}
          options={{ headerShown: true }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
