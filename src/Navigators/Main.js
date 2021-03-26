import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexHomeContainer as HomeScreen } from '@/Containers'
import { IndexNewContainer as NewConversationScreen } from '@/Containers'
import { IndexConversationContainer as ConversationScreen } from '@/Containers'
import { InstagramConversation } from '@/Containers'
import { Config } from '@/Config'
import { Icon } from 'react-native-elements'
import { navigate } from '@/Navigators/Root'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Config.containerNames.Home}
        component={HomeScreen}
        options={{
          title: 'Conversation Creator',
          headerRight: () => (
            <Icon
              onPress={() => navigate(Config.containerNames.NewConversation)}
              name="add"
              style={{
                marginRight: 5,
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={Config.containerNames.NewConversation}
        component={NewConversationScreen}
      />
      <Stack.Screen
        name={Config.containerNames.Conversation}
        component={ConversationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Config.containerNames.InstagramConversation}
        component={InstagramConversation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
