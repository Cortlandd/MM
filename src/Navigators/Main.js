import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IndexConversationsContainer, IndexHomeContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={IndexHomeContainer} />
      <Tab.Screen name="Conversations" component={IndexConversationsContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
