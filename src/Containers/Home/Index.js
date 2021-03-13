import React, { useState } from 'react'
import { View, Button } from 'react-native'
import { Config } from '@/Config'
import { useNavigation } from '@react-navigation/native'

const IndexHomeContainer = () => {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() =>
          navigation.navigate(Config.containerNames.NewConversation)
        }
        style={{ justifyContent: 'center', alignSelf: 'center' }}
        title={'Click Button'}
      />
    </View>
  )
}

export default IndexHomeContainer
