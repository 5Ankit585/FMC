import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

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

  // Handle delete scholarship
  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this scholarship?")) {
    try {
      const res = await fetch(`http://localhost:5000/api/scholarships/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setScholarships(scholarships.filter((s) => s._id !== id));
      } else {
        console.error("Delete failed:", data);
        alert(data.error || "Failed to delete scholarship.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete scholarship.");
    }
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex">
      {/* Sidebar */}
      <Sidebar location={location} />

      {/* Main Content */}
      <div className="flex-1 ml-64 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                View Scholarships
              </h1>
              <p className="text-gray-600">Browse all available scholarships.</p>
            </div>

            {/* Scholarships List */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Scholarships List</h2>
              {scholarships.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No scholarships available yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scholarships.map((s) => (
                    <div
                      key={s._id} // Changed from s.id to s._id to match MongoDB convention
                      className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 flex justify-between items-start bg-gray-50"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{s.name}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{s.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Provider:</span>
                            <p className="text-gray-600">{s.provider || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Tags:</span>
                            <p className="text-gray-600">{s.tags?.join(", ") || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Benefits:</span>
                            <p className="text-blue-600 font-semibold">{s.benefits || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Status:</span>
                            <p className="text-gray-600">{s.status || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Eligibility:</span>
                            <p className="text-gray-600">{s.eligibility || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Type:</span>
                            <p className="text-gray-600">{s.type || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Region:</span>
                            <p className="text-gray-600">{s.region || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">General Quota:</span>
                            <p className="text-gray-600">{s.generalQuota || "—"}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="font-medium text-gray-700">Deadline:</span>
                          <span className="text-red-600 font-semibold ml-1">
                            {s.deadline || "—"}
                          </span>
                        </div>
                      </div>
                      {/* Delete Button */}
                      <div className="ml-4">
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}