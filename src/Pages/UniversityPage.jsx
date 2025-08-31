import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBell,
  faMoon,
  faSun,
  faCompass,
  faRightToBracket,
  faUserPlus,
  faArrowRightFromBracket,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { applyTheme } from '../utils/themeUtils';
import AboutUs from '../components/UniversitySections/AboutUs';
import Info from '../components/UniversitySections/Info';
import CoursesAndFees from '../components/UniversitySections/CoursesAndFees';
import Cutoff from '../components/UniversitySections/Cutoff';
import Placement from '../components/UniversitySections/Placements';
import Facilities from '../components/UniversitySections/Facilities';
import Admission from '../components/UniversitySections/Admission';
import QA from '../components/UniversitySections/QA';
import Gallery from '../components/UniversitySections/Gallery';
import Footer from '../components/Footer';
import './UniversityPage.css';
import Rankings from '../components/UniversitySections/Rankings';
import NewsArticles from '../components/UniversitySections/NewsArticles';
import Reviews from '../components/UniversitySections/Reviews';


function UniversityPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('About');
  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    applyTheme(darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  };

  const handleButtonClick = (section) => setActiveSection(section);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      {/* Navbar */}
      <nav>
        <div className="flex items-center">
          <img
            src="https://marketplace.canva.com/EAGSIcoid00/1/0/1600w/canva-blue-white-modern-school-logo-ZBxBTP6Lc-E.jpg"
            alt="Logo"
            className="h-8 mr-2"
          />
          <span className={`font-bold ${!darkMode ? 'text-black' : ''}`}>Uni Hub</span>
        </div>

        <div className="flex-1 mx-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2 relative">
          <button className="bg-[var(--button-accent)] text-[var(--text-color)] hover:bg-[var(--button-hover)]">
            Write a Review
          </button>
          <button className="flex items-center bg-[var(--button-primary)] text-white hover:bg-[var(--button-hover)]">
            <FontAwesomeIcon icon={faCompass} className="fa-compass mr-1 text-white" />
            Explore
          </button>
          <button className="bg-[var(--button-primary)] rounded-full hover:bg-[var(--button-hover)]">
            <FontAwesomeIcon icon={faBell} className="fa-bell text-white" />
          </button>
          <button className="bg-[var(--button-primary)] rounded-full hover:bg-[var(--button-hover)]" onClick={toggleTheme}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className={`${darkMode ? 'fa-sun' : 'fa-moon'} text-white`} />
          </button>

          {/* User dropdown */}
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="bg-[var(--button-primary)] rounded-full hover:bg-[var(--button-hover)]"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <FontAwesomeIcon icon={faUser} className="fa-user text-white" />
            </button>


            {showUserDropdown && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <p className="text-[var(--dropdown-text)]">Signed in as <br /><strong>{user.name}</strong></p>
                    <button
                      className="flex items-center w-full text-left text-[var(--dropdown-text)] hover:text-[var(--button-hover)]"
                      onClick={() => setUser(null)}
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className="fa-arrow-right-from-bracket mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center w-full text-left text-[var(--dropdown-text)] mb-1 hover:text-[var(--button-hover)]">
                      <FontAwesomeIcon icon={faRightToBracket} className="fa-right-to-bracket mr-1" />
                      Login
                    </button>
                    <button className="flex items-center w-full text-left text-[var(--dropdown-text)] hover:text-[var(--button-hover)]">
                      <FontAwesomeIcon icon={faUserPlus} className="fa-user-plus mr-1" />
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <select className="bg-[var(--button-primary)] text-[var(--text-color)] hover:bg-[var(--button-hover)]">
            <option>All Courses</option>
            <option>B.Tech</option>
            <option>MBA</option>
            <option>BAMS</option>
            <option>BPharma</option>
            <option>BCA</option>
            <option>BBA</option>
          </select>
        </div>
      </nav>

      {/* University Details Banner */}
      <div
        className="university-banner"
        style={{
          backgroundImage:
            "url('https://sustainability.umd.edu/sites/default/files/styles/optimized/public/2024-08/HornbakePlaza_10242017_9203-7%20%281%29.jpg?itok=k2UhA8Xt')",
        }}
      >
        <div className="banner-content">
          <div className="lower-blur">
            <img
              src="https://marketplace.canva.com/EAGSIcoid00/1/0/1600w/canva-blue-white-modern-school-logo-ZBxBTP6Lc-E.jpg"
              alt="University Logo"
            />
            <div className="text-center">
              <h1>Your University Name</h1>
              <p>© City, Country | Est 1952</p>
            </div>
          </div>

          <div className="banner-tags">
            <div className="flex space-x-1">
              <span>AICTE</span>
              <span>NAAC Grade A</span>
              <span>NIRF</span>
              <span>NBA</span>
              <span>Government</span>
            </div>
            <div className="flex space-x-1">
              <span className="review">8 / 10 reviews</span>
              <span className="review">1 reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="tab-container">
          <button
            className="tab-scroll-button"
            onClick={scrollLeft}
            title="Scroll Left"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="fa-chevron-left text-xs" />
          </button>

          <div
            ref={scrollRef}
            className="tab-scroll"
          >
            {[
              'About',
              'Info',
              'Courses & Fees',
              'Cutoff',
              'Placements',
              'Facilities',
              'Rankings',
              'Gallery',
              'Admission',
              'Reviews',
              'News & Articles',
              'Scholarship',
              'Q&A',
            ].map((section, index) => (
              <button
                key={index}
                className={`tab-button ${activeSection === section ? 'active' : ''}`}
                onClick={() => handleButtonClick(section)}
              >
                {section}
              </button>
            ))}
          </div>

          <button
            className="tab-scroll-button"
            onClick={scrollRight}
            title="Scroll Right"
          >
            <FontAwesomeIcon icon={faChevronRight} className="fa-chevron-right" />
          </button>
        </div>

        <div className="action-buttons">
          <button>Apply For Admission</button>
          <button className="primary">Download Brochure</button>
          <button className="primary">More Nearby Colleges</button>
        </div>

        {/* Render dynamic section based on selection */}
        <div className="content-section">
          {activeSection === 'About' && <AboutUs />}
          {activeSection === 'Info' && <Info />}
          {activeSection === 'Courses & Fees' && <CoursesAndFees />}
          {activeSection === 'Cutoff' && <Cutoff />}
          {activeSection === 'Placements' && <Placement />}
          {activeSection === 'Facilities' && <Facilities />}
          {activeSection === 'Admission' && <Admission />}
          {activeSection === 'Q&A' && <QA />}
          {activeSection === 'Gallery' && <Gallery />}
          {activeSection === 'Reviews' && <Reviews />}
          {activeSection === 'News & Articles' && <NewsArticles />}
          {activeSection === 'Rankings' && <Rankings />}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UniversityPage;