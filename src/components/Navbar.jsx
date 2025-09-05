import React, { useState, useEffect, useRef, useMemo } from "react";
import logo from "../Images/logoo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./Navbar.css"; // <-- import the separate CSS

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/counselling", label: "Counselling" },
  { to: "/mycourse", label: "Courses" },
  { to: "/examat", label: "Exams" },
  { to: "/scholarship", label: "Scholarships" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const hideOnDashboard = useMemo(() => {
    const p = (location?.pathname || "").toLowerCase();
    return p.includes("dashboard");
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setUserMenuOpen(false);

      if (!currentUser) {
        if (isMounted) setDisplayName("");
        return;
      }

      try {
        const docRef = doc(db, "students", currentUser.uid);
        const snap = await getDoc(docRef);
        const profileData = snap.exists() ? snap.data() : null;

        const name = deriveName(
          profileData?.name,
          currentUser.displayName,
          currentUser.email
        );
        if (isMounted) setDisplayName(name);
      } catch (_e) {
        const fallback = deriveName("", currentUser.displayName, currentUser.email);
        if (isMounted) setDisplayName(fallback);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth]);

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

  function deriveName(profileName, authDisplayName, email) {
    if (profileName && profileName.trim()) return profileName.trim();
    if (authDisplayName && authDisplayName.trim()) return authDisplayName.trim();
    if (email) return String(email).split("@")[0];
    return "Student";
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDisplayName("");
      navigate("/login");
    } catch (_e) {}
  };

  const displayLabel = displayName ? `Hi, ${displayName}` : "Account";

  return (
    <nav className="flex justify-center items-center h-20 mx-auto px-4 md:pl-20 md:pr-12 lg:pr-24 bg-[#141f33] text-white shadow-md relative">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Vision Logo" className="h-10 w-auto" />
          <span className="text-2xl font-extrabold tracking-wide">
            Vision
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center ml-6">
          <ul className="flex space-x-8 font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* User Menu */}
        <div className="hidden md:flex relative" ref={userMenuRef}>
          {user ? (
            <>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="px-4 py-2 rounded-lg btn-accent font-medium max-w-[220px] truncate"
                title={displayName || "Account"}
              >
                {displayLabel}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg py-2 z-50 dropdown-panel">
                  {[
                    { to: "/profile", label: "My Profile" },
                    { to: "/mycourse", label: "Courses" },
                    { to: "/examat", label: "Exams" },
                    { to: "/scholarship", label: "Scholarships" },
                    { to: "/study-material", label: "Study Material" },
                    { to: "/settings", label: "Settings" },
                  ].map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 dropdown-item"
                    >
                      {label}
                    </NavLink>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-red-500 hover:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="focus:outline-none"
                aria-label="User menu"
                title="Account"
              >
                <FaUserCircle className="w-8 h-8 user-icon" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-lg shadow-lg py-2 z-50 dropdown-panel">
                  <NavLink
                    to="/login"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 dropdown-item"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 dropdown-item"
                  >
                    Signup
                  </NavLink>
                </div>
              )}
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
            {user && (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="nav-link"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/study-material"
                    onClick={() => setIsOpen(false)}
                    className="nav-link"
                  >
                    Study Material
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="nav-link"
                  >
                    Settings
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* User Section in Mobile */}
          <div className="flex flex-col gap-3 px-6 pb-4">
            {user ? (
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
