import React, { useState } from 'react'
import ExploreColleges from '../Modals/ExploreColleges'

const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true)
  
  return (
    <>
      {openModal && <ExploreColleges closeModal={setOpenModal}/>}
    </>
  )
}

export default ExploreCollegesPage

