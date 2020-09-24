import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { useEvent } from '../../hooks/useEvent'
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

  const loadChatAI = useCallback(() => {
    getChatAI().then(result => {
      liveSupport.current = new LiveSupport(result, user, supportId)
      _setResponseState('success')
      _setMessages(liveSupport.current.messageHistory)
    }).catch(() => {
      _setResponseState('failure')
    })
  }, [props.user])

  useEffect(() => {
    loadChatAI()
  }, [loadChatAI])

  const onMessagesUpdate = useCallback(() => {
    _setMessages([...liveSupport.current?.messageHistory ?? []])
  }, [])

  useEvent('messages-update', onMessagesUpdate)
  useEvent('refresh-chat', loadChatAI)

  const handleSend = useCallback((input: string) => {
    if (liveSupport.current) {
      liveSupport.current.receiveMessage({
        text: input,
        from: user
      })
    }
  }, [])

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
        onSend={handleSend}
      />
    </Container>
  )
}
