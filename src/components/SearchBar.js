import React, { useState, useRef, useEffect } from "react";
import {
  faSearch,
  faSyncAlt,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  courseMappings,
  coursesByLevel,
  facilitiesOptions,
  states,
  affiliationOptions,
} from "./searchBarData";
import "./SearchBar.css";

// MultiSelect Component
const MultiSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div className="multi-select-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{value.length > 0 ? `${value.length} selected` : placeholder}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {isOpen && (
        <div className="multi-select-menu">
          {options.map((option) => (
            <div
              key={option}
              className={`multi-select-option ${value.includes(option) ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              <input type="checkbox" checked={value.includes(option)} readOnly />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// FilterGrid Component
const FilterGrid = ({
  studyLevel, setStudyLevel,
  courseDuration, setCourseDuration,
  mode, setMode,
  qualification, setQualification,
  course, setCourse,
  recommendedCourses, setRecommendedCourses,
  selectedState, setSelectedState,
  selectedDistrict, setSelectedDistrict,
  collegeType, setCollegeType,
  affiliations, setAffiliations,
  minFees, setMinFees,
  maxFees, setMaxFees,
  entranceExam, setEntranceExam,
  cutOffMarks, setCutOffMarks,
  minRanking, setMinRanking,
  minPlacement, setMinPlacement,
  facilities, setFacilities,
  sortBy, setSortBy,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="filter-grid">
      {/* Basic Filters */}
      <div className="filter-group">
        <label className="filter-label">Study Level</label>
        <select
          value={studyLevel}
          onChange={(e) => { setStudyLevel(e.target.value); setCourse(""); }}
          className="filter-select"
        >
          <option value="">Level</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
          <option value="Diploma">Diploma</option>
          <option value="PhD">PhD</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Course Duration</label>
        <select
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          className="filter-select"
        >
          <option value="">Duration</option>
          <option value="1 year">1 year</option>
          <option value="2 years">2 years</option>
          <option value="3 years">3 years</option>
          <option value="4 years">4 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Mode</label>
        <select
          value={mode}
          onChange={(e) => { setMode(e.target.value); setQualification(""); setCourse(""); setRecommendedCourses([]); }}
          className="filter-select"
        >
          <option value="known">Known Course</option>
          <option value="recommend">Recommend</option>
        </select>
      </div>

      {studyLevel && mode === "known" && (
        <div className="filter-group">
          <label className="filter-label">Course</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)} className="filter-select">
            <option value="">Select</option>
            {coursesByLevel[studyLevel]?.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      {studyLevel && mode === "recommend" && (
        <>
          <div className="filter-group">
            <label className="filter-label">Qualification</label>
            <select
              value={qualification}
              onChange={(e) => { setQualification(e.target.value); setRecommendedCourses(courseMappings[studyLevel]?.[e.target.value] || []); }}
              className="filter-select"
            >
              <option value="">Select</option>
              {Object.keys(courseMappings[studyLevel] || {}).map((q) => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
          {recommendedCourses.length > 0 && (
            <div className="filter-group">
              <label className="filter-label">Recommended</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="filter-select">
                <option value="">Select</option>
                {recommendedCourses.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
        </>
      )}

      <div className="filter-group">
        <label className="filter-label">State</label>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="filter-select">
          <option value="">State</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">District</label>
        <input type="text" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="filter-input" placeholder="District" />
      </div>

      <div className="filter-group">
        <label className="filter-label">College Type</label>
        <select value={collegeType} onChange={(e) => setCollegeType(e.target.value)} className="filter-select">
          <option value="">Any</option>
          <option value="Private">Private</option>
          <option value="Government">Government</option>
          <option value="Deemed">Deemed</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Affiliation</label>
        <MultiSelect options={affiliationOptions} value={affiliations} onChange={setAffiliations} placeholder="Select Affiliations" />
      </div>

      <div className="filter-group">
        <label className="filter-label">Fees</label>
        <div className="fees-flex">
          <input type="number" placeholder="Min" value={minFees} onChange={(e) => setMinFees(e.target.value)} className="filter-input" />
          <input type="number" placeholder="Max" value={maxFees} onChange={(e) => setMaxFees(e.target.value)} className="filter-input" />
        </div>
      </div>

      {/* Show More Button */}
      <div className="filter-group">
        <button className="filter-btn show-more" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Advanced Filters */}
      {showMore && (
        <>
          <div className="filter-group">
            <label className="filter-label">Entrance</label>
            <select value={entranceExam} onChange={(e) => setEntranceExam(e.target.value)} className="filter-select">
              <option value="">Any</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Cut-off Marks (%)</label>
            <input type="number" placeholder="Min %" value={cutOffMarks} onChange={(e) => setCutOffMarks(e.target.value)} className="filter-input" />
          </div>

          <div className="filter-group">
            <label className="filter-label">Ranking (Min)</label>
            <input type="number" placeholder="Min" value={minRanking} onChange={(e) => setMinRanking(e.target.value)} className="filter-input" />
          </div>

          <div className="filter-group">
            <label className="filter-label">Placement %</label>
            <input type="number" placeholder="Min" value={minPlacement} onChange={(e) => setMinPlacement(e.target.value)} className="filter-input" />
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="">Default</option>
              <option value="ranking">Ranking</option>
              <option value="fees">Lowest Fee</option>
              <option value="placement">Highest Placement %</option>
              <option value="popularity">Most Popular</option>
              <option value="roi">Best ROI</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Facilities</label>
            <MultiSelect options={facilitiesOptions} value={facilities} onChange={setFacilities} placeholder="Select Facilities" />
          </div>
        </>
      )}
    </div>
  );
};

// SearchBar Component
const SearchBar = ({ onSearch, open, setOpen }) => {
  const [studyLevel, setStudyLevel] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [mode, setMode] = useState("known");
  const [qualification, setQualification] = useState("");
  const [course, setCourse] = useState("");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [affiliations, setAffiliations] = useState([]);
  const [minFees, setMinFees] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [entranceExam, setEntranceExam] = useState("");
  const [cutOffMarks, setCutOffMarks] = useState("");
  const [minRanking, setMinRanking] = useState("");
  const [minPlacement, setMinPlacement] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const handleReset = () => {
    setStudyLevel("");
    setCourseDuration("");
    setMode("known");
    setQualification("");
    setCourse("");
    setRecommendedCourses([]);
    setSelectedState("");
    setSelectedDistrict("");
    setCollegeType("");
    setAffiliations([]);
    setMinFees("");
    setMaxFees("");
    setEntranceExam("");
    setCutOffMarks("");
    setMinRanking("");
    setMinPlacement("");
    setFacilities([]);
    setSortBy("");
  };

  const handleSearch = () => {
    const filters = {
      studyLevel,
      courseDuration,
      mode,
      qualification,
      course,
      location: { state: selectedState, district: selectedDistrict },
      collegeType,
      affiliations,
      fees: { min: minFees, max: maxFees },
      entranceExam,
      cutOffMarks,
      minRanking,
      minPlacement,
      facilities,
      sortBy,
    };
    if (onSearch) onSearch(filters);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="filter-overlay">
          <div className="filter-modal">
            <div className="filter-content">
              <div className="filter-header">
                <h2 className="filter-title">Advanced Filters</h2>
                <button className="filter-close" onClick={() => setOpen(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Filter Grid */}
              <FilterGrid
                studyLevel={studyLevel} setStudyLevel={setStudyLevel}
                courseDuration={courseDuration} setCourseDuration={setCourseDuration}
                mode={mode} setMode={setMode}
                qualification={qualification} setQualification={setQualification}
                course={course} setCourse={setCourse}
                recommendedCourses={recommendedCourses} setRecommendedCourses={setRecommendedCourses}
                selectedState={selectedState} setSelectedState={setSelectedState}
                selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict}
                collegeType={collegeType} setCollegeType={setCollegeType}
                affiliations={affiliations} setAffiliations={setAffiliations}
                minFees={minFees} setMinFees={setMinFees}
                maxFees={maxFees} setMaxFees={setMaxFees}
                entranceExam={entranceExam} setEntranceExam={setEntranceExam}
                cutOffMarks={cutOffMarks} setCutOffMarks={setCutOffMarks}
                minRanking={minRanking} setMinRanking={setMinRanking}
                minPlacement={minPlacement} setMinPlacement={setMinPlacement}
                facilities={facilities} setFacilities={setFacilities}
                sortBy={sortBy} setSortBy={setSortBy}
              />

              {/* Actions */}
              <div className="filter-actions">
                <button className="filter-btn reset" onClick={handleReset}>
                  <FontAwesomeIcon icon={faSyncAlt} /> Reset
                </button>
                <button className="filter-btn search" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} /> Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
