import React from 'react'
import styled from 'styled-components/native'

interface ErrorMessageProps {
  message?: string
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 32px;
`

const Message = styled.Text`
  color: #555555;
  text-align: center;
`

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props) => {
  const defaultMessage = 'We\'re having trouble loading this content. Please swipe down to try again.'
  const { message = defaultMessage } = props
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}
