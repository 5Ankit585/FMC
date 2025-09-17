import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Scholarship.css";

/* ---------------- Hero Section ---------------- */
function HeroSection() {
  return (
    <section className="scholar-hero-section">
      <div className="scholar-hero-background" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="scholar-hero-content"
      >
        <h1 className="scholar-hero-title">Find the Perfect Scholarship</h1>
        <p className="scholar-hero-subtitle">
          Search, filter, and apply for scholarships that match your profile.
        </p>
      </motion.div>
      <div className="scholar-hero-blur-left" />
      <div className="scholar-hero-blur-right" />
    </section>
  );
}

/* ---------------- Search Bar ---------------- */
function SearchBar({ onSearch, onToggleFilters }) {
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

        {/* Filters button (toggles mobile drawer) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="scholar-filter-button"
          onClick={onToggleFilters}
        >
          Filters
        </motion.button>
      </div>
    </div>
  );
}

/* ---------------- Sidebar Filters ---------------- */
function SidebarFilterLeft({ values, onChange }) {
  return (
    <div className="scholar-filter-sidebar">
      {/* Category */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Category</h4>
        <select
          className="scholar-filter-select"
          value={values.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">Any</option>
          <option>SC</option>
          <option>ST</option>
          <option>OBC</option>
          <option>General</option>
        </select>
      </div>

      {/* Family Income */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Family Income</h4>
        <select
          className="scholar-filter-select"
          value={values.income}
          onChange={(e) => onChange({ income: e.target.value })}
        >
          <option value="">Any</option>
          <option value="1L-3L">1L to 3L</option>
          <option value="4L-5L">4L to 5L</option>
          <option value="6L-7L">6L to 7L</option>
        </select>
      </div>

      {/* Education Level */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Education Level</h4>
        <select
          className="scholar-filter-select"
          value={values.educationLevel}
          onChange={(e) => onChange({ educationLevel: e.target.value })}
        >
          <option value="">Any</option>
          <option>UG</option>
          <option>PG</option>
          <option>PhD</option>
        </select>
      </div>

      {/* Scholarship Type */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Scholarship Type</h4>
        <select
          className="scholar-filter-select"
          value={values.type}
          onChange={(e) => onChange({ type: e.target.value })}
        >
          <option value="">Any</option>
          <option>Merit</option>
          <option>Need</option>
          <option>Government</option>
          <option>Private</option>
        </select>
      </div>

      {/* State / Region */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">State / Region</h4>
        <select
          className="scholar-filter-select"
          value={values.region}
          onChange={(e) => onChange({ region: e.target.value })}
        >
          <option value="">Any</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Delhi</option>
          <option>Tamil Nadu</option>
        </select>
      </div>

      {/* General Quota */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">General Quota</h4>
        <select
          className="scholar-filter-select"
          value={values.generalQuota}
          onChange={(e) => onChange({ generalQuota: e.target.value })}
        >
          <option value="">Any</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* Deadline */}
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Deadline</h4>
        <select
          className="scholar-filter-select"
          value={values.deadlineState}
          onChange={(e) => onChange({ deadlineState: e.target.value })}
        >
          <option value="">Any</option>
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
  const { _id, name, provider, tags = [], benefits, deadline, status } = data;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="scholar-card"
    >
      <div className="scholar-card-header">
        <div>
          <h3 className="scholar-card-title">{name}</h3>
          <p className="scholar-card-provider">Provider: {provider}</p>
        </div>
        <span
          className={`scholar-card-status ${
            status === "Open"
              ? "scholar-status-open"
              : status === "Upcoming"
              ? "scholar-status-upcoming"
              : "scholar-status-closed"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="scholar-card-tags">
        {tags.map((t) => (
          <span key={t} className="scholar-card-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="scholar-card-details">
        <div className="scholar-card-benefit">
          <p className="scholar-card-label">Benefits</p>
          <p className="scholar-card-value">{benefits}</p>
        </div>
        <div className="scholar-card-deadline">
          <p className="scholar-card-label">Deadline</p>
          <p className="scholar-card-value">{deadline}</p>
        </div>
      </div>

      <div className="scholar-card-actions">
        <Link to={`/scholarships/${_id}`} className="scholar-card-link">
          <button className="scholar-card-button-details">View Details</button>
        </Link>
        <Link to="/Applynow" className="scholar-card-link">
          <button className="scholar-card-button-apply">Apply Now</button>
        </Link>
        <button className="scholar-card-button-download">Download</button>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Component ---------------- */
export default function Scholar() {
  const [scholarships, setScholarships] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    income: "",
    educationLevel: "",
    type: "",
    region: "",
    generalQuota: "",
    deadlineState: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

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
      const tags = (s.tags || []).map((t) => String(t).toLowerCase());
      const status = (s.status || "").toLowerCase();

      return (
        (q === "" || name.includes(q) || provider.includes(q) || tags.some((t) => t.includes(q))) &&
        (!filters.category || s.category?.toLowerCase() === filters.category.toLowerCase()) &&
        (!filters.income || s.income === filters.income) &&
        (!filters.educationLevel || s.educationLevel?.toLowerCase() === filters.educationLevel.toLowerCase()) &&
        (!filters.type || s.type?.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.region || s.region?.toLowerCase() === filters.region.toLowerCase()) &&
        (!filters.generalQuota || String(s.generalQuota || "").toLowerCase() === filters.generalQuota.toLowerCase()) &&
        (!filters.deadlineState || status === filters.deadlineState.toLowerCase())
      );
    });
  }, [scholarships, query, filters]);

  return (
    <div className="scholar-main">
      <HeroSection />
      <SearchBar onSearch={setQuery} onToggleFilters={() => setFilterDrawerOpen(true)} />

      <div className="scholar-content">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <SidebarFilterLeft values={filters} onChange={(next) => setFilters((p) => ({ ...p, ...next }))} />
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {filterDrawerOpen && (
            <motion.div
              className="filter-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
            >
              <motion.div
                className="filter-drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                onClick={(e) => e.stopPropagation()}
              >
                <SidebarFilterLeft
                  values={filters}
                  onChange={(next) => setFilters((p) => ({ ...p, ...next }))}
                />
                <button className="close-drawer" onClick={() => setFilterDrawerOpen(false)}>
                  ✕ Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <motion.div layout className="scholar-results">
          <div className="scholar-results-header">
            <h2 className="scholar-results-title">Available Scholarships</h2>
            {/* <span className="scholar-results-count">{filtered.length} results</span> */}
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
                <ScholarshipCard key={s._id} data={s} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
