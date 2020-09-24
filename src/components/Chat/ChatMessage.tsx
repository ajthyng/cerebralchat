import React from 'react'
import styled from 'styled-components/native'

interface ChatMessageProps {
  sender: string
  text: string
  userIsSender?: boolean
}

const Container = styled.View`
  margin-bottom: 8px;
`

const Sender = styled.Text<{ userIsSender?: boolean }>`
  color: ${({ userIsSender }) => userIsSender ? '#619DF8' : '#4F647B'};
  font-weight: bold;
  font-size: 15px;
`

const Message = styled.Text`
  color: #555555;
  font-size: 13px;
`

export const ChatMessage: React.FunctionComponent<ChatMessageProps> = (props) => {
  const { sender, text, userIsSender } = props

  return (
    <Container>
      <Sender userIsSender={userIsSender}>{sender}:</Sender>
      <Message>{text}</Message>
    </Container>
  )
}
