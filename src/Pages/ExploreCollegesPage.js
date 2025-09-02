import React, { useState } from "react";
import ExploreColleges from "../Modals/ExploreColleges";
import UniversitySearch from "../components/SearchBar"; // popup modal
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import collegeData from "./CollegeData";
import "./ExploreCollegesPage.css"; // Import CSS file
import { FaFilter } from "react-icons/fa";

const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [showUniSearch, setShowUniSearch] = useState(false);
  const navigate = useNavigate();

  // Tabs with their placeholder texts
  const [activeTab, setActiveTab] = useState("Admissions");
  const [searchText, setSearchText] = useState("");

  const tabs = {
    Admissions: "Search admission details, eligibility, dates...",
    Courses: "Search B.Tech, MBA, Nursing, etc...",
    Research: "Search research papers, labs, projects...",
    Departments: "Search Engineering, Science, Arts, etc...",
    "Campus Life": "Search hostels, events, facilities...",
    "Apply Now": "Apply directly to the university",
  };

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
        </div>
      </div>

      {/* Tabs + Search Bar */}
      <div className="explore-tabs-container">
        {/* Tabs */}
        <div className="explore-tabs">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`explore-tab-btn ${
                activeTab === tab ? "active" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="explore-search-bar">
          <select className="search-category">
            <option>All</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>PhD</option>
          </select>

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder={tabs[activeTab]}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Filter Button */}
            <button
              className="filter-btn"
              onClick={() => setShowUniSearch(true)}
            >
              <FaFilter />
            </button>
          </div>

          <button className="search-btn">Search</button>
        </div>
      </div>

      {/* Colleges List */}
      <div className="college-list">
        {collegeData[0].colleges.map((college, index) => (
          <div key={index} className="college-card">
            {/* Left side */}
            <div className="college-left">
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

            {/* Vertical line */}
            <div className="college-separator"></div>

            {/* Right side info */}
            <div className="college-right">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Vivamus eget magna vel elit dictum feugiat.
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollegesPage;