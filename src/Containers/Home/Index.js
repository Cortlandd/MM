import React, { useState } from 'react'
import { View, Button } from 'react-native'
import { navigate } from '@/Navigators/Root'

const IndexHomeContainer = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigate('')}
        style={{ justifyContent: 'center', alignSelf: 'center' }}
        title={'Click Button'}
      />
    </View>
  )
}

export default IndexHomeContainer
