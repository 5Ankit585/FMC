import React, { useEffect, useState } from 'react'
import Cloud from '../components/Cloud';
import CollegeCard from '../components/CollegeCard';
import Footer from '../components/Footer';
import Form from '../components/Form';
import Header from '../components/Header';
import HigherStudies from '../components/HigherStudies';
import Info from '../components/Info';
import Marquee from '../components/Marquee';
import Newsletter from '../components/Newsletter';
import PlaceCard from '../components/PlaceCard';
import Reviews from '../components/Reviews';
import RegistrationModal from '../Modals/RegistrationModal';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    {showPopup && (<RegistrationModal closeModal={setShowPopup}/>)}
    <Header/>
    <CollegeCard/>
    <PlaceCard/>
    <HigherStudies/>
    <Marquee/>
    <Info/>
    <Newsletter/>
    <Reviews/>
    <Cloud/>
    <Form/>
    <Footer/>
    </>
  )
}

export default Home
