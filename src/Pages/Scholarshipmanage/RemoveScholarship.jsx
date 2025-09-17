import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "./RemoveScholarship.css"; // Import CSS

export default function RemoveScholarship() {
  const [scholarships, setScholarships] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        toast.error("Failed to load scholarships. Please try again.");
      }
    };
    fetchScholarships();
  }, []);

  const handleDelete = async (_id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the scholarship "${name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/scholarships/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete scholarship");

      setScholarships(scholarships.filter((s) => s._id !== _id));
      toast.success("Scholarship deleted successfully!");
    } catch (err) {
      console.error("Error deleting scholarship:", err);
      toast.error(err.message || "Error deleting scholarship. Please try again.");
    }
  };

  return (
    <div className="remsch-container">
      <Sidebar location={location} />

      <div className="remsch-main">
        <div className="remsch-inner container">
          <div className="remsch-header">
            <h1 className="remsch-title">Remove Scholarship</h1>
            <p className="remsch-subtitle">
              Select scholarships to remove from the system.
            </p>
          </div>

          {/* Scholarships List */}
          <div className="remsch-card remsch-list-card">
            <h2 className="remsch-card-title">Scholarships List</h2>

            {scholarships.length === 0 ? (
              <div className="remsch-empty">
                <p>No scholarships available to remove.</p>
              </div>
            ) : (
              <div className="remsch-list">
                {scholarships.map((s) => (
                  <div key={s._id} className="remsch-item">
                    <div className="remsch-item-left">
                      <h3 className="remsch-item-title">{s.name}</h3>
                      <p className="remsch-item-desc">{s.description}</p>
                      <div className="remsch-item-details">
                        <div>
                          <span>Provider:</span> {s.provider || "—"}
                        </div>
                        <div>
                          <span>Tags:</span> {s.tags?.join(", ") || "—"}
                        </div>
                        <div>
                          <span>Benefits:</span> <span className="remsch-benefits">{s.benefits || "—"}</span>
                        </div>
                        <div>
                          <span>Status:</span> {s.status || "—"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(s._id, s.name)}
                      className="remsch-delete-btn"
                    >
                      Delete
                    </button>
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
