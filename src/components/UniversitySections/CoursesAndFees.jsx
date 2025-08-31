import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './CoursesAndFees.css';

const CoursesAndFees = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize darkMode 
    return document.documentElement.classList.contains('dark');
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    
    const handleThemeChange = () => {
      setDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const courses = [
    {
      name: 'B.Tech - Computer Science and Engineering (CSE)',
      totalFees: '₹9,46,800',
      yearlyFees: '₹2,36,700',
      duration: '4 Years',
      intake: 480,
      applyLink: 'https://dtu.ac.in/admissions',
    },
    {
      name: 'B.Tech - Electronics and Communication Engineering (ECE)',
      totalFees: '₹9,00,000',
      yearlyFees: '₹2,25,000',
      duration: '4 Years',
      intake: 360,
      applyLink: 'https://dtu.ac.in/admissions',
    },
    {
      name: 'M.Tech - Computer Science',
      totalFees: '₹3,20,000',
      yearlyFees: '₹1,60,000',
      duration: '2 Years',
      intake: 60,
      applyLink: 'https://dtu.ac.in/admissions',
    },
    {
      name: 'MBA',
      totalFees: '₹4,00,000',
      yearlyFees: '₹2,00,000',
      duration: '2 Years',
      intake: 120,
      applyLink: 'https://dtu.ac.in/admissions',
    },
  ];

  return (
    <div className={`courses-container ${darkMode ? 'dark' : ''}`}>
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
            {courses.map((course, index) => (
              <tr
                key={index}
                className={`courses-row ${index === hoveredIndex ? 'highlight-row' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <td className="courses-td">{course.name}</td>
                <td className="courses-td">{course.totalFees}</td>
                <td className="courses-td">{course.yearlyFees}</td>
                <td className="courses-td">{course.duration}</td>
                <td className="courses-td">{course.intake}</td>
                <td className="courses-td">
                  <a
                    href={course.applyLink}
                    className="apply-button"
                    aria-label={`Apply for ${course.name}`}
                  >
                    <span>Apply</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesAndFees;