import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text } from 'react-native-svg'
import styled from 'styled-components/native'
import { ErrorMessage } from '../Common/ErrorMessage'
import { FullScreen } from '../Common/FullScreen'
import { ChatMessage } from './ChatMessage'

export interface ChatMessage {
  id: string
  from: string
  text: string
}

interface ChatContentProps {
  messages: ChatMessage[]
  loading: boolean
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 24px 16px 24px 32px;
`

const renderMessage = (message: ChatMessage) => {
  return (
    <ChatMessage
      key={message.id}
      sender={message.from}
      text={message.text}
      userIsSender={message.from === 'You'}
    />
  )
}

export const ChatContent: React.FunctionComponent<ChatContentProps> = (props) => {
  const { messages, loading } = props

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size='large' color='#4B91FA' />
  }

  return (
    <Container>
      {messages.map(renderMessage)}
    </Container>
  )
}
