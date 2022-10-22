import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0%;
  justify-content: space-around;
  @media (max-width: 500px) {
    width: auto;
  }
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0%;
  justify-content: space-between;
  @media (max-width: 700px) {
    justify-content: center;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-around;
  }
`
export const TableContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`
export const UnorderedList = styled.ul`
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-direction: column;
`
export const ColumnHeader = styled.li`
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  list-style-type: none;
  display: flex;
  justify-content: space-around;
`
export const Header = styled.div`
  &.releaseDate {
    @media (max-width: 500px) {
      display: none;
    }
  }
`
