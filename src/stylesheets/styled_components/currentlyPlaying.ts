import styled from 'styled-components'

export const BannerHeader = styled.div`
  top: 65px;
  color: antiquewhite;
  padding-left: 1.2rem 0px 1.2rem 0px;
  align-self: flex-start;
  position: absolute;
  width: 97%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const Button = styled.button`
  margin: 2em;
  padding: 1em;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;
  &:hover {
    background-color: forestgreen;
    border: 1px solid forestgreen;

    color: white;
  }
`
