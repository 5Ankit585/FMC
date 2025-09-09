import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import AboutUs from "../components/UniversitySections/AboutUs";
import Info from "../components/UniversitySections/Info";
import Cutoff from "../components/UniversitySections/Cutoff";
import Placement from "../components/UniversitySections/Placements";
import Facilities from "../components/UniversitySections/Facilities";
import Admission from "../components/UniversitySections/Admission";
import QA from "../components/UniversitySections/QA";
import Gallery from "../components/UniversitySections/Gallery";
import Rankings from "../components/UniversitySections/Rankings";
import NewsArticles from "../components/UniversitySections/NewsArticles";
import Reviews from "../components/UniversitySections/Reviews";
import Footer from "../components/Footer";

import logo from "../../src/Images/logoo.png";
import "./UniversityPage.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000";
const FALLBACK_BANNER =
  "https://www.shutterstock.com/image-photo/ucla-los-angeles-usa-may-600nw-2397826809.jpg";
const FALLBACK_LOGO = "https://placehold.co/96x96?text=Logo";

function UniversityPage() {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [university, setUniversity] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);

  // Horizontal scroll
  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });

  // Dark mode
  const toggleTheme = () => setDarkMode((v) => !v);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch university
  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const res = await fetch(`${API_BASE}/api/universities/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch");
        console.log("Fetched University Data:", data);
        setUniversity(data?.uni || data);
        setStatus("ready");
      } catch (e) {
        setError(e.message);
        setStatus("error");
      }
    })();
  }, [id]);

  // Chips
  const chips = [
    university?.type,
    university?.ownership,
    university?.accreditation,
    university?.affiliation,
  ].filter(Boolean);

  // Banner & Logo
  const bannerImage =
    university?.bannerImages?.[0] ||
    university?.photos?.[0] ||
    university?.galleryImages?.[0] ||
    FALLBACK_BANNER;

  const uniLogo = university?.logo?.[0] || FALLBACK_LOGO;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Navbar */}
      <nav>
        <div className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-8 w-8 mr-2 object-cover rounded-full bg-white"
          />
          <span className={`font-bold ${!darkMode ? "text-black" : ""}`}>
            Uni Hub
          </span>
        </div>

        <div className="flex-1 mx-10">
          <input type="text" placeholder="Search..." className="w-full" />
        </div>

        <div className="flex items-center space-x-2 relative">
          <button className="bg-[var(--button-accent)] text-[var(--text-color)] hover:bg-[var(--button-hover)]">
            Write a Review
          </button>
          <button className="flex items-center bg-[var(--button-primary)] text-white hover:bg-[var(--button-hover)]">
            <FontAwesomeIcon icon={faCompass} className="mr-1 text-white" />
            Explore
          </button>
          <button className="bg-[var(--button-primary)] rounded-full hover:bg-[var(--button-hover)]">
            <FontAwesomeIcon icon={faBell} className="text-white" />
          </button>
          <button
            className="bg-[var(--button-primary)] rounded-full hover:bg-[var(--button-hover)]"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className="text-white"
            />
          </button>

          {/* User dropdown */}
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="bg-[var(--button-primary)] rounded-full hover:bg-[var(--button-hover)]"
              onClick={() => setShowUserDropdown((v) => !v)}
            >
              <FontAwesomeIcon icon={faUser} className="text-white" />
            </button>

            {showUserDropdown && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <p className="text-[var(--dropdown-text)]">
                      Signed in as <br /> <strong>{user.name}</strong>
                    </p>
                    <button
                      className="flex items-center w-full text-left text-[var(--dropdown-text)] hover:text-[var(--button-hover)]"
                      onClick={() => setUser(null)}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="mr-1"
                      />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center w-full text-left text-[var(--dropdown-text)] mb-1 hover:text-[var(--button-hover)]">
                      <FontAwesomeIcon icon={faRightToBracket} className="mr-1" />
                      Login
                    </button>
                    <button className="flex items-center w-full text-left text-[var(--dropdown-text)] hover:text-[var(--button-hover)]">
                      <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Course dropdown */}
          <select className="bg-[var(--button-primary)] text-[var(--text-color)] hover:bg-[var(--button-hover)]">
            <option>All Courses</option>
            {university?.courses?.map((c, i) => (
              <option key={i}>{c.courseName || c.name}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* Loading / Error */}
      {status === "loading" && (
        <div className="p-8 text-center opacity-80">Loading university…</div>
      )}
      {status === "error" && (
        <div className="p-8 text-center text-red-500">Error: {error}</div>
      )}

      {status === "ready" && (
        <>
          {/* Banner */}
          <div
            className="university-banner"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            <div className="banner-content">
              <div className="lower-blur">
                <img src={uniLogo} alt="University Logo" />
                <div className="text-center">
                  <h1>{university?.instituteName || "—"}</h1>
                  <p>
                    © {university?.city || "City"},{" "}
                    {university?.state || "State"} &nbsp;|&nbsp; Est.{" "}
                    {university?.year || "—"}
                  </p>
                </div>
              </div>

              <div className="banner-tags">
                <div className="flex space-x-1 flex-wrap">
                  {chips.map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </div>

                <div className="flex space-x-1">
                  {university?.students && (
                    <span className="review">{university.students} students</span>
                  )}
                  {university?.faculty && (
                    <span className="review">{university.faculty} faculty</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-navigation">
            <div className="tab-container">
              <button className="tab-scroll-button" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
              </button>

              <div ref={scrollRef} className="tab-scroll">
                {[
                  "About",
                  "Info",
                  "Courses & Fees",
                  "Cutoff",
                  "Placements",
                  "Facilities",
                  "Rankings",
                  "Gallery",
                  "Admission",
                  "Reviews",
                  "News & Articles",
                  "Scholarship",
                  "Q&A",
                ].map((section) => (
                  <button
                    key={section}
                    className={`tab-button ${
                      activeSection === section ? "active" : ""
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section}
                  </button>
                ))}
              </div>

              <button className="tab-scroll-button" onClick={scrollRight}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className="action-buttons">
              <button>Apply For Admission</button>
              <button className="primary">Download Brochure</button>
              <button className="primary">More Nearby Colleges</button>
            </div>

            {/* Dynamic sections */}
            <div className="content-section">
              {activeSection === "About" && <AboutUs university={university} />}
              {activeSection === "Info" && <Info university={university} />}
              {activeSection === "Courses & Fees" && (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-3">Courses Offered</h2>
                  <table className="w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">Course Name</th>
                        <th className="border p-2">Total Fees</th>
                        <th className="border p-2">Yearly Fees</th>
                        <th className="border p-2">Duration</th>
                        <th className="border p-2">Intake</th>
                        <th className="border p-2">Apply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {university?.courses?.map((course, i) => (
                        <tr key={i} className="text-center">
                          <td className="border p-2">
                            {course.courseName || course.name}
                          </td>
                          <td className="border p-2">₹{course.totalFees}</td>
                          <td className="border p-2">₹{course.yearlyFees}</td>
                          <td className="border p-2">{course.duration}</td>
                          <td className="border p-2">{course.intake}</td>
                          <td className="border p-2">
                            {course.applyLink ? (
                              <a
                                href={course.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                Apply Now
                              </a>
                            ) : (
                              <span className="text-gray-500">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ✅ Correctly pass universityId */}
{activeSection === "Cutoff" && (
  <Cutoff universityId={university?._id} />
)}

{activeSection === "Placements" && (
  <Placement university={university} />
)}
{activeSection === "Facilities" && (
  <Facilities university={university} />
)}
{activeSection === "Admission" && (
  <Admission university={university} />
)}
{activeSection === "Q&A" && <QA university={university} />}

{/* 🔥 FIXED Gallery */}
{activeSection === "Gallery" && (
  <Gallery universityId={university?._id} darkMode={darkMode} />
)}

{activeSection === "Reviews" && <Reviews university={university} />}
{activeSection === "News & Articles" && (
  <NewsArticles university={university} />
)}
{activeSection === "Rankings" && (
  <Rankings university={university} />
)}

            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default UniversityPage;
