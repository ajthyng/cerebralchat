import React from 'react'
import styled from 'styled-components/native'

interface ChatHeaderProps {

}

const Profile = styled.View`
  /* aspect-ratio: 1; */
  height: 32px;
  width: 32px;
  background-color: #CBD3DC;
  border-radius: 16px;
`

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 12px;
  background-color: #ECF4F6;
`

const Name = styled.Text`
  font-size: 16px;
  padding: 0 0 2px 12px;
  color: #4F647B;
`

export const ChatHeader: React.FunctionComponent<ChatHeaderProps> = (props) => {
  return (
    <Container>
      <Profile />
      <Name>Marlanne Singer</Name>
    </Container>
  )
}
