import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { Chat } from './src/components/Chat/Chat'

const App = () => {
  console.log(StatusBar.currentHeight)
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#ECF4F6'}}
    >
      <Chat
        user='Andrew'
        supportId='Marlanne Singer'
      />
    </SafeAreaView>
  )
}

export default App
