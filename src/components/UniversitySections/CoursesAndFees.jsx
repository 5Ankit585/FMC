import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./CoursesAndFees.css";

const CoursesAndFees = ({ universityId }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Theme listener
    const handleThemeChange = () => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  useEffect(() => {
    // Fetch courses from backend
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/universities/${universityId}/courses`);
        const data = await res.json();

        // Debugging logs
        console.log("📌 Fetched University Data:", data);
        console.log("📌 Courses:", data.courses);

        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [universityId]);

  if (loading) {
    return <p className="loading-text">Loading courses...</p>;
  }

  return (
    <div className={`courses-container ${darkMode ? "dark" : ""}`}>
      <h2 className="courses-title">Courses & Fees</h2>
      <div className="courses-table-wrapper">
        <table className="courses-table">
          <thead>
            <tr className="courses-header">
              <th className="courses-th">Course Name</th>
              <th className="courses-th">Total Fees</th>
              <th className="courses-th">Yearly Fees</th>
              <th className="courses-th">Duration</th>
              <th className="courses-th">Intake</th>
              <th className="courses-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr
                  key={index}
                  className={`courses-row ${
                    index === hoveredIndex ? "highlight-row" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <td className="courses-td">{course.courseName}</td>
                  <td className="courses-td">{course.totalFees}</td>
                  <td className="courses-td">{course.yearlyFees}</td>
                  <td className="courses-td">{course.duration}</td>
                  <td className="courses-td">{course.intake}</td>
                  <td className="courses-td">
                    <a
                      href={course.applyLink || "#"}
                      className="apply-button"
                      aria-label={`Apply for ${course.courseName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Apply</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="courses-td no-data">
                  No courses available for this university.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesAndFees;
