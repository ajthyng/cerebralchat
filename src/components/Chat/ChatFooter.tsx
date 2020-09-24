import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { SendChatMessage } from './SendChatMessage'

interface ChatFooterProps {
  loading: boolean
  onSend: (input: string) => void
}

const Container = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: #ECF4F6;
  min-height: 80px;
  max-height: 120px;
`

const ChatInput = styled.TextInput`
  flex: 1;
  background-color: white;
  border-color: #D8E5F7;
  border-width: 1px;
  margin-right: 8px;
`

export const ChatFooter: React.FunctionComponent<ChatFooterProps> = (props) => {
  const { loading, onSend } = props
  const [text, _setText] = useState('')

  const setText = useCallback((input: string) => {
    _setText(input)
  }, [])

  const handleSend = useCallback(() => {
    if (text.length === 0) return
    onSend(text)
    _setText('')
  }, [text, onSend])

  return (
    <Container>
      <ChatInput
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={2}
        textAlignVertical='top'
        underlineColorAndroid='transparent'
        placeholder='Type here...'
        selectionColor='#9BAFFC'
        editable={!loading}
      />
      <SendChatMessage
        disabled={loading}
        onSend={handleSend}
      />
    </Container>
  )
}
