import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SavedScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [savedIds, setSavedIds] = useState(() => {
    const saved = localStorage.getItem("savedScholarships");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarships();
  }, []);

  const savedList = scholarships.filter((s) => savedIds.includes(s._id));

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("savedScholarships", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div>
      
      <div className="px-4 md:px-20 py-6">
        <h1 className="text-2xl font-bold mb-6">Saved Scholarships</h1>
        {savedList.length === 0 ? (
          <p>You have no saved scholarships.</p>
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
                    savedIds.includes(sch._id) ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => toggleSave(sch._id)}
                >
                  {savedIds.includes(sch._id) ? "Saved" : "Save"}
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