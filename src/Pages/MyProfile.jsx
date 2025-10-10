// src/pages/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />
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

      </div>
    </div>
    </>
  );
};

export default MyProfile;