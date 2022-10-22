import styled from 'styled-components'

export const BannerHeader = styled.div`
  color: antiquewhite;
  padding-left: 1.2rem;
  position: absolute;
  width: fit-content;
`
export const FilmsBanner = styled.div`
  background-color: #000;
  width: auto;
  overflow: scroll;
  padding: 1rem;
  margin-top: -1.7rem;
  margin: 0px;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const FilmCardWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-top: 6rem;
  @media (max-width: 500px) {
    margin-top: 8rem;
  }
`
