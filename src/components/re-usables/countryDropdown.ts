import styled from 'styled-components'

export const CountryDropdown = styled.select`
  position: relative;
  display: inline-block;
`
export const CountryContent = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: #f9f9f9;
  width: 3rem;
  overflow: auto;
  padding: 12px 16px;
  z-index: 1;

  ${CountryDropdown}:hover & {
    display: flex;
  }
`
