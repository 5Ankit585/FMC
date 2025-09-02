import React, { useState } from "react";
import ExploreColleges from "../Modals/ExploreColleges";
import UniversitySearch from "../components/SearchBar"; // popup modal
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import collegeData from "./CollegeData";
import "./ExploreCollegesPage.css"; // Import CSS file

const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [showUniSearch, setShowUniSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="explore-section">
      {/* Navbar */}
      <Navbar />

      {/* Explore Colleges Modal */}
      {openModal && (
        <div className="explore-modal-overlay">
          <div className="explore-modal">
            <button
              className="explore-modal-close"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>
            <ExploreColleges closeModal={setOpenModal} />
          </div>
        </div>
      )}

      {/* University Search Popup */}
      <UniversitySearch open={showUniSearch} setOpen={setShowUniSearch} />

      {/* Header */}
      <div className="explore-header">
        <div className="explore-header-container">
          <h1 className="explore-title">Explore Colleges</h1>
          <button
            className="filter-btn"
            onClick={() => setShowUniSearch(true)}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>

      {/* Colleges List */}
      <div className="college-list">
        {collegeData[0].colleges.map((college, index) => (
          <div key={index} className="college-card">
            <img
              src={college.image}
              alt={college.name}
              className="college-img"
            />
            <div className="college-info">
              <h2 className="college-name">{college.name}</h2>
              <p className="college-location">{college.location}</p>
              <button
                className="view-btn"
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
