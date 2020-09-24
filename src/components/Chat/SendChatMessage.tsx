import React from 'react'
import { GestureResponderEvent, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import { getChatAI } from '../../utils/ChatAI'
import { SendChatIcon } from './SendChatIcon'

interface SendChatMessageProps {
  disabled: boolean
  onSend: (event: GestureResponderEvent) => void
}

const Container = styled.View`
  width: 80px;
  background-color: #4B91FA;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  elevation: 5;
  box-shadow: 0 0 45px #4B91FA;
`

export const SendChatMessage: React.FunctionComponent<SendChatMessageProps> = (props) => {
  const { disabled, onSend } = props
  return (
    <TouchableNativeFeedback
      onPress={onSend}
      disabled={disabled}
    >
      <Container>
        <SendChatIcon
          width={24}
          height={24}
          fill='#FFFFFF'
        />
      </Container>
    </TouchableNativeFeedback>
  )
}
