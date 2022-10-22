import styled from 'styled-components'

export const FilmPosters = styled.img`
  border-radius: 5px;
  height: 20rem;
  width: auto;
  border: 2px solid grey;
  &:hover {
    opacity: 50%;
  }
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
`

export const CardText = styled.p`
  color: white;
  margin: 0;
`

export const Icon = styled.img`
  filter: invert(100%);
  width: 1rem;
`
export const IconTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`
