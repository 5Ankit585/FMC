import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBriefcase,
  faUsers,
  faHome,
  faUniversity,
  faStar,
  faBook,
  faFutbol,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import "./Info.css";
import { applyTheme } from "../../utils/themeUtils";

const Info = ({ university }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  if (!university) {
    return <p className="p-4">Loading Info...</p>;
  }

  // Convert CSV fields to readable string
  const formatCSV = (csv) =>
    csv ? csv.split(",").map((item) => item.trim()).join(", ") : "N/A";

  const leftItems = [
    {
      icon: faMapMarkerAlt,
      title: "Location",
      value: `${university.city}, ${university.state}`,
    },
    {
      icon: faBriefcase,
      title: "Highest Package",
      value: university.highestPackage || "N/A",
    },
    {
      icon: faBriefcase,
      title: "Average Package",
      value: university.avgPackage || "N/A",
    },
    {
      icon: faUsers,
      title: "Students Placed",
      value: university.students || "N/A",
    },
    {
      icon: faHome,
      title: "Hostel Fees",
      value: university.hostelFee || "N/A",
    },
    {
      icon: faUniversity,
      title: "NIRF Rank",
      value: university.nirfRank || "N/A",
    },
  ];

  const rightItems = [
    {
      icon: faBriefcase,
      title: "Top Recruiters",
      value: formatCSV(university.topRecruiters),
    },
    {
      icon: faGraduationCap,
      title: "Popular Courses",
      value: formatCSV(university.popularCourses),
    },
    {
      icon: faUniversity,
      title: "Campus Size",
      value: university.campusSize || "N/A",
    },
    {
      icon: faBook,
      title: "Library",
      value: "2,00,000+ Books, E-Resources", // static for now
    },
    {
      icon: faFutbol,
      title: "Sports Facilities",
      value: "Cricket Ground, Gym, Indoor Courts", // static for now
    },
    {
      icon: faStar,
      title: "Student Rating",
      value: university.studentRating || "N/A",
    },
  ];

  return (
    <div className={`info-two-col-container ${darkMode ? "dark" : ""}`}>
      <h2 className="info-title">
        {university.instituteName} Details
      </h2>
      <div className="info-grid">
        {leftItems.map((leftItem, idx) => {
          const rightItem = rightItems[idx];
          return (
            <div key={idx} className="info-row">
              {/* Left Item */}
              <div className="info-block">
                <FontAwesomeIcon icon={leftItem.icon} className="info-icon" />
                <div className="info-text">
                  <h4>{leftItem.title}</h4>
                  <p>{leftItem.value}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="info-divider" />

              {/* Right Item */}
              <div className="info-block">
                <FontAwesomeIcon icon={rightItem.icon} className="info-icon" />
                <div className="info-text">
                  <h4>{rightItem.title}</h4>
                  <p>{rightItem.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
