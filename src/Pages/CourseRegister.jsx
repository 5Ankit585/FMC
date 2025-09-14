import React, { useState } from "react";
import "./CourseRegister.css";

export default function CourseRegister() {
  const [specializationImages, setSpecializationImages] = useState([]);
  const [topInstituteImages, setTopInstituteImages] = useState([]);
  const [formData, setFormData] = useState({
    courseTitle: "",
    shortName: "",
    description: "",
    duration: "",
    fees: "",
    mode: "",
    level: "",
    highlights: "",
    internship: "",
    placement: "",
    specializations: "",
    eligibility: "",
    admissionProcess: "",
    curriculum: "",
    topInstitutes: "",
    careerRoles: "",
    scholarships: "",
    abroadOptions: "",
    faqs: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files).map(f => ({ file: f, description: "" }));
    if (type === "specialization") setSpecializationImages(files);
    if (type === "topInstitute") setTopInstituteImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append specialization images + descriptions
      specializationImages.forEach((item) => {
        data.append("specializationImages", item.file);
        data.append("specializationDescriptions", item.description);
      });

      // Append top institute images + descriptions
      topInstituteImages.forEach((item) => {
        data.append("topInstituteImages", item.file);
        data.append("topInstituteDescriptions", item.description);
      });

      // Fetch request
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Failed to save course");
      }

      const responseData = await res.json();
      console.log("✅ Course saved:", responseData);
      alert("✅ Course registered successfully!");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong while saving the course!");
    }
  };

  return (
    <div className="course-register-container">
      <div className="course-card">
        <h2 className="course-title">Register a New Course</h2>
        <form onSubmit={handleSubmit} className="course-form">
          {/* Basic Info */}
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="courseTitle"
              placeholder="e.g. Business Administration (BBA)"
              value={formData.courseTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Short Name</label>
            <input
              type="text"
              name="shortName"
              placeholder="e.g. BBA"
              value={formData.shortName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Brief overview of the course"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Key Details */}
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 3 years"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fees (Avg per year)</label>
            <input
              type="text"
              name="fees"
              placeholder="e.g. ₹1.5–4 Lakh/year"
              value={formData.fees}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mode</label>
            <input
              type="text"
              name="mode"
              placeholder="e.g. Full-time"
              value={formData.mode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Level</label>
            <input
              type="text"
              name="level"
              placeholder="e.g. Undergraduate"
              value={formData.level}
              onChange={handleChange}
            />
          </div>

          {/* Highlights */}
          <div className="form-group">
            <label>Key Highlights</label>
            <textarea
              name="highlights"
              placeholder="Enter highlights separated by commas"
              value={formData.highlights}
              onChange={handleChange}
            />
          </div>

          {/* Internship & Placement */}
          <div className="form-group">
            <label>Internship</label>
            <input
              type="text"
              name="internship"
              placeholder="e.g. 8–12 weeks"
              value={formData.internship}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Placement</label>
            <input
              type="text"
              name="placement"
              placeholder="e.g. Placement assistance available"
              value={formData.placement}
              onChange={handleChange}
            />
          </div>

          {/* Specializations */}
          <div className="form-group">
            <label>Specializations</label>
            <textarea
              name="specializations"
              placeholder="List of specialization options"
              value={formData.specializations}
              onChange={handleChange}
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, "specialization")}
            />
            {specializationImages.length > 0 && specializationImages.map((item, idx) => (
              <div key={idx}>
                {item?.file && <p>{item.file.name}</p>}
                <input
                  type="text"
                  placeholder="Description for this image"
                  value={item?.description || ""}
                  onChange={(e) => {
                    const newImages = [...specializationImages];
                    newImages[idx].description = e.target.value;
                    setSpecializationImages(newImages);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Eligibility & Admission */}
          <div className="form-group">
            <label>Eligibility</label>
            <textarea
              name="eligibility"
              placeholder="Eligibility criteria"
              value={formData.eligibility}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Admission Process</label>
            <textarea
              name="admissionProcess"
              placeholder="Steps for admission"
              value={formData.admissionProcess}
              onChange={handleChange}
            />
          </div>

          {/* Curriculum */}
          <div className="form-group">
            <label>Curriculum Snapshot</label>
            <textarea
              name="curriculum"
              placeholder="Year-wise curriculum details"
              value={formData.curriculum}
              onChange={handleChange}
            />
          </div>

          {/* Top Institutes */}
          <div className="form-group">
            <label>Top Institutes</label>
            <textarea
              name="topInstitutes"
              placeholder="Colleges/universities offering this course"
              value={formData.topInstitutes}
              onChange={handleChange}
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, "topInstitute")}
            />
            {topInstituteImages.length > 0 && topInstituteImages.map((item, idx) => (
              <div key={idx}>
                {item?.file && <p>{item.file.name}</p>}
                <input
                  type="text"
                  placeholder="Description for this image"
                  value={item?.description || ""}
                  onChange={(e) => {
                    const newImages = [...topInstituteImages];
                    newImages[idx].description = e.target.value;
                    setTopInstituteImages(newImages);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Career */}
          <div className="form-group">
            <label>Career Opportunities</label>
            <textarea
              name="careerRoles"
              placeholder="Popular roles after graduation"
              value={formData.careerRoles}
              onChange={handleChange}
            />
          </div>

          {/* Scholarships */}
          <div className="form-group">
            <label>Scholarships</label>
            <textarea
              name="scholarships"
              placeholder="Scholarship & financial aid options"
              value={formData.scholarships}
              onChange={handleChange}
            />
          </div>

          {/* Abroad Options */}
          <div className="form-group">
            <label>Study Abroad & Exchange</label>
            <textarea
              name="abroadOptions"
              placeholder="Global exposure opportunities"
              value={formData.abroadOptions}
              onChange={handleChange}
            />
          </div>

          {/* FAQs */}
          <div className="form-group">
            <label>FAQs</label>
            <textarea
              name="faqs"
              placeholder="Common student queries"
              value={formData.faqs}
              onChange={handleChange}
            />
          </div>

          {/* Apply Link */}
          <div className="form-group">
            <label>Apply Link</label>
            <input
              type="url"
              name="applyLink"
              placeholder="https://example.com/apply"
              value={formData.applyLink}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="course-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}