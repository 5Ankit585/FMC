import React, { useState } from "react";
import ExploreColleges from "../Modals/ExploreColleges";
import UniversitySearch from "../components/SearchBar"; // popup modal
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import collegeData from "./CollegeData";

const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [showUniSearch, setShowUniSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Explore Colleges Modal */}
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>
            <ExploreColleges closeModal={setOpenModal} />
          </div>
        </div>
      )}

{/* University Search Popup (opens when filter clicked) */}
<UniversitySearch open={showUniSearch} setOpen={setShowUniSearch} />


      {/* Header with ONLY filter button */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">
            Explore Colleges
          </h1>

          {/* Filter button → opens UniversitySearch popup */}
          <button
            className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-200 transition"
            onClick={() => setShowUniSearch(true)}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>

      {/* Colleges List */}
      <div className="max-w-screen-lg mx-auto mt-10 p-4 grid gap-6">
        {collegeData[0].colleges.map((college, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex items-center gap-4"
          >
            <img
              src={college.image}
              alt={college.name}
              className="w-32 h-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{college.name}</h2>
              <p className="text-gray-500 text-sm">{college.location}</p>
              <button
                className="mt-2 px-4 py-2 text-sm rounded-full bg-yellow-400 hover:bg-yellow-500 transition"
                onClick={() => navigate("/universityDetails")}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollegesPage;
