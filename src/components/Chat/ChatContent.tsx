import React from 'react'
import { ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { Text } from 'react-native-svg'
import styled from 'styled-components/native'
import { useEvent } from '../../hooks/useEvent'
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

const renderMessage = ({ item }: {item: ChatMessage}) => {
  const message = item
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

  const reloadChatAI = useEvent('refresh-chat')

  return (
    <Container>
      <FlatList
        data={loading ? [] : messages}
        refreshing={loading}
        inverted
        onRefresh={reloadChatAI}
        renderItem={renderMessage}
      />
    </Container>
  )
}
