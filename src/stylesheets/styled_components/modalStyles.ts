import styled from 'styled-components'

export const FlexWrapper = styled.div`
  padding: 10px;
  margin-top: -4rem;
`
export const FlexWrapper2 = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 28rem;
  @media (max-width: 500px) {
    margin-left: 0px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }

  &.info {
    margin-left: 2rem;
    padding: 1rem;
    width: 85%;
    @media (max-width: 500px) {
      margin-left: 0px;
      padding: 0;
      width: 100%;
    }
  }
`

export const FlexWrapper3 = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }

  &.review_trailer {
    column-gap: 2rem;
  }
`

export const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`

export const TrailerWrapper = styled.div`
  height: 40rem;
  width: 100%;
  overflow: scroll;
  margin-left: 1rem;
  margin-right: 1rem;
  @media (max-width: 500px) {
    height: 10rem;
    margin-left: 0px;
    margin-right: 0px;
  }
`

export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 30rem;
  width: 100%;
  flex-wrap: nowrap;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const ReviewCard = styled.section`
  min-width: 25rem;
  overflow: scroll;
  margin: 2rem;
  padding: 1rem;
  font-size: 1em;
  font-family: Raleway, sans-serif;
  color: #f8f8f9;
  background: #090506;
  background: linear-gradient(to bottom, #090506, #070709);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.9);
  @media (max-width: 500px) {
    min-width: 15rem;
    font-size: 0.8em;
  }
`
