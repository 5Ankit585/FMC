import React, { useState } from 'react'
import RegistrationModal from '../Modals/RegistrationModal'
import MaintenancePage from './maintainnance/MaintenancePage'

const Counsellingpage = () => {
  const [openModal, setOpenModal] = useState(true)
  return (
    <>
      {openModal && <RegistrationModal closeModal={setOpenModal}/>}
      <MaintenancePage />
    </>
  )
}

export default Counsellingpage
