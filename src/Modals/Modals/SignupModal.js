import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput.jsx";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (files?.[0] || null) : value,
    }));
  };
  
  async function apiSignup(formDataObj) {
    const res = await fetch("http://localhost:5005/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ tell server it's JSON
      },
      body: JSON.stringify(formDataObj), // ✅ send as JSON
    });
  
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      try {
        const j = JSON.parse(text || "{}");
        throw new Error(j.error || j.message || `Signup failed (${res.status})`);
      } catch {
        throw new Error(text || `Signup failed (${res.status})`);
      }
    }
    return text ? JSON.parse(text) : null;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      await apiSignup(formData);
      setInfo("Student signed up successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        pincode: "",
      });
    } catch (error) {
      console.error("Signup Error:", error);
      setErr(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-600 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left welcome panel */}
        <div className="hidden lg:flex relative overflow-hidden rounded-2xl bg-gray-600/10 border border-yellow-400/30 text-yellow-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300/20 via-transparent to-transparent" />
          <div className="relative p-10 flex flex-col justify-center">
            <div className="h-14 w-14 bg-gray-400/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-yellow-500" viewBox="0 0 24 24" fill="none">
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Create your student account</h1>
            <p className="text-yellow-500 mt-2 leading-relaxed">
              Sign up to manage applications, upload documents, and access personalized counselling resources.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-yellow-500">
              <li className="flex items-center gap-2">
                <CheckIcon />
                Secure authentication and file uploads
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Track academic details and preferences
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Support from our counselling team
              </li>
              <li className="flex text-bold text-xl  items-center gap-2 ml-20">
                Or
              </li>
              <li>
          <Link to="/signup/university" className="flex text-bold text-xl  items-center gap-2 hover:text-blue-600 hover:underline">
          
            SignUp as university
           </Link>
         </li>
         <li>
           <Link to="/signup" className="flex  text-bold text-xl  items-center gap-2 hover:text-blue-600 hover:underline">

             SignUp as student
          </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right form card */}
        <div className="backdrop-blur-xl bg-white/80 border border-yellow-400/40 text-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Student Signup</h2>
            <p className="text-sm text-gray-800/80 mt-1">
              Enter details to get started. Fields marked with * are required.
            </p>
          </div>

          {err && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-700 px-3 py-2 text-sm">
              {err}
            </div>
          )}
          {info && (
            <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-700 px-3 py-2 text-sm">
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name *"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="bg-white border border-gray-300 focus:ring-yellow-400"
                required
              />
              <FormInput
                label="Mobile No. *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your mobile number"
                className="bg-white border border-gray-300 focus:ring-yellow-400"
                required
              />
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Email ID *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-white border border-gray-300 focus:ring-yellow-400"
                required
              />
              <FormInput
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="bg-white border border-gray-300 focus:ring-yellow-400"
                required
              />
            </div>

            {/* Address & Pincode */}
            <FormInput
              label="Address *"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="bg-white border border-gray-300 focus:ring-yellow-400"
              required
            />
            <FormInput
              label="Pincode *"
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              className="bg-white border border-gray-300 focus:ring-yellow-400"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-Gray-900 font-semibold py-2.5 rounded-lg shadow-md transition"
            >
              {loading ? "Submitting..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;

function Dropdown({ label, name, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}



function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
