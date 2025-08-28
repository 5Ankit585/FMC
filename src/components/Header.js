import React, { useEffect, useState } from "react";
import Image1 from "../Images/LPU.webp";
import Image2 from "../Images/chandigarh-university.png";
import Image3 from "../Images/g-Uni.jpg";
import { BiMap, BiPhone, BiSearch } from "react-icons/bi";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [selectedImage, SetSelectedImage] = useState(0);
  const [allImages] = useState([Image1, Image2, Image3]);
  const navigate = useNavigate();
  useEffect(() => {
    setInterval((e) => {
      SetSelectedImage((selectedImage) =>
        selectedImage < 2 ? selectedImage + 1 : 0
      );
    }, 10000);
  }, []);

  return (
    <>
      <div className="w-full h-[810px] bg-black/75 text-white  ">
        <div className="w-full ">
          <img
            className=" w-full h-[810px]  object-cover opacity-90  mix-blend-overlay transition-all "
            src={allImages[selectedImage]}
            alt="/"
          />
        </div>

        <div className="w-full h-[810px]  absolute top-0">
          {/* navbar */}
          <div className="navbar z-10">
            <Navbar />
          </div>{" "}
          <hr />
          <div className="p-4 md:px-16 md:pt-10 sm:my-9 md:my-1 space-y-3 sm:w-[30rem] md:w-[32rem] h-[30rem] sm:h-auto z-10">
            <div className="heading  ">
              <p className="text-5xl font-bold py-1 tracking-wide">
                FIND YOUR DREAM COLLEGE WITH US
              </p>
            </div>

            <hr />

            <div className="paragraph">
              <p className="text-lg font-bold my-6">
                Easy to find your dream college with findmycollege.com
              </p>
            </div>

            <div className="button hover:cursor-pointer">
              <button
                className="p-4 border-2 hover:bg-yellow-300 hover:text-black"
                type="button"
                onClick={() => navigate("/contact")}
              >
                Schedule a Consultation →{" "}
              </button>
            </div>
          </div>
          <div className="px-4 md:px-16 lg:mt-9 ">
            <div className="search flex items-center justify-between max-w-[940px]">
              <input
                type="search"
                placeholder="College,Course,Exam,Article,News,more"
                className="p-3 w-full outline-none cursor-pointer text-black z-10 "
              />
              <BiSearch
                className="ml-1 bg-blue-400 w-16 p-3  cursor-pointer z-10 "
                size="49.1 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
