import React, { useState } from "react";
import ExploreColleges from "../Modals/ExploreColleges";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar";
import collegeData from "./CollegeData";
const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {openModal && <ExploreColleges closeModal={setOpenModal} />}
      <div className="bg-gray-200 p-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Explore Colleges</h1>
            <div className="relative">
              {/* <input
                type="text"
                className="w-48 sm:w-64 p-2 pl-8 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search Colleges"
              >
              </input> */}
                <SearchBar />
              {/* <div className="absolute top-3 left-3 text-gray-400">
              <FontAwesomeIcon icon={faSearch} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-4">
        {collegeData[0].colleges.map((college, index) => (
          <div key={index} className="bg-slate-200 rounded-lg shadow-md p-4 flex h-[200px] bg-gradient-to-r from-transparent">
          <div className="w-1/3">
            <img src={college.image} alt="" className="w-[70%] h-[100%]" />
          </div>
          <div className="w-2/3 p-4 bg-blend-overlay">
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p className="text-gray-500">{college.location}</p>
            <p className="text-gray-600">
              Affiliation: {college.affiliation}
            </p>
            {/* Adjust the opacity to make details 30% visible */}
            <div className="opacity-20 absolute  h-full w-1/3 overflow-hidden">
              <p className="text-gray-600">
                Courses: {college.courses.join(", ")}
              </p>
              <p className="text-gray-600">
                Established: {college.established}
              </p>
            </div>
            {/* Make the button clearly visible */}
            <button
              className="btn hover:bg-black hover:text-white bg-yellow-300 absolute right-10"
              onClick={() => navigate("/universityDetails")}
            >
              View More
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </>
  );
};

export default ExploreCollegesPage;
