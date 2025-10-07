// Scholarship.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Scholarship.css";

/* ---------------- Hero Section ---------------- */
function HeroSection() {
  return (
    <header className="scholar-hero-section">
      <div className="scholar-hero-overlay" />
      <div className="scholar-hero-pattern" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="scholar-hero-content"
      >
        <h1 className="scholar-hero-title">Find the Perfect Scholarship</h1>
        <p className="scholar-hero-subtitle">
          Search, filter, and apply for scholarships that match your profile.
        </p>
      </motion.div>
    </header>
  );
}

/* ---------------- Search Bar ---------------- */
function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="scholar-search-bar">
      <div className="scholar-search-container">
        <div className="scholar-search-brand">🎓 ScholarFind</div>
        <div className="scholar-search-input-group">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(q)}
            placeholder="Search scholarship, provider or tags..."
            className="scholar-search-input"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onSearch(q)}
            className="scholar-search-button"
          >
            Search
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sidebar Filters ---------------- */
function SidebarFilterLeft({ values, onChange }) {
  return (
    <div className="scholar-filter-sidebar">
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">State</h4>
        <select
          className="scholar-filter-select"
          value={values.region}
          onChange={(e) => onChange({ region: e.target.value })}
        >
          <option value="">Select State</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Delhi</option>
          <option>Tamil Nadu</option>
        </select>
      </div>
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Stream</h4>
        <select
          className="scholar-filter-select"
          value={values.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">Select Stream</option>
          <option>SC</option>
          <option>ST</option>
          <option>OBC</option>
          <option>General</option>
        </select>
      </div>
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Level</h4>
        <select
          className="scholar-filter-select"
          value={values.educationLevel}
          onChange={(e) => onChange({ educationLevel: e.target.value })}
        >
          <option value="">Select Level</option>
          <option>UG</option>
          <option>PG</option>
          <option>PhD</option>
        </select>
      </div>
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Exam Type</h4>
        <select
          className="scholar-filter-select"
          value={values.type}
          onChange={(e) => onChange({ type: e.target.value })}
        >
          <option value="">Select Exam Type</option>
          <option>Merit</option>
          <option>Need</option>
          <option>Government</option>
          <option>Private</option>
        </select>
      </div>
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Mode</h4>
        <select
          className="scholar-filter-select"
          value={values.mode}
          onChange={(e) => onChange({ mode: e.target.value })}
        >
          <option value="">Select Mode</option>
          <option>Online</option>
          <option>Offline</option>
        </select>
      </div>
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Date Range</h4>
        <select
          className="scholar-filter-select"
          value={values.deadlineState}
          onChange={(e) => onChange({ deadlineState: e.target.value })}
        >
          <option value="">Select Date Range</option>
          <option>Open</option>
          <option>Upcoming</option>
          <option>Closed</option>
        </select>
      </div>
    </div>
  );
}

/* ---------------- Scholarship Card ---------------- */

function ScholarshipCard({ data }) {
  const { _id, name, provider, deadline, status, universityId } = data;
  const instituteName = universityId?.instituteName || "Unknown University";
  const location = universityId?.city
    ? `${universityId.city}, ${universityId.state || universityId.region || "India"}`
    : "India";
  const logo = universityId?.logo?.[0];
  const program = data.category || "BCA";

  // Persistent save state
  const [saved, setSaved] = useState(() => {
    const savedList = JSON.parse(localStorage.getItem("savedScholarships") || "[]");
    return savedList.includes(_id);
  });

  const toggleSave = () => {
    setSaved((prev) => {
      const savedList = JSON.parse(localStorage.getItem("savedScholarships") || "[]");
      let updated;
      if (prev) {
        // remove
        updated = savedList.filter((id) => id !== _id);
      } else {
        // add
        updated = [...savedList, _id];
      }
      localStorage.setItem("savedScholarships", JSON.stringify(updated));
      return !prev;
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="scholar-card"
    >
      {/* ---- Save Icon ---- */}
      <button
        className={`scholar-save-btn ${saved ? "bg-green-500 text-white" : "bg-gray-200"}`}
        onClick={toggleSave}
        title={saved ? "Remove from Saved" : "Save Scholarship"}
      >
        {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      </button>

      <div className="scholar-card-uni">
        {logo ? (
          <img src={logo} alt={instituteName} className="scholar-card-uni-logo" />
        ) : (
          <div className="scholar-card-uni-placeholder">🏛️</div>
        )}
        <div className="scholar-card-uni-info">
          <h4 className="scholar-card-uni-name">{instituteName}</h4>
          <p className="scholar-card-uni-location">{location}</p>
        </div>
      </div>

      <div className="scholar-card-content">
        <h3 className="scholar-card-title">{name}</h3>
        <p className="scholar-card-provider">
          <strong>Provider:</strong> {provider}
        </p>
        <p className="scholar-card-event">
          <strong>Deadline:</strong> {deadline || "N/A"}
        </p>
        <span className="scholar-card-program">{program}</span>
      </div>

      <div className="scholar-card-footer">
        <span className={`scholar-status ${status?.toLowerCase()}`}>{status || "Open"}</span>
        <div className="scholar-card-actions">
          <button className="scholar-card-button counselling">Get Counselling</button>
          <button className="scholar-card-button explore">Explore Now</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Component ---------------- */
export default function Scholar() {
  const [scholarships, setScholarships] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    category: "",
    educationLevel: "",
    type: "",
    mode: "",
    deadlineState: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Upcoming");

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        const normalized = data.map((d) => ({ tags: [], ...d }));
        setScholarships(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scholarships.filter((s) => {
      const name = (s.name || "").toLowerCase();
      const provider = (s.provider || "").toLowerCase();
      const status = (s.status || "").toLowerCase();

      return (
        (q === "" || name.includes(q) || provider.includes(q)) &&
        (!filters.region || s.region?.toLowerCase() === filters.region.toLowerCase()) &&
        (!filters.category || s.category?.toLowerCase() === filters.category.toLowerCase()) &&
        (!filters.educationLevel || s.educationLevel?.toLowerCase() === filters.educationLevel.toLowerCase()) &&
        (!filters.type || s.type?.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.mode || s.status?.toLowerCase() === filters.mode.toLowerCase()) &&
        (!filters.deadlineState || status === filters.deadlineState.toLowerCase()) &&
        (activeTab === "Upcoming" || activeTab === "Ongoing")
      );
    });
  }, [scholarships, query, filters, activeTab]);

  return (
    <div className="scholar-main">
      <HeroSection />
      <SearchBar onSearch={setQuery} />

      <div className="scholar-content">
        <SidebarFilterLeft values={filters} onChange={(next) => setFilters((p) => ({ ...p, ...next }))} />

        <motion.div layout className="scholar-results">
          <div className="scholar-results-header">
            <h2 className="scholar-results-title">University Scholarships Dashboard.</h2>
            <div className="scholar-tabs">
              {["Upcoming", "Ongoing"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`scholar-tab ${activeTab === tab ? "scholar-tab-active" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="scholar-loading">Loading scholarships...</div>
          ) : error ? (
            <div className="scholar-error">Error: {error}</div>
          ) : filtered.length === 0 ? (
            <div className="scholar-empty">No scholarships found for your filters.</div>
          ) : (
            <div className="scholar-grid">
              {filtered.map((s) => (
                <ScholarshipCard
                  key={s._id}
                  data={s}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}