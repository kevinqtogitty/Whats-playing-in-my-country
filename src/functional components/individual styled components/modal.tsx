import React, { SetStateAction, useState } from 'react'
import Modal from 'react-modal'
import { Films } from '../../types/interfaces_types'
import { Button } from './buttons'

interface ModalProps {
  original_title: string
  overview: string
  release_date: string
  vote_average: number
  poster_path: string
  modalIsOpen: boolean
  setModalIsOpen: React.SetStateAction<boolean>
}

// const WatchListModal: React.FC<ModalProps> = ({
//   original_title,
//   overview,
//   release_date,
//   vote_average,
//   poster_path,
//   modalIsOpen,
//   setModalIsOpen,
// }) => {
//   //   const handleModalClose = () => {
//   //     setModalIsOpen(!modalIsOpen)
//   //   }

//   console.log(typeof setModalIsOpen)

//   return (
//     <Modal isOpen={modalIsOpen}>
//       <h2>{original_title}</h2>
//       <img src={poster_path} alt='' />
//       <p>{release_date}</p>
//       <p>{vote_average}</p>
//       <p>{overview}</p>
//       <Button onClick={setModalIsOpen(!modalIsOpen)}></Button>
//       {/* <button onClick={setModalIsOpen(!modalIsOpen)}>Close</button> */}
//     </Modal>
//   )
// }

// export default WatchListModal
