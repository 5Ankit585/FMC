import React, { useState, useMemo } from "react";
import ExploreColleges from "../Modals/ExploreColleges";
import UniversitySearch from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import collegeData from "./CollegeData";
import "./ExploreCollegesPage.css";
import { FaFilter } from "react-icons/fa";

const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [showUniSearch, setShowUniSearch] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [feesFilter, setFeesFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [scholarshipFilter, setScholarshipFilter] = useState("All");

  // Colleges list (defensive access in case structure differs)
  const colleges = collegeData?.[0]?.colleges ?? [];

  // Dynamic list of locations from data
  const locations = useMemo(() => {
    const setLoc = new Set();
    colleges.forEach((c) => {
      if (c.location) setLoc.add(c.location);
    });
    return ["All", ...Array.from(setLoc)];
  }, [colleges]);

  // Dynamic list of course types from data (keeps it in case your data has many values)
  const courseTypes = useMemo(() => {
    const setC = new Set();
    colleges.forEach((c) => {
      const val = c.courseType || c.stream || c.department || c.type;
      if (val) setC.add(val);
    });
    return ["All", ...Array.from(setC)];
  }, [colleges]);

  // EXTRA: curated/popular/detailed course-type options to show at top
  const additionalCourseTypes = [
    "Undergraduate",
    "Postgraduate",
    "Diploma",
    "Certificate",
    "PhD / Doctorate",
    "Online / Distance Learning",
    "Professional",
    "Executive",
    "B.Tech",
    "B.E",
    "B.Sc",
    "B.Com",
    "B.A",
    "BCA",
    "BBA",
    "MBBS",
    "B.Arch",
    "M.Tech",
    "MBA",
    "M.Sc",
    "M.A",
    "M.Com",
    "MCA",
    "Short Term (6 months)",
    "Continuing Education",
  ];

  const additionalSet = useMemo(
    () => new Set(additionalCourseTypes.map((s) => s.toLowerCase())),
    []
  );

  // utility: try multiple keys
  const getProp = (college, candidates) => {
    for (const k of candidates) {
      if (college[k] !== undefined && college[k] !== null) return college[k];
    }
    return undefined;
  };

  // parse fees robustly (numbers inside strings)
  const parseFeeNumber = (val) => {
    if (val == null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const digits = val.replace(/[^\d]/g, "");
      if (!digits) return null;
      return parseFloat(digits);
    }
    return null;
  };

  const matchesFees = (college) => {
    if (feesFilter === "All") return true;
    const fee = parseFeeNumber(
      getProp(college, ["fees", "tuition", "annualFee", "fee"])
    );
    if (fee == null) return true;
    switch (feesFilter) {
      case "Below ₹50,000":
        return fee < 50000;
      case "₹50,000 - ₹1,00,000":
        return fee >= 50000 && fee <= 100000;
      case "₹1,00,000 - ₹5,00,000":
        return fee > 100000 && fee <= 500000;
      case "Above ₹5,00,000":
        return fee > 500000;
      default:
        return true;
    }
  };

  const matchesRating = (college) => {
    if (ratingFilter === "All") return true;
    const rating = parseFloat(getProp(college, ["rating", "avgRating"]));
    if (isNaN(rating)) return true;
    switch (ratingFilter) {
      case "4.5+":
        return rating >= 4.5;
      case "4.0+":
        return rating >= 4.0;
      case "3.5+":
        return rating >= 3.5;
      case "3.0+":
        return rating >= 3.0;
      default:
        return true;
    }
  };

  const matchesScholarship = (college) => {
    if (scholarshipFilter === "All") return true;
    const sch = getProp(college, [
      "scholarship",
      "hasScholarship",
      "scholarshipsAvailable",
      "scholarshipAvailable",
    ]);
    if (sch === undefined || sch === null) return true;
    const bool =
      typeof sch === "string" ? /yes|true/i.test(sch) : Boolean(sch);
    return scholarshipFilter === "Yes" ? bool : !bool;
  };

  const matchesCourseType = (college) => {
    if (courseFilter === "All") return true;
    const ct = getProp(college, ["courseType", "stream", "department", "type"]);
    if (!ct) return true;
    return String(ct).toLowerCase().includes(courseFilter.toLowerCase());
  };

  const matchesCategory = (college) => {
    if (category === "All") return true;
    const cat = getProp(college, ["level", "degree", "category", "program"]);
    if (!cat) return true;
    return String(cat).toLowerCase().includes(category.toLowerCase());
  };

  const filteredColleges = colleges.filter((college) => {
    const text = `${college.name || ""} ${college.location || ""} ${
      college.tags || ""
    }`.toLowerCase();
    if (searchText.trim() && !text.includes(searchText.toLowerCase()))
      return false;
    if (!matchesCategory(college)) return false;
    if (locationFilter !== "All" && String(college.location) !== locationFilter)
      return false;
    if (!matchesCourseType(college)) return false;
    if (!matchesFees(college)) return false;
    if (!matchesRating(college)) return false;
    if (!matchesScholarship(college)) return false;
    return true;
  });

  return (
    <section className="explore-section">
      <Navbar />
      {openModal && (
        <div className="explore-modal-overlay">
          <div className="explore-modal">
            <button
              className="explore-modal-close"
              onClick={() => setOpenModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <ExploreColleges closeModal={setOpenModal} />
          </div>
        </div>
      )}
      <UniversitySearch open={showUniSearch} setOpen={setShowUniSearch} />
      <div className="explore-header">
        <div className="explore-header-container">
          <h1 className="explore-title">Explore Colleges</h1>
        </div>
      </div>
      <div className="explore-search-container">
        <div className="explore-search-bar">
          <select
            className="search-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">Select Category</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>PhD</option>
          </select>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search colleges..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="filter-btn"
              onClick={() => setShowUniSearch(true)}
              title="Open advanced filters"
            >
              <FaFilter />
            </button>
          </div>
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="explore-filters">
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">Select Location</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Expanded Course Type: curated popular/detailed + dynamic fallback from data */}
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="All">Select Course Type</option>

          <optgroup label="Popular / Detailed course types">
            {additionalCourseTypes.map((c, i) => (
              <option key={`add-${i}`} value={c}>
                {c}
              </option>
            ))}
          </optgroup>

          <optgroup label="Other (from college data)">
            {courseTypes
              .filter(
                (ct) =>
                  ct &&
                  ct !== "All" &&
                  !additionalSet.has(String(ct).toLowerCase())
              )
              .map((ct, i) => (
                <option key={`dyn-${i}`} value={ct}>
                  {ct}
                </option>
              ))}
          </optgroup>
        </select>

        <select value={feesFilter} onChange={(e) => setFeesFilter(e.target.value)}>
          <option value="All">Select Fees</option>
          <option>Below ₹50,000</option>
          <option>₹50,000 - ₹1,00,000</option>
          <option>₹1,00,000 - ₹5,00,000</option>
          <option>Above ₹5,00,000</option>
        </select>

        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
          <option value="All">Select Rating</option>
          <option value="4.5+">4.5+</option>
          <option value="4.0+">4.0+</option>
          <option value="3.5+">3.5+</option>
          <option value="3.0+">3.0+</option>
        </select>

        <select value={scholarshipFilter} onChange={(e) => setScholarshipFilter(e.target.value)}>
          <option value="All">Select Scholarship</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div className="college-list">
        {filteredColleges.length === 0 && (
          <div className="no-results">No colleges found for selected filters.</div>
        )}
        {filteredColleges.map((college, index) => (
          <div key={index} className="college-card">
            <div className="college-left">
              <img src={college.image} alt={college.name} className="college-img" />
              <div className="college-info">
                <h2 className="college-name">{college.name}</h2>
                <p className="college-location">{college.location}</p>
                <button
                  className="view-btn"
                  onClick={() => navigate("/universityDetails", { state: { college } })}
                >
                  View More
                </button>
              </div>
            </div>
            <div className="college-separator" />
            <div className="college-right">
              {college.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus eget magna vel elit dictum feugiat."}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollegesPage;
