import React, { useState, useMemo } from "react";
import ExploreCoursesModal from "../Modals/ExploreColleges";
import CourseSearch from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import courseData from "./CourseData.js";
import "./ExploreCoursesPage.css";
import { FaFilter } from "react-icons/fa";

const ExploreCoursesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [showCourseSearch, setShowCourseSearch] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [feesFilter, setFeesFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  // Courses list
  const courses = courseData?.[0]?.courses ?? [];

  // Dynamic list of levels
  const levels = useMemo(() => {
    const setLv = new Set();
    courses.forEach((c) => {
      if (c.level) setLv.add(c.level);
    });
    return ["All", ...Array.from(setLv)];
  }, [courses]);

  // Dynamic list of modes
  const modes = useMemo(() => {
    const setM = new Set();
    courses.forEach((c) => {
      if (c.mode) setM.add(c.mode);
    });
    return ["All", ...Array.from(setM)];
  }, [courses]);

  const getProp = (course, candidates) => {
    for (const k of candidates) {
      if (course[k] !== undefined && course[k] !== null) return course[k];
    }
    return undefined;
  };

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

  const matchesFees = (course) => {
    if (feesFilter === "All") return true;
    const fee = parseFeeNumber(getProp(course, ["fees", "tuition", "fee"]));
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

  const matchesRating = (course) => {
    if (ratingFilter === "All") return true;
    const rating = parseFloat(getProp(course, ["rating", "avgRating"]));
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

  const filteredCourses = courses.filter((course) => {
    const text = `${course.name || ""} ${course.level || ""} ${
      course.tags || ""
    }`.toLowerCase();
    if (searchText.trim() && !text.includes(searchText.toLowerCase()))
      return false;
    if (levelFilter !== "All" && String(course.level) !== levelFilter)
      return false;
    if (modeFilter !== "All" && String(course.mode) !== modeFilter)
      return false;
    if (!matchesFees(course)) return false;
    if (!matchesRating(course)) return false;
    return true;
  });

  return (
    <section className="explore-course-section">
      <Navbar />
      {openModal && (
        <div className="explore-course-modal-overlay">
          <div className="explore-course-modal">
            <button
              className="explore-course-modal-close"
              onClick={() => setOpenModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <ExploreCoursesModal closeModal={setOpenModal} />
          </div>
        </div>
      )}
      <CourseSearch open={showCourseSearch} setOpen={setShowCourseSearch} />

      <div className="explore-course-header">
        <div className="explore-course-header-container">
          <h1 className="explore-course-title">Explore Courses</h1>
        </div>
      </div>

      <div className="explore-course-search-container">
        <div className="explore-course-search-bar">
          <select
            className="course-search-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">Select Category</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>PhD</option>
          </select>
          <div className="course-search-bar">
            <input
              type="text"
              className="course-search-input"
              placeholder="Search courses..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="course-filter-btn"
              onClick={() => setShowCourseSearch(true)}
              title="Open advanced filters"
            >
              <FaFilter />
            </button>
          </div>
          <button className="course-search-btn">Search</button>
        </div>
      </div>

      <div className="explore-course-filters">
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="All">Select Level</option>
          {levels.map((lv, i) => (
            <option key={i} value={lv}>
              {lv}
            </option>
          ))}
        </select>

        <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
          <option value="All">Select Mode</option>
          {modes.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
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
      </div>

      <div className="course-list">
        {filteredCourses.length === 0 && (
          <div className="course-no-results">No courses found.</div>
        )}
        {filteredCourses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="course-card-left">
              <img src={course.image} alt={course.name} className="course-card-img" />
              <div className="course-card-info">
                <h2 className="course-card-name">{course.name}</h2>
                <p className="course-card-level">{course.level}</p>
                <button
                  className="course-view-btn"
                  onClick={() => navigate("/courseDetails", { state: { course } })}
                >
                  View More
                </button>
              </div>
            </div>
            <div className="course-card-separator" />
            <div className="course-card-right">
              {course.description ||
                "This is a sample description for the course. Detailed info will be shown here."}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCoursesPage;
