import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { getChatAI, LiveSupport } from '../../utils/ChatAI'
import { ErrorMessage } from '../Common/ErrorMessage'
import { FullScreen } from '../Common/FullScreen'
import { ChatContent, ChatMessage } from './ChatContent'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'

interface ChatProps {
  user: string
  supportId: string
}

const Container = styled(FullScreen)`
  background-color: white;
`

type ResponseState = 'loading' | 'failure' | 'success'

export const Chat: React.FunctionComponent<ChatProps> = (props) => {
  const { user, supportId } = props

  const [messages, _setMessages] = useState<ChatMessage[]>([])
  const [responseState, _setResponseState] = useState<ResponseState>('loading')
  const liveSupport = useRef<LiveSupport | null>(null)

  const isLoading = useMemo(() => {
    return responseState === 'loading'
  }, [responseState])

  const hasError = useMemo(() => {
    return responseState === 'failure'
  }, [responseState])

  useEffect(() => {
    getChatAI().then(result => {
      liveSupport.current = new LiveSupport(result, user, supportId)
      _setResponseState('success')
      _setMessages(liveSupport.current.messageHistory)
    }).catch(() => {
      _setResponseState('failure')
    })
  }, [props.user])

  return (
    <Container>
      <ChatHeader
        supportId={supportId}
      />
      {
        hasError
          ? <ErrorMessage />
          : (
            <ChatContent
              loading={isLoading}
              messages={messages}
            />
          )
      }
      <ChatFooter
        loading={isLoading}
      />
    </Container>
  )
}
