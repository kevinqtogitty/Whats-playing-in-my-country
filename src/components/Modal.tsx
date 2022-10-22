import React, { useContext } from 'react'
import Modal from 'react-modal'

import { MainStore } from '../contexts/context'
import { ModalProps } from '../types/interfaces_types'

import { posterBaseUrl } from '../constants/constants'
import { CloseButton } from '../stylesheets/styled_components/buttons'
import { FilmPosters } from '../stylesheets/styled_components/currentFilmCardStyles'
import {
  CloseButtonWrapper,
  FlexWrapper,
  FlexWrapper3,
  FlexWrapper2,
  TrailerWrapper,
  ReviewWrapper,
  ReviewCard
} from '../stylesheets/styled_components/modalStyles'
import { Information } from '../stylesheets/styled_components/watchListCardsStyles'

const CardModal: React.FC<ModalProps> = ({
  modalIsOpen,
  toggleModal,
  youtubeTrailers,
  availableOn,
  props,
  rentOn,
  reviews,
  director,
  cast
}): JSX.Element => {
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
