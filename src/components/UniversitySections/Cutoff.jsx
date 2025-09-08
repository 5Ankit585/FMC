import React, { useEffect, useState } from "react";
import "./Cutoff.css";

const Cutoff = ({ universityId }) => {
  const [cutoffData, setCutoffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCutoffs = async () => {
      try {
        if (!universityId) {
          console.warn("⚠️ No universityId provided to Cutoff component");
          return;
        }

        setLoading(true);
        setError(null);

        console.log("🎯 Fetching cutoffs for universityId:", universityId);

        const res = await fetch(
          `http://localhost:5000/api/cutoff/${universityId}/cutoffs`
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        console.log("📊 Cutoff API response:", data);

        if (data.success) {
          setCutoffData(data.cutoffs || []);
        } else {
          setError(data.message || "Failed to fetch cutoff data");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCutoffs();
  }, [universityId]);

  return (
    <div className="cutoff-container">
      <div className="cutoff-header">
        <h2>Cutoff for Year 2024</h2>
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
