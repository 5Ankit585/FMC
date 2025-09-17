import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./ViewScholarships.css";

export default function ViewScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const location = useLocation();

  // Fetch scholarships from backend on load
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="vs-page">
      <Sidebar location={location} />

      <div className="vs-content">
        <div className="vs-container">
          {/* Header */}
          <div className="vs-header">
            <h1 className="vs-title">View Scholarships</h1>
            <p className="vs-subtitle">Browse all available scholarships.</p>
          </div>

          {/* Scholarships List */}
          <div className="vs-list-container">
            <h2 className="vs-list-title">Scholarships List</h2>
            {scholarships.length === 0 ? (
              <div className="vs-empty">
                <div className="vs-empty-icon">
                  <svg className="vs-empty-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p>No scholarships available yet.</p>
              </div>
            ) : (
              <div className="vs-list">
                {scholarships.map((s) => (
                  <div key={s._id} className="vs-item">
                    <div className="vs-item-info">
                      <h3 className="vs-item-name">{s.name}</h3>
                      <p className="vs-item-desc">{s.description}</p>
                      <div className="vs-item-grid">
                        <div>
                          <span className="vs-label">Provider:</span>
                          <p>{s.provider || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">Tags:</span>
                          <p>{s.tags?.join(", ") || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">Benefits:</span>
                          <p className="vs-benefits">{s.benefits || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">Status:</span>
                          <p>{s.status || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">Eligibility:</span>
                          <p>{s.eligibility || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">Type:</span>
                          <p>{s.type || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">Region:</span>
                          <p>{s.region || "—"}</p>
                        </div>
                        <div>
                          <span className="vs-label">General Quota:</span>
                          <p>{s.generalQuota || "—"}</p>
                        </div>
                      </div>
                      <div className="vs-deadline">
                        <span className="vs-label">Deadline:</span>
                        <span className="vs-deadline-text">{s.deadline || "—"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
