import React from 'react'
import styled from 'styled-components/native'

interface ChatMessage {
  from: string
  text: string
}

interface ChatContentProps {
  messages: ChatMessage[]
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const ChatContent: React.FunctionComponent<ChatContentProps> = (props) => {
  return (
    <Container />
  )
}
