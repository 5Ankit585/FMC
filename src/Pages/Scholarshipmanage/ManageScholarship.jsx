import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ManageScholarship() {
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    category: "",
    income: "",
    educationLevel: "",
    benefits: "",
    deadline: "",
    status: "",
    description: "",
    eligibility: "",
    type: "",
    region: "",
    generalQuota: "",
  });

  const [scholarships, setScholarships] = useState([]);

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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add scholarship
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct tags from category, income, educationLevel
    const tags = [];
    if (formData.category) tags.push(formData.category);
    if (formData.income) tags.push(`≤${formData.income} income`);
    if (formData.educationLevel) tags.push(formData.educationLevel);

    const newScholarship = {
      name: formData.name,
      provider: formData.provider,
      tags,
      benefits: formData.benefits,
      deadline: formData.deadline,
      status: formData.status,
      description: formData.description,
      eligibility: formData.eligibility,
      type: formData.type,
      region: formData.region,
      generalQuota: formData.generalQuota,
    };

    try {
      const res = await fetch("http://localhost:5000/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScholarship),
      });

      if (!res.ok) {
        throw new Error("Failed to save scholarship");
      }

      const savedScholarship = await res.json();

      // Add saved data to local state
      setScholarships([...scholarships, savedScholarship]);

      // Reset form
      setFormData({
        name: "",
        provider: "",
        category: "",
        income: "",
        educationLevel: "",
        benefits: "",
        deadline: "",
        status: "",
        description: "",
        eligibility: "",
        type: "",
        region: "",
        generalQuota: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error saving scholarship");
    }
  };

  // Delete scholarship
  const handleDelete = (id) => {
    setScholarships(scholarships.filter((s) => s.id !== id));
  };

  const location = useLocation(); // For active link highlighting

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
                Manage Scholarships
              </h1>
              <p className="text-gray-600">Add, view, and manage scholarships efficiently.</p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Scholarship</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter scholarship name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <input
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    placeholder="e.g., Central Govt"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Category</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                    <option value="General">General</option>
                    <option value="Minority">Minority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Income Limit</label>
                  <select
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Income Limit</option>
                    <option value="3L">3L</option>
                    <option value="5L">5L</option>
                    <option value="7L">7L</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Level</option>
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="UG/PG">UG/PG</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                  <input
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="e.g., ₹50,000 / year"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="e.g., 15 Sept (soon)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                  <textarea
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    placeholder="e.g., Undergraduate students with GPA > 3.0"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Type</option>
                    <option value="Merit">Merit</option>
                    <option value="Need">Need</option>
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State / Region</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Region</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">General Quota</label>
                  <select
                    name="generalQuota"
                    value={formData.generalQuota}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Quota</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Add Scholarship
                  </button>
                </div>
              </form>
            </div>

            {/* Scholarships List Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Scholarships List</h2>
              {scholarships.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No scholarships added yet. Start by adding one above!</p>
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
                      <button
                        onClick={() => handleDelete(s.id)}
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