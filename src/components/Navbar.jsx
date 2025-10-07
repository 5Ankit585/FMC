// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import logo from "../Images/logoo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/counselling", label: "Counselling" },
  { to: "/courses", label: "Courses" },
  { to: "/examat", label: "Exams" },
  { to: "/scholarship", label: "Scholarships" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const hideOnDashboard = useMemo(() => {
    const p = (location?.pathname || "").toLowerCase();
    return p.includes("dashboard");
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Read from localStorage on mount
    const storedUserId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedUserId) {
      setUserId(storedUserId);
      const nameToUse = deriveName(storedName, storedEmail);
      setDisplayName(nameToUse);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (hideOnDashboard) return null;

  function deriveName(profileName, email) {
    if (profileName && profileName.trim()) return profileName.trim();
    if (email) return String(email).split("@")[0];
    return "Student";
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUserId(null);
    setDisplayName("");
    navigate("/login");
  };

  const isLoggedIn = !!userId;

  return (
    <nav className="flex justify-center items-center h-20 mx-auto px-4 md:pl-20 md:pr-12 lg:pr-24 bg-[#141f33] text-white shadow-md relative">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Vision Logo" className="h-10 w-auto" />
          <span className="text-2xl font-extrabold tracking-wide">Vision</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 lg:gap-8 font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `inline-block py-2 transition-colors ${
                      isActive
                        ? "text-yellow-500 hover:underline font-semibold"
                        : "text-white/90 hover:text-yellow-500 hover:underline"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex relative" ref={userMenuRef}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="px-3 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 font-medium max-w-[220px] truncate focus:outline-none focus:ring-2 focus:ring-yellow-500"
                title={displayName}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                {"Hi, " + displayName}
              </button>

              <div
                className={`absolute left-0 top-full mt-2 w-52 bg-gray-800 rounded-lg shadow-lg py-0 transition-all origin-top-right z-20 ${
                  userMenuOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
                role="menu"
              >
                <NavLink
                  to={`/myprofile/${userId}`}
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 cursor-pointer"
                  role="menuitem"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/course"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 cursor-pointer"
                  role="menuitem"
                >
                  My Courses
                </NavLink>
                <NavLink
                  to="/scholarshiploan"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 cursor-pointer"
                  role="menuitem"
                >
                  Scholarships
                </NavLink>
                <NavLink
                  to="/study-material"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 cursor-pointer"
                  role="menuitem"
                >
                  Study Material
                </NavLink>
                <NavLink
                  to="/exam"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 cursor-pointer"
                  role="menuitem"
                >
                  Exams
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-1 hover:bg-yellow-600 cursor-pointer"
                  role="menuitem"
                >
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-yellow-500 hover:bg-yellow-600 rounded-b-lg cursor-pointer"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
                aria-label="User menu"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <FaUserCircle className="w-8 h-8 text-yellow-500 hover:text-yellow-700" />
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-44 bg-gray-800 rounded-lg shadow-lg py-2 transition-all origin-top-right ${
                  userMenuOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
                role="menu"
              >
                <NavLink
                  to="/login"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 rounded-t-lg"
                  role="menuitem"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-yellow-600 rounded-b-lg"
                  role="menuitem"
                >
                  Signup
                </NavLink>
              </div>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          title="Menu"
        >
          <svg
            className="w-7 h-7 nav-toggle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(0,0,0,0.85)] transition-all duration-300 ease-in-out">
          <ul className="flex flex-col space-y-3 px-6 py-4 font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile User Section */}
          <div className="flex flex-col gap-3 px-6 pb-4">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-center text-white">
                  {displayName || "Account"}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg btn-accent text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg btn-accent text-center"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}