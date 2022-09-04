import React, { MouseEventHandler, useContext } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

import { MainStore } from '../contexts/context'
import { Films } from '../types/interfaces_types'

import { posterBaseUrl } from '../constants/constants'
import { FilmPosters, Information } from './cards/WatchlistCards'
import { CloseButton } from './re-usables/buttons'

interface Props {
  modalIsOpen: boolean
  youtubeTrailers: string[]
  toggleModal: MouseEventHandler
  props: Films
  availableOn: string[]
  rentOn: string[]
  reviews: any[]
  cast: any[]
  director: []
  key?: number
}

const FlexWrapper = styled.div`
  padding: 10px;
  margin-top: -4rem;
`
const FlexWrapper2 = styled.div`
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
    /* margin-top: 2rem; */
    margin-left: 2rem;
    /* border: 2px solid red; */
    padding: 1rem;
    width: 85%;
    @media (max-width: 500px) {
      margin-left: 0px;
      padding: 0;
      width: 100%;
    }
  }
`

const FlexWrapper3 = styled.div`
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

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`

const TrailerWrapper = styled.div`
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

const ReviewWrapper = styled.div`
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
const ReviewCard = styled.section`
  min-width: 25rem;
  /* height: 20rem; */
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
const CardModal: React.FC<Props> = ({
  modalIsOpen,
  toggleModal,
  youtubeTrailers,
  availableOn,
  props,
  rentOn,
  reviews,
  director,
  cast
}) => {
  const { currentCountry } = useContext(MainStore)
  return (
    <>
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
            // backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            // border: '2px solid #71c9d3',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            padding: '20px',
            color: '#000000',
            boxShadow:
              'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
          }
        }}
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        ariaHideApp={false}
      >
        <CloseButtonWrapper>
          <CloseButton onClick={toggleModal}>Close</CloseButton>
        </CloseButtonWrapper>
        <FlexWrapper>
          <FlexWrapper3>
            <FlexWrapper2>
              <h2>{props.original_title}</h2>
              <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
              <Information>Release Date: {props.release_date}</Information>
              {props.vote_average === 0 ? (
                <Information>No reviews yet </Information>
              ) : (
                <Information>Rating: {props.vote_average} / 10 </Information>
              )}
              <br />
              <Information>
                Director: <br />
                {director.map((director: { name: any }) => (
                  <>{director.name} | </>
                ))}{' '}
              </Information>
              <br />
              <Information>
                Cast: <br />
                {cast.slice(0, 10).map((member) => (
                  <>{member.name} | </>
                ))}{' '}
                ...and others
              </Information>
            </FlexWrapper2>
            <FlexWrapper2 className='info'>
              <h3>Where to watch online: {currentCountry}</h3>
              <Information>
                Stream: <br />
                {availableOn.map((provider) => (
                  <>{provider} | </>
                ))}
              </Information>
              <br />
              <Information>
                Rent: <br />
                {rentOn.map((provider) => (
                  <>{provider} | </>
                ))}
              </Information>
              <br />
              Overview:
              <br />
              {props.overview}
            </FlexWrapper2>
          </FlexWrapper3>
          <FlexWrapper3 className='review_trailer'>
            <TrailerWrapper>
              {youtubeTrailers.map((trailer, index) => (
                <iframe
                  key={index}
                  src={trailer}
                  allowFullScreen={true}
                  width='100%'
                  height='100%'
                />
              ))}
            </TrailerWrapper>
          </FlexWrapper3>{' '}
        </FlexWrapper>{' '}
        <div>
          <h2 style={{ marginTop: '1rem', textAlign: 'center' }}>TMDB User Reviews</h2>
          <ReviewWrapper>
            {reviews.map((review, index) => (
              <ReviewCard key={index}>
                Author: {review.author}
                <div>Rating: {review.author_details.rating} / 10</div>
                <br />
                <div>{review.content}</div>
                <br />
              </ReviewCard>
            ))}
          </ReviewWrapper>
        </div>
      </Modal>
    </>
  )
}

export default CardModal
