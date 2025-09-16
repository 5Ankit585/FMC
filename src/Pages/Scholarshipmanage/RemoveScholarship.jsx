import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function RemoveScholarship() {
  const [scholarships, setScholarships] = useState([]);
  const location = useLocation();

  // Fetch scholarships from backend on load
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/scholarships");
        if (!res.ok) {
          throw new Error("Failed to fetch scholarships");
        }
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        toast.error("Failed to load scholarships. Please try again.");
      }
    };

    fetchScholarships();
  }, []);

  // Delete scholarship
  const handleDelete = async (id, name) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the scholarship "${name}"? This action cannot be undone.`
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/scholarships/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete scholarship");
      }

      // Update local state to remove the deleted scholarship
      setScholarships(scholarships.filter((s) => s.id !== id));
      toast.success("Scholarship deleted successfully!");
    } catch (err) {
      console.error("Error deleting scholarship:", err);
      toast.error(err.message || "Error deleting scholarship. Please try again.");
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
                Remove Scholarship
              </h1>
              <p className="text-gray-600">Select scholarships to remove from the system.</p>
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
                  <p className="text-gray-500 text-lg">No scholarships available to remove.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scholarships.map((s) => (
                    <div
                      key={s.id}
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
                            <p className="text-gray-600">{s.tags.join(", ") || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Benefits:</span>
                            <p className="text-blue-600 font-semibold">{s.benefits || "—"}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Status:</span>
                            <p className="text-gray-600">{s.status || "—"}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 ml-4 flex-shrink-0 shadow-md hover:shadow-lg"
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
    </div>
  );
}