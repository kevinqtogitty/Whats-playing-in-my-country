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
  margin: 0.8em;
  padding: 1em;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;

  &:hover {
    background-color: crimson;
    color: white;
  }
`

export const CloseButton = styled.button`
  margin-bottom: 1rem;
  padding: 10px;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;

  &:hover {
    border: 1px solid crimson;
    background-color: crimson;
    color: white;
  }
`
