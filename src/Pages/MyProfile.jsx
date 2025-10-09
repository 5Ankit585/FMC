// src/pages/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const { id: paramId } = useParams(); // Get the user ID from the URL
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    university: "",
    course: "",
    branch: "",
    academicDetails: "",
    counsellingBook: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Use paramId first, else fallback to logged-in userId from localStorage
  const userId = paramId || localStorage.getItem("userId");

  const universities = [
    "Delhi University",
    "Jawaharlal Nehru University", 
    "IIT Bombay",
    "IIT Delhi",
    "IIM Ahmedabad",
    "Anna University",
    "Amity University",
  ];

  const courses = ["B.Tech", "MBA", "B.Sc", "BBA", "M.Tech", "MCA", "Ph.D"];
  const branches = [
    "Computer Science",
    "Electronics", 
    "Mechanical Engineering",
    "Civil Engineering",
    "Marketing",
    "Finance",
    "Human Resources",
  ];

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);

        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/profile/${userId}`, formData);
      setEditMode(false);
      alert("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile ❌");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1f2230] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Basic Profile Card */}
        <div className="bg-[#2b2f3a] border border-white/10 text-white rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                <p className="text-gray-400">{formData.email}</p>
              </div>
            </div>
            
            {/* Edit/Save Buttons */}
            <div className="flex items-center space-x-3">
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white font-semibold transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold transition-colors mr-2"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {!editMode ? (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Full Name</label>
                <p className="text-white font-medium">{formData.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <p className="text-white font-medium">{formData.email}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Phone Number</label>
                <p className="text-white font-medium">{formData.phone}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Pincode</label>
                <p className="text-white font-medium">{formData.pincode}</p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-gray-400">Address</label>
                <p className="text-white font-medium">{formData.address}</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Form Inputs for editMode */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-white">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Academic Card - same dynamic logic applies */}
        <div className="bg-[#2b2f3a] border border-white/10 text-white rounded-xl shadow-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Academic Information</span>
          </h3>

          {!editMode ? (
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">University</label>
                <p className="text-white font-medium">{formData.university || "-"}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Course</label>
                <p className="text-white font-medium">{formData.course || "-"}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Branch</label>
                <p className="text-white font-medium">{formData.branch || "-"}</p>
              </div>
              <div className="space-y-1 sm:col-span-3">
                <label className="text-sm font-medium text-gray-400">Academic Details</label>
                <p className="text-white font-medium">{formData.academicDetails || "-"}</p>
              </div>
              <div className="space-y-1 sm:col-span-3">
                <label className="text-sm font-medium text-gray-400">Counselling Book</label>
                <p className="text-white font-medium">{formData.counsellingBook || "-"}</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-6">
              {/* Academic edit inputs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">University *</label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select University</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Course *</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Branch *</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-white">Academic Details</label>
                <textarea
                  name="academicDetails"
                  value={formData.academicDetails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Enter academic details..."
                />
              </div>
              <div className="sm:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-white">Counselling Book</label>
                <input
                  type="text"
                  name="counsellingBook"
                  value={formData.counsellingBook}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter counselling book..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;