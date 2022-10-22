import styled from 'styled-components'

export const ListItem = styled.li`
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  display: flex;
  cursor: pointer;
`
export const Cell = styled.span`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  height: 3rem;

  &.title {
    width: 18rem;
    padding-left: 5px;
    text-align: center;
  }

  &.releaseDate {
    width: 21.5rem;
    @media (max-width: 500px) {
      display: none;
    }
  }

  &.rating {
    width: 10.3rem;
    justify-content: flex-end;
  }

  &.remove {
    width: 8rem;
    justify-content: flex-end;
    padding-right: 5px;
  }
`

export const TrashIcon = styled.img`
  width: 2rem;
  margin-top: -12rem;
  cursor: pointer;
  height: fit-content;
  margin-top: 1px;
`
