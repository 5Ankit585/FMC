// src/pages/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth"; // ✅ Import Firebase Auth
import { doc, getDoc, updateDoc } from "firebase/firestore"; // ✅ Import for Firestore (with updateDoc)
import { db } from "../firebase"; // ✅ Import db
import Navbar from "../components/Navbar";

const MyProfile = () => {
  const navigate = useNavigate();
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Use Firebase Auth for Firestore userId
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const firebaseUid = currentUser?.uid;

  // ✅ Use localStorage for backend MongoDB userId
  const mongodbId = localStorage.getItem("userId");

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

  // Base API URL
  const API_BASE = "http://localhost:5000/api";

  // Validate MongoDB ObjectId format
  const isValidMongoId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // Fetch profile data with Firebase + Backend sync
  useEffect(() => {
    const fetchProfile = async () => {
      // ✅ Check valid Firebase UID for Firestore
      if (!firebaseUid) {
        setError("No valid user logged in via Firebase. Please log in again.");
        setLoading(false);
        return;
      }

      // ✅ Check valid MongoDB ID for backend
      if (!mongodbId || !isValidMongoId(mongodbId)) {
        setError("Invalid backend user ID. Please log in again.");
        localStorage.removeItem("userId"); // Clear invalid
        setLoading(false);
        return;
      }

      console.log("Fetching profile for Firebase UID:", firebaseUid, "MongoDB ID:", mongodbId); // ✅ Debug log

      try {
        setLoading(true);
        setError("");

        // 🔹 Try Firestore first (using Firebase UID)
        let firestoreData = {};
        try {
          const docRef = doc(db, "students", firebaseUid);
          const snap = await getDoc(docRef);
          firestoreData = snap.exists() ? snap.data() : {};
        } catch (firestoreErr) {
          console.warn("Firestore fetch failed:", firestoreErr);
        }

        // 🔹 Try backend API (using MongoDB ID)
        let backendData = {};
        try {
          const response = await axios.get(`${API_BASE}/profile/${mongodbId}`);
          backendData = response.data;
        } catch (backendErr) {
          console.error("Backend fetch failed:", backendErr);
          if (backendErr.response?.status === 400) {
            setError("Backend rejected user ID format. Please log in again.");
            localStorage.removeItem("userId");
          } else {
            setError("Failed to fetch profile from backend.");
          }
        }

        // 🔹 Merge Firestore + Backend data
        const userData = {
          name: firestoreData.name || backendData.name || "",
          email: backendData.email || firestoreData.email || "",
          phone: backendData.phone || firestoreData.phone || "",
          address: backendData.address || firestoreData.address || "",
          pincode: backendData.pincode || firestoreData.pincode || "",
          university: backendData.university || firestoreData.university || "",
          course: backendData.course || firestoreData.course || "",
          branch: backendData.branch || firestoreData.branch || "",
          academicDetails: backendData.academicDetails || firestoreData.academicDetails || "",
          counsellingBook: backendData.counsellingBook || firestoreData.counsellingBook || "",
        };
        setFormData(userData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [firebaseUid, mongodbId, API_BASE]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const validateForm = () => {
    const requiredFields = ["name", "email", "phone", "pincode", "address"];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return false;
    }
    return true;
  };

  // ✅ Robust handleSave with Firestore + Backend sync
  const handleSave = async () => {
    if (!validateForm()) return;

    if (!firebaseUid || !mongodbId || !isValidMongoId(mongodbId)) {
      setError("Invalid user session. Please log in again.");
      return;
    }

    console.log("Saving profile for Firebase UID:", firebaseUid, "MongoDB ID:", mongodbId); // ✅ Debug log

    try {
      setSaving(true);
      setError("");
      setSuccessMessage(""); // Clear previous success

      // 🔹 Update backend first (using MongoDB ID)
      let backendData = {};
      try {
        const response = await axios.put(`${API_BASE}/profile/${mongodbId}`, formData);
        backendData = response.data;
      } catch (backendErr) {
        console.error("Backend save failed:", backendErr);
        if (backendErr.response?.status === 400) {
          setError("Backend rejected user ID format. Please log in again.");
          localStorage.removeItem("userId");
        } else {
          throw new Error("Failed to update backend profile.");
        }
      }

      // 🔹 Update formData with backend response
      const updatedData = { ...formData, ...backendData };
      setFormData(updatedData);

      // 🔹 Sync name to Firestore for Navbar (using Firebase UID)
      try {
        const docRef = doc(db, "students", firebaseUid);
        await updateDoc(docRef, { name: updatedData.name });
        console.log("Firestore sync successful");
      } catch (firestoreErr) {
        console.warn("Firestore sync failed (non-critical):", firestoreErr);
        // Don't throw—saving to backend is primary
      }

      setEditMode(false);
      setSuccessMessage("Profile updated successfully! ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      const msg = error.message || "Failed to update profile. Please try again.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // ✅ Clear backend ID
    auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#1f2230]">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!firebaseUid || !mongodbId || !isValidMongoId(mongodbId)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#1f2230]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile Not Available</h2>
          <p className="mb-4">Invalid session. Please log in to view your profile.</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md text-white font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1f2230] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Messages */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-xl">
              {successMessage}
            </div>
          )}

          {/* Basic Profile Card */}
          <div className="bg-[#2b2f3a] border border-white/10 text-white rounded-xl shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {formData.name.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{formData.name || "Unnamed User"}</h2>
                  <p className="text-gray-400">{formData.email || "No email"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {!editMode ? (
                  <>
                    <button 
                      onClick={() => setEditMode(true)}
                      className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white font-semibold transition-colors disabled:opacity-50"
                      disabled={loading || saving}
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold transition-colors mr-2 disabled:opacity-50"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
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
                  <p className="text-white font-medium">{formData.name || "-"}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <p className="text-white font-medium">{formData.email || "-"}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Phone Number</label>
                  <p className="text-white font-medium">{formData.phone || "-"}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Pincode</label>
                  <p className="text-white font-medium">{formData.pincode || "-"}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-400">Address</label>
                  <p className="text-white font-medium">{formData.address || "-"}</p>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter full name"
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
                    placeholder="Enter email address"
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
                    placeholder="Enter phone number"
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
                    placeholder="Enter 6-digit pincode"
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
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Academic Card */}
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
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">University</label>
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
                  <label className="block text-sm font-medium text-white">Course</label>
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
                  <label className="block text-sm font-medium text-white">Branch</label>
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
    </>
  );
};

export default MyProfile;