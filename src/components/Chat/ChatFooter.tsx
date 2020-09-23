import React, { useCallback, useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from 'react-native'
import styled from 'styled-components/native'
import { SendChatMessage } from './SendChatMessage'

interface ChatFooterProps {

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
  const [text, _setText] = useState('')

  const setText = useCallback((input: string) => {
    _setText(input)
  }, [])

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
      />
      <SendChatMessage />
    </Container>
  )
}
