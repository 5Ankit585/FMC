// Pages/SavedScholarships.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SavedScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Quick fix: Get user from individual localStorage keys
  const user = {
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  useEffect(() => {
    const fetchSavedScholarships = async () => {
      if (!user?.userId) {
        setError("Please log in to view saved scholarships.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/savedScholarships/${user.userId}`);
        if (!res.ok) throw new Error("Failed to fetch saved scholarships");
        const { savedScholarships } = await res.json();
        setScholarships(savedScholarships);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedScholarships();
  }, [user?.userId]);

  const toggleSave = async (scholarshipId) => {
    if (!user?.userId) {
      alert("Please log in to save scholarships.");
      return;
    }

    try {
      const method = scholarships.some(s => s._id === scholarshipId) ? "DELETE" : "POST";
      const res = await fetch(
        `http://localhost:5000/api/savedScholarships/${user.userId}/${scholarshipId}`,
        { method }
      );
      if (!res.ok) throw new Error("Failed to update saved scholarships");

      const { savedScholarships } = await res.json();
      // Update local state: remove if unsaving
      setScholarships(prev => 
        prev.filter(s => s._id !== scholarshipId)
      );
    } catch (err) {
      console.error(err);
      alert("Error updating saved scholarships.");
    }
  };

  if (loading) return <div className="px-4 md:px-20 py-6">Loading saved scholarships...</div>;
  if (error) return <div className="px-4 md:px-20 py-6 text-red-500">{error}</div>;

  const savedList = scholarships; // Already filtered by user

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-20 py-6">
        <h1 className="text-2xl font-bold mb-6">Saved Scholarships</h1>
        {savedList.length === 0 ? (
          <p>You have no saved scholarships. <a href="/scholarship" className="text-blue-500 underline">Browse scholarships</a>.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map((sch) => (
              <div key={sch._id} className="border rounded-lg p-4 shadow relative">
                <h2 className="font-semibold">{sch.name}</h2>
                <p className="text-sm">{sch.universityId?.instituteName || "Unknown University"}</p>
                <p className="text-gray-600">
                  {sch.provider ? `Provider: ${sch.provider}` : "No description available"}
                </p>

                <button
                  className={`absolute top-3 right-3 p-1 rounded-full ${
                    savedList.some(s => s._id === sch._id) ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => toggleSave(sch._id)}
                >
                  Saved
                </button>

                <button
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  onClick={() => navigate(`/scholarship/${sch._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}