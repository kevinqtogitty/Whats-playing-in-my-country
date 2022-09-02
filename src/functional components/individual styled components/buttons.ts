import styled from 'styled-components'

export const Button = styled.button`
  margin: 0.8em;
  padding: 1em;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;
  &:hover {
    background-color: forestgreen;
    color: white;
  }
`
export const LogoutButton = styled.button`
  padding: 5px;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;

  &:hover {
    background-color: red;
    color: white;
  }
`
