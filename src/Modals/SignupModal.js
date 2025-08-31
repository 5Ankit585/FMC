import React, { useState } from "react";
import FormInput from "../components/FormInput";
import "./StudentSignup.css";


const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    university: "",
    course: "",
    branch: "",
    academicDetails: "",
    documents: null,
    counsellingBook: "",
    scholarshipDoc: null,
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

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

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (files && files[0]) : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErr("");
  setInfo("");
  setLoading(true);

  try {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    const res = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Signup failed");

    setInfo("Student signed up successfully!");
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      pincode: "",
      university: "",
      course: "",
      branch: "",
      academicDetails: "",
      documents: null,
      counsellingBook: "",
      scholarshipDoc: null,
    });
  } catch (error) {
    setErr(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="student-signup-container">
      <div className="signup-grid">
        {/* Left welcome panel */}
        <div className="welcome-panel">
          <div className="welcome-overlay"></div>
          <div className="welcome-content">
            <div className="welcome-icon-container">
              <svg className="welcome-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="welcome-title">Create your student account</h1>
            <p className="welcome-text">
              Sign up to manage your applications, upload documents, and access personalized counselling resources.
            </p>
            <ul className="welcome-list">
              <li className="welcome-list-item">
                <CheckIcon />
                Secure authentication and cloud storage
              </li>
              <li className="welcome-list-item">
                <CheckIcon />
                Track academic details and preferences
              </li>
              <li className="welcome-list-item">
                <CheckIcon />
                Fast support from our counselling team
              </li>
            </ul>
            <div className="welcome-footer">
              <div className="welcome-divider"></div>
              <p className="welcome-footer-text">
                By creating an account, you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="form-card">
          <div className="form-header">
            <h2 className="form-title">Student Signup</h2>
            <p className="form-subtitle">
              Enter your details to get started. Fields marked with an asterisk (*) are required.
            </p>
          </div>

          {err && (
            <div className="error-message">
              {err}
            </div>
          )}
          {info && (
            <div className="success-message">
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            {/* Name & Phone */}
            <div className="form-grid">
              <FormInput
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="form-input"
                required
              />
              <FormInput
                label="Mobile No. *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your mobile number"
                className="form-input"
                required
              />
            </div>

            {/* Email & Password */}
            <div className="form-grid">
              <FormInput
                label="Email ID *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-input"
                required
              />
              <FormInput
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="form-input"
                required
              />
            </div>

            {/* Address & Pincode */}
            <FormInput
              label="Address *"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="form-input"
              required
            />

            <FormInput
              label="Pincode *"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              className="form-input"
              required
            />

            {/* University & Course */}
            <div className="form-grid">
              <div>
                <label className="form-label">University *</label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select University</option>
                  {universities.map((uni, idx) => (
                    <option key={idx} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Course *</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="form-label">Branch *</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Branch</option>
                {branches.map((branch, idx) => (
                  <option key={idx} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Details */}
            <div>
              <label className="form-label">Academic Details</label>
              <textarea
                name="academicDetails"
                value={formData.academicDetails}
                onChange={handleChange}
                placeholder="Previous academic records, grades, etc."
                rows="3"
                className="form-textarea"
              ></textarea>
            </div>

            {/* Uploads */}
            <div className="form-grid">
              <div>
                <label className="form-label">Documents (PDF)</label>
                <input
                  type="file"
                  name="documents"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="form-file-input"
                />
                <p className="form-file-note">Max 10MB. Combine multiple pages into one PDF if possible.</p>
              </div>

              <FormInput
                label="Counselling Book"
                name="counsellingBook"
                value={formData.counsellingBook}
                onChange={handleChange}
                placeholder="Enter counselling book details"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Scholarship Document (PDF)</label>
              <input
                type="file"
                name="scholarshipDoc"
                accept="application/pdf"
                onChange={handleChange}
                className="form-file-input"
              />
              <p className="form-file-note">Optional. Upload only if applicable.</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="form-submit-button"
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

/* Icons */
function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}