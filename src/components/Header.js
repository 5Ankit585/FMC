import React, { useEffect, useState } from "react";
import Image1 from "../Images/LPU.webp";
import Image2 from "../Images/chandigarh-university.png";
import Image3 from "../Images/g-Uni.jpg";
import { BiMap, BiPhone, BiSearch } from "react-icons/bi";
import Navbar from "./Navbar";

const Header = () => {
  const [selectedImage, SetSelectedImage] = useState(0);
  const [allImages] = useState([Image1, Image2, Image3])

  useEffect(() => {
    setInterval((e) => {
        SetSelectedImage(selectedImage => selectedImage < 2 ? (selectedImage +1 ) : 0)
    },4000)
}, [])
   
  return (
    <>
      <div className="w-full h-[810px] bg-black/75 text-white  ">
        <div className="w-full absolute ">
          <img className=" w-full h-[810px]  object-cover opacity-90  mix-blend-overlay transition-all" src={allImages[selectedImage]} alt="/" />
        </div>

        <div className="w-full h-[810px]  ">
          {/* contact */}
          <div className="h-24 font-semibold text-sm sm:text-lg flex flex-col md:flex-row items-center justify-around py-1">
            <div className="flex items-center space-x-2">
              <BiMap />
              <p>Serving Central Florida Since 2002</p>
            </div>
            <div className="flex items-center space-x-2">
              <BiPhone />
              <p>Contact Us Today <span className="text-yellow-400  cursor-pointer ">800.555.4242</span></p>
            </div>
          </div>

          <hr />

          {/* navbar */}
          <div className="navbar z-10">
            <Navbar/>
          </div> <hr />

          <div className="p-4 md:px-16 md:pt-10 sm:my-9 md:my-1 space-y-3 sm:w-[30rem] md:w-[32rem] h-[30rem] sm:h-auto">
            <div className="heading  ">
              <p className="text-5xl font-bold py-1 tracking-wide">FIND YOUR DREAM COLLEGE WITH US</p>
            </div>

            <hr />

            <div className="paragraph">
              <p className="text-lg font-bold my-6">Easy to find your dream college with findmycollege.com</p>
            </div>

            <div className="button ">
              <button className="p-4 border-2" type="button">Schedule a Consultation → </button>
            </div>

          </div>

          <div className="px-4 md:px-16 lg:mt-9 ">
          <div className="search flex items-center justify-between border-2 max-w-[940px]">
                <input type="search" placeholder="College,Course,Exam,Article,News,more" className="p-3 w-full outline-none cursor-pointer text-black z-10 " />
                <BiSearch className="ml-1 bg-blue-400 w-16 p-3  cursor-pointer z-10 " size="49.1 "/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
