import React, { useState } from 'react'
import RegistrationModal from '../Modals/RegistrationModal'

const Counsellingpage = () => {
  const [openModal, setOpenModal] = useState(true)
  return (
    <>
      {openModal && <RegistrationModal closeModal={setOpenModal}/>}
    </>
  )
}

export default Counsellingpage
