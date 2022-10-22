import styled from 'styled-components'

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  width: 100%;
  background: linear-gradient(to bottom, #090506, #070709);
`

export const UlNavList = styled.ul`
  display: flex;
  width: 100%;
  column-gap: 1rem;
  text-decoration: none;
  align-items: center;
  margin-left: -1.5rem;
`

export const LiNavList = styled.li`
  text-decoration: none;
  list-style: none;
  list-style-type: none;
  color: #f8f8f9;
  font-size: 1rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-self: center;
  margin-right: 1rem;
`
