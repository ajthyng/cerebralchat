import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { FullScreen } from '../Common/FullScreen'
import { ChatContent } from './ChatContent'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'

interface ChatProps {

}

const Container = styled(FullScreen)`
  background-color: white;
`

export const Chat: React.FunctionComponent<ChatProps> = (props) => {
  return (
    <Container>
      <ChatHeader />
      <ChatContent
        messages={[]}
      />
      <ChatFooter />
    </Container>
  )
}
