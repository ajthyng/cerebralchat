import React from 'react'
import { ViewStyle, View, StyleSheet, Text } from 'react-native'

interface FullScreenProps {
  style?: ViewStyle
}

export const FullScreen: React.FunctionComponent<FullScreenProps> = (props) => {
  const { style, children } = props
  return (
    <View
      style={{ flex: 1 }}
    >
      {children}
    </View>
  )
}
