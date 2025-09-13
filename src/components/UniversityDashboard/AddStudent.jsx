import React, { useState } from "react";
import "./AddStudent.css";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    nationality: "",
    course: "",
    enrollmentDate: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Student Added:\n" + JSON.stringify(formData, null, 2));
    // Later: send formData to backend
  };

  return (
    <div className="ud-page">
      <h2>Add New Student</h2>
      <form className="form-card" onSubmit={handleSubmit}>

        {/* 🔹 Personal Info */}
        <h3>Personal Information</h3>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Date of Birth
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label>
        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Address
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Nationality
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
        </label>

        {/* 🔹 Academic Info */}
        <h3>Academic Information</h3>
        <label>
          Course
          <input type="text" name="course" value={formData.course} onChange={handleChange} />
        </label>
        <label>
          Enrollment Date
          <input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} />
        </label>

        {/* 🔹 Guardian Info */}
        <h3>Guardian Information</h3>
        <label>
          Father's Name
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
        </label>
        <label>
          Mother's Name
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
        </label>
        <label>
          Guardian Phone
          <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} />
        </label>
        <label>
          Emergency Contact
          <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
        </label>

        {/* 🔹 Additional Info */}
        <h3>Additional Info</h3>
        <label>
          Blood Group
          <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
        </label>
        <label>
          Allergies
          <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} />
        </label>
        <label>
          Hobbies / Interests
          <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
        </label>

        <button type="submit" className="primary-btn">Save Student</button>
      </form>

      <button
        className="link-btn"
        onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "dashboard" }))}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
