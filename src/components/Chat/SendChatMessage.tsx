import React from 'react'
import { Button, Text, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'

interface SendChatMessageProps {

}

const Container = styled.View`
  width: 80px;
  background-color: #4B91FA;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`

const Label = styled.Text`
  color: white;
`

export const SendChatMessage: React.FunctionComponent<SendChatMessageProps> = (props) => {
  return (
    <TouchableNativeFeedback
      onPress={() => null}
    >
      <Container
      >
        <Label>Send</Label>
      </Container>
    </TouchableNativeFeedback>
  )
}
