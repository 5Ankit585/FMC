import React, { useEffect, useState } from "react";
import "./Cutoff.css";
import { applyTheme } from "../../utils/themeUtils";

const Cutoff = ({ universityId }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cutoffData, setCutoffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchCutoffs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/cutoffs/${universityId}/cutoffs`
        );
        const data = await res.json();
        if (data.success) {
          setCutoffData(data.cutoffs || []);
        } else {
          setError(data.message || "Failed to fetch cutoff data");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (universityId) {
      fetchCutoffs();
    }
  }, [universityId]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`cutoff-container ${darkMode ? "dark" : ""}`}>
      <div className="cutoff-header">
        <h2>Cutoff for Year 2024</h2>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {loading ? (
        <p>Loading cutoffs...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : cutoffData.length === 0 ? (
        <p>No cutoff data available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="cutoff-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Open</th>
                <th>General</th>
                <th>EWS</th>
                <th>OBC</th>
                <th>SC</th>
                <th>ST</th>
                <th>PWD</th>
              </tr>
            </thead>
            <tbody>
              {cutoffData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.course}</td>
                  <td>{row.open}</td>
                  <td>{row.general}</td>
                  <td>{row.ews}</td>
                  <td>{row.obc}</td>
                  <td>{row.sc}</td>
                  <td>{row.st}</td>
                  <td>{row.pwd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cutoff;
