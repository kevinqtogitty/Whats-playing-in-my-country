import styled from 'styled-components'
import { CountryDropdown } from './countryDropdown'

export const CountryOption = styled.option`
  display: none;
  width: 200%;
  border: solid, red;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  color: #3d3d3d;
  background: inherit;
  /* border: none; */
  /* box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1); */
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  cursor: pointer;

  ${CountryDropdown}:hover & {
    display: flex;
  }
`

export const Button = styled.button`
  margin: 0.8em;
  padding: 1em;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;

  &:hover {
    background-color: #88d6f2;
    color: white;
  }
`
