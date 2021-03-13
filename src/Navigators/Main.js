import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexHomeContainer as HomeScreen } from '@/Containers'
import { Config } from '@/Config'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Config.containerNames.Home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
