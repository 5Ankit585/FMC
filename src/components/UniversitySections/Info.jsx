import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faBriefcase, faUsers, faHome, faUniversity, faStar,
  faBook, faFutbol, faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import './Info.css';
import { applyTheme } from '../../utils/themeUtils';

const leftItems = [
  { icon: faMapMarkerAlt, title: 'Location', value: 'Delhi, India' },
  { icon: faBriefcase, title: 'Highest Package', value: '₹85.3 LPA' },
  { icon: faBriefcase, title: 'Average Package', value: '₹15.45 LPA' },
  { icon: faUsers, title: 'Students Placed', value: '1934+' },
  { icon: faHome, title: 'Hostel Fees', value: '₹72,000/year' },
  { icon: faUniversity, title: 'NIRF 2024 Rank', value: '29' },
];

const rightItems = [
  { icon: faBriefcase, title: 'Top Recruiters', value: 'Amazon, Google, Microsoft, TCS' },
  { icon: faGraduationCap, title: 'Popular Courses', value: 'B.Tech (CSE, ECE), M.Tech, MBA' },
  { icon: faUniversity, title: 'Campus Size', value: '164 Acres' },
  { icon: faBook, title: 'Library', value: '2,00,000+ Books, E-Resources' },
  { icon: faFutbol, title: 'Sports Facilities', value: 'Cricket Ground, Gym, Indoor Courts' },
  { icon: faStar, title: 'Student Rating', value: '⭐ 4.2/5 (843 Reviews)' },
];

const Info = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`info-two-col-container ${darkMode ? 'dark' : ''}`}>
      <h2 className="info-title">Delhi Technological University (DTU) Details</h2>
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
