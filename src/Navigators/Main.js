import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexHomeContainer as HomeScreen } from '@/Containers'
import { IndexNewContainer as NewConversationScreen } from '@/Containers'
import { Config } from '@/Config'
import { Icon } from 'react-native-elements'
import { navigate } from '@/Navigators/Root'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
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
            />
          ),
        }}
      />
      <Stack.Screen
        name={Config.containerNames.NewConversation}
        component={NewConversationScreen}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
