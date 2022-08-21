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
