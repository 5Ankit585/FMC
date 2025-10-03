// src/pages/MyProfile.jsx
import React, { useState } from "react";

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City",
    pincode: "12345",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="min-h-screen bg-[#1f2230] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-[#2b2f3a] border border-white/10 text-white rounded-xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        {editMode ? (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 rounded bg-[#1f2230] border border-gray-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 rounded bg-[#1f2230] border border-gray-600"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 rounded bg-[#1f2230] border border-gray-600"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 rounded bg-[#1f2230] border border-gray-600"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full p-2 rounded bg-[#1f2230] border border-gray-600"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 px-4 py-2 rounded text-white font-semibold"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 px-4 py-2 rounded text-white font-semibold ml-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>Pincode:</strong> {formData.pincode}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;