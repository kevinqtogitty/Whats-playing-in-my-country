import React, { MouseEventHandler, useContext } from 'react'
import { posterBaseUrl } from '../constants/constants'
import styled from 'styled-components'
import Modal from 'react-modal'
import { FilmPosters, Information } from './WatchlistCards'
import { MainStore } from '../contexts/context'
import { LogoutButton } from './individual styled components/buttons'

interface Props {
  modalIsOpen: boolean
  youtubeTrailers: string[]
  toggleModal: MouseEventHandler
  props: any
  availableOn: string[]
  rentOn: string[]
  reviews: any[]
  cast: any[]
  director: []
}

const FlexWrapper = styled.div`
  padding: 10px;
  margin-top: -4rem;
`
const FlexWrapper2 = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 28rem;

  &.info {
    margin-top: 2rem;
    width: 85%;
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

const ModalCloseButton = styled.button`
  display: inline-flex;
  height: max-content;
  margin: 0.8em;
  padding: 1em;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;
  &:hover {
    background-color: forestgreen;
    color: white;
  }
`
const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const TrailerWrapper = styled.div`
  height: 30rem;
  width: 45rem;
  overflow: scroll;
`

const ReviewWrapper = styled.div`
  height: 30rem;
  width: 40rem;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const ReviewCard = styled.section`
  position: relative;

  height: auto;
  overflow: hidden;
  margin: 2rem;
  padding: 2rem;
  font-family: Raleway, sans-serif;
  color: #f8f8f9;
  background: #090506;
  background: linear-gradient(to bottom, #090506, #070709);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.9);
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
          <LogoutButton onClick={toggleModal}>Close</LogoutButton>
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
              {youtubeTrailers.map((trailer) => (
                <iframe
                  width='100%'
                  height='100%'
                  src={trailer}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              ))}
            </TrailerWrapper>
            <ReviewWrapper>
              <h2 style={{ marginTop: 0, marginLeft: '2rem' }}>TMDB User Reviews</h2>
              {reviews.map((review) => (
                <ReviewCard>
                  Author: {review.author}
                  <div>Rating: {review.author_details.rating} / 10</div>
                  <br />
                  <div>{review.content}</div>
                  <br />
                </ReviewCard>
              ))}
            </ReviewWrapper>
          </FlexWrapper3>
        </FlexWrapper>
      </Modal>
    </>
  )
}

export default CardModal
