import React, { useState } from "react";
import "./UniversityRegister.css";
import Navbar from "../components/Navbar";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [branches, setBranches] = useState([]); // For branch-wise placements

  const totalSteps = 9;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (name === "logo" || name === "bannerImage") {
      setFiles({
        ...files,
        [name]: uploadedFiles[0], // single file
      });
    } else {
      setFiles({
        ...files,
        [name]: [...(files[name] || []), ...Array.from(uploadedFiles)],
      });
    }
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFacilities([...selectedFacilities, value]);
    } else {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== value));
      // Remove corresponding description if unchecked
      setFormData((prev) => {
        const newData = { ...prev };
        delete newData[`facility_${value}_desc`];
        return newData;
      });
    }
  };

  const addBranch = () => {
    setBranches([...branches, { name: "", avgLPA: "", highestLPA: "" }]);
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = [...branches];
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const next = () => {
    // Basic validation examples (expand as needed)
    if (step === 1) {
      if (files.bannerImages?.length < 3) {
        alert("Please upload at least 3 banner images.");
        return;
      }
    }
    if (step === 2) {
      if (files.aboutImages?.length < 5) {
        alert("Please upload at least 5 about images.");
        return;
      }
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      // Append text fields
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, val);
      });
      // Append branches as JSON
      payload.append("branches", JSON.stringify(branches));
      // Append selected facilities (descriptions are already in formData)
      payload.append("facilities", JSON.stringify(selectedFacilities));
      // Append files
      Object.entries(files).forEach(([key, fileList]) => {
        if (Array.isArray(fileList)) {
          fileList.forEach((file) => payload.append(key, file));
        } else {
          payload.append(key, fileList);
        }
      });

      const res = await fetch("http://localhost:5000/api/university-registration", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Registration submitted successfully!");
        setStep(1);
        setFormData({});
        setFiles({});
        setSelectedFacilities([]);
        setBranches([]);
      } else {
        alert("❌ Error: " + (data.error || "Submission failed"));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Server error, check console");
    }
  };

  // List of available facilities (hardcoded, icons in FE)
  const facilityOptions = [
    "hostel",
    "library",
    "labs",
    "researchCenters",
    "sports",
    "cafeteria",
    "auditorium",
    "medical",
    "transport",
    "itFacilities",
    "placementCell",
    "internshipTieups",
  ];

  return (
    <div className="univ-app-container">
      <Navbar />
      <header className="univ-header">
        <h1 className="univ-header-title">University Registration</h1>
        <p className="univ-header-subtitle">Complete all 9 steps below</p>
      </header>

      {/* Stepper */}
      <div className="univ-stepper">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`univ-stepper-circle ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "completed" : ""}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <main className="univ-main-container">
        <form className="univ-multi-step-form wide-form" onSubmit={handleSubmit}> {/* Added wide-form for 90% width */}
          {/* -------------------- Step 1: Basic Info + Hero Section -------------------- */}
          {step === 1 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 1: Basic Info + Hero Section</h3>
              <input
                name="instituteName"
                placeholder="Institute Name"
                onChange={handleChange}
                title="Enter the full name of the institute. This will appear in the hero section."
              />
              <select
                name="type"
                onChange={handleChange}
                title="Select the type of institution. Used in hero display."
              >
                <option value="">Select Type</option>
                <option>University</option>
                <option>College</option>
                <option>Institute</option>
              </select>
              <input
                name="year"
                placeholder="Establishment Year"
                onChange={handleChange}
                title="Year the institute was established, e.g., 1998. Shown in hero."
              />
              <select
                name="ownership"
                onChange={handleChange}
                title="Ownership type. Displayed in hero."
              >
                <option value="">Select Ownership</option>
                <option>Private</option>
                <option>Government</option>
                <option>Deemed</option>
                <option>Autonomous</option>
              </select>
              <input
                name="accreditation"
                placeholder="Accreditation (e.g., NAAC A+)"
                onChange={handleChange}
                title="Accreditation details like NAAC grade. Hero section."
              />
              <input
                name="affiliation"
                placeholder="Affiliation (e.g., UGC, AICTE)"
                onChange={handleChange}
                title="Affiliations and approvals. Shown in hero."
              />
              <input
                name="students"
                placeholder="No. of Students (e.g., 78234)"
                onChange={handleChange}
                title="Total number of students. Hero display."
              />
              <input
                name="faculty"
                placeholder="No. of Faculty (e.g., 234)"
                onChange={handleChange}
                title="Total faculty count. Hero section."
              />
              <label>Upload Logo</label>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                title="Upload institute logo. Single image, used in hero."
              />
              <label>Upload Banner Images (at least 3)</label>
              <input
                type="file"
                name="bannerImages"
                multiple
                onChange={handleFileChange}
                title="Upload at least 3 banner images for hero carousel."
              />
            </div>
          )}

          {/* -------------------- Step 2: About Section -------------------- */}
          {step === 2 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 2: About Section</h3>
              <textarea
                name="description"
                placeholder="About the University (Detailed Description)"
                rows={6}
                onChange={handleChange}
                title="Provide a detailed description about the university. This will be displayed in the about section."
              />
              <label>Upload About Images (at least 5)</label>
              <input
                type="file"
                name="aboutImages"
                multiple
                onChange={handleFileChange}
                title="Upload at least 5 images for the about section (e.g., campus views)."
              />
            </div>
          )}

          {/* -------------------- Step 3: Contact & Info Section -------------------- */}
          {step === 3 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 3: Contact & Info Section</h3>
              <input
                name="address"
                placeholder="Campus Address"
                onChange={handleChange}
                title="Full campus address. Used in info section."
              />
              <select
                name="state"
                onChange={handleChange}
                title="Select state. Part of location in info."
              >
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Delhi</option>
                <option>Tamil Nadu</option>
                <option>Uttar Pradesh</option>
                {/* Add more states as needed */}
              </select>
              <input
                name="city"
                placeholder="City (e.g., Gurgaon)"
                onChange={handleChange}
                title="City name. Displayed in hero and info."
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                title="Contact email."
              />
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                title="Contact phone number."
              />
              <input
                name="website"
                placeholder="Website"
                onChange={handleChange}
                title="Institute website URL."
              />
              <input
                name="socialMedia"
                placeholder="Social Media Links (comma-separated)"
                onChange={handleChange}
                title="List social media links, separated by commas."
              />
              <input
                name="topRecruiters"
                placeholder="Top Recruiters (comma-separated)"
                onChange={handleChange}
                title="List top recruiters for info section."
              />
              <input
                name="highestPackage"
                placeholder="Highest Package (LPA)"
                onChange={handleChange}
                title="Highest placement package. Info section."
              />
              <input
                name="avgPackage"
                placeholder="Average Package (LPA)"
                onChange={handleChange}
                title="Average placement package. Info section."
              />
              <input
                name="campusSize"
                placeholder="Campus Size (e.g., 50 acres)"
                onChange={handleChange}
                title="Campus size details."
              />
              <input
                name="hostelFee"
                placeholder="Hostel Fee"
                onChange={handleChange}
                title="Hostel fee details."
              />
              <input
                name="studentRating"
                placeholder="Student Rating (e.g., 4.5/5)"
                onChange={handleChange}
                title="Overall student rating."
              />
              <input
                name="nirfRank"
                placeholder="NIRF Rank"
                onChange={handleChange}
                title="NIRF ranking."
              />
              <label>Upload Top Recruiters Logos</label>
              <input
                type="file"
                name="recruitersLogos"
                multiple
                onChange={handleFileChange}
                title="Upload logos of top recruiters."
              />
            </div>
          )}

          {/* -------------------- Step 4: Courses, Fees & Cutoffs -------------------- */}
{step === 4 && (
  <div className="univ-form-step grid-3">
    <h3 className="univ-step-title">Step 4: Courses, Fees & Cutoffs</h3>

    <label>Upload Courses & Fees Excel (courses.xlsx)</label>
    <input
      type="file"
      name="file"   // 👈 MUST be "file" to match backend multer
      onChange={handleFileChange}
      accept=".xlsx"
      title="Upload Excel file with columns: Course Name, Total Fee, Yearly Fees, Duration, Intake."
    />

    <label>Upload Cutoffs Excel (cutoff.xlsx)</label>
    <input
      type="file"
      name="cutoffExcel"
      onChange={handleFileChange}
      accept=".xlsx"
      title="Upload Excel file with columns: Courses, Open, General, EWS, OBC, SC, ST, PWD."
    />

    <input
      name="popularCourses"
      placeholder="Popular Courses (comma-separated)"
      onChange={handleChange}
      title="List popular courses for info section."
    />
  </div>
)}


          {/* -------------------- Step 5: Placements -------------------- */}
          {step === 5 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 5: Placements</h3>
              <input
                name="placementRate"
                placeholder="Placement Rate (%)"
                onChange={handleChange}
                title="Overall placement rate."
              />
              <input
                name="highestLPA"
                placeholder="Highest LPA"
                onChange={handleChange}
                title="Highest LPA overall."
              />
              <input
                name="avgLPA"
                placeholder="Average LPA"
                onChange={handleChange}
                title="Average LPA overall."
              />
              <label>Upload Year-wise Placements Excel (placements.xlsx)</label>
              <input
                type="file"
                name="placementsExcel"
                onChange={handleFileChange}
                accept=".xlsx"
                title="Upload Excel with columns: Year, Companies, Placed, Highest CTC, Avg CTC."
              />
              {/* Branch-wise */}
              <h4>Branch-wise Placements</h4>
              <button type="button" onClick={addBranch} className="univ-add-btn">
                + Add Branch
              </button>
              {branches.map((branch, index) => (
                <div key={index} className="branch-group">
                  <input
                    placeholder="Branch Name"
                    value={branch.name}
                    onChange={(e) => handleBranchChange(index, "name", e.target.value)}
                    title="Enter branch name for dropdown."
                  />
                  <input
                    placeholder="Avg LPA"
                    value={branch.avgLPA}
                    onChange={(e) => handleBranchChange(index, "avgLPA", e.target.value)}
                    title="Average LPA for this branch."
                  />
                  <input
                    placeholder="Highest LPA"
                    value={branch.highestLPA}
                    onChange={(e) => handleBranchChange(index, "highestLPA", e.target.value)}
                    title="Highest LPA for this branch."
                  />
                </div>
              ))}
            </div>
          )}

          {/* -------------------- Step 6: Facilities -------------------- */}
          {step === 6 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 6: Facilities</h3>
              <p>Select facilities (icons hardcoded in frontend):</p>
              {facilityOptions.map((fac) => (
                <label key={fac} className="univ-checkbox-label">
                  <input
                    type="checkbox"
                    value={fac}
                    onChange={handleFacilityChange}
                    title={`Select if ${fac} is available. Description field will appear.`}
                  />
                  {fac.charAt(0).toUpperCase() + fac.slice(1)}
                </label>
              ))}
              {selectedFacilities.map((fac) => (
                <textarea
                  key={fac}
                  name={`facility_${fac}_desc`}
                  placeholder={`Description for ${fac}`}
                  rows={3}
                  onChange={handleChange}
                  title={`Provide details about the ${fac} facility.`}
                />
              ))}
            </div>
          )}

          {/* -------------------- Step 7: Gallery -------------------- */}
          {step === 7 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 7: Gallery</h3>
              <label>Upload Infrastructure Photos</label>
              <input
                type="file"
                name="infraPhotos"
                multiple
                onChange={handleFileChange}
                title="Upload photos related to infrastructure for gallery."
              />
              <label>Upload Event Photos</label>
              <input
                type="file"
                name="eventPhotos"
                multiple
                onChange={handleFileChange}
                title="Upload photos related to events for gallery."
              />
              <label>Upload Additional Gallery Images</label>
              <input
                type="file"
                name="galleryImages"
                multiple
                onChange={handleFileChange}
                title="Upload any additional images for the gallery section."
              />
            </div>
          )}

          {/* -------------------- Step 8: Admissions -------------------- */}
          {step === 8 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 8: Admissions</h3>
              <label>Upload Admissions Excel (admissions.xlsx)</label>
              <input
                type="file"
                name="admissionsExcel"
                onChange={handleFileChange}
                accept=".xlsx"
                title="Upload Excel with columns: Course Name, Eligibility, Specialization, Fee, Highest Pack, Avg Package."
              />
              <textarea
                name="admissionDetails"
                placeholder="Overall Admission Details"
                rows={4}
                onChange={handleChange}
                title="Provide general admission information."
              />
              <input
                name="scholarships"
                placeholder="Scholarships (comma-separated)"
                onChange={handleChange}
                title="List available scholarships."
              />
            </div>
          )}

          {/* -------------------- Step 9: Intl, Account & Submit -------------------- */}
          {step === 9 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 9: International, Docs, Account & Submit</h3>
              {/* International */}
              <input
                name="intlStudentOffice"
                placeholder="Intl. Student Office"
                onChange={handleChange}
                title="Details about international student office."
              />
              <input
                name="countriesEnrolled"
                placeholder="Countries Enrolled (comma-separated)"
                onChange={handleChange}
                title="Countries from which students are enrolled."
              />
              <input
                name="foreignMoUs"
                placeholder="Foreign MoUs (comma-separated)"
                onChange={handleChange}
                title="List of foreign MoUs."
              />
              <input
                name="languageSupport"
                placeholder="Language Support"
                onChange={handleChange}
                title="Language support details."
              />
              <input
                name="visaSupport"
                placeholder="Visa Support"
                onChange={handleChange}
                title="Visa assistance details."
              />
              {/* Docs */}
              <label>Upload Accreditation Doc</label>
              <input
                type="file"
                name="accreditationDoc"
                onChange={handleFileChange}
                title="Upload accreditation document."
              />
              <label>Upload Affiliation Doc</label>
              <input
                type="file"
                name="affiliationDoc"
                onChange={handleFileChange}
                title="Upload affiliation document."
              />
              <label>Upload Registration Doc</label>
              <input
                type="file"
                name="registrationDoc"
                onChange={handleFileChange}
                title="Upload registration document."
              />
              {/* Videos & Others */}
              <label>Upload Videos</label>
              <input
                type="file"
                name="videos"
                multiple
                onChange={handleFileChange}
                title="Upload promotional or campus videos."
              />
              <label>Upload Course Files</label>
              <input
                type="file"
                name="courseFiles"
                multiple
                onChange={handleFileChange}
                title="Upload additional course-related files."
              />
              {/* Auth */}
              <input
                name="emailUsername"
                placeholder="Email (Username)"
                onChange={handleChange}
                title="Email to use as username for account."
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                title="Set a password for the account."
              />
              {/* Subscription */}
              <select
                name="subscriptionPlan"
                onChange={handleChange}
                title="Select subscription plan."
              >
                <option value="">Select Plan</option>
                <option value="free">Free</option>
                <option value="standard">Standard ₹999/mo</option>
                <option value="premium">Premium ₹1999/mo</option>
              </select>
              {/* Declaration */}
              <label className="univ-checkbox-label">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration || false}
                  onChange={handleChange}
                />
                I confirm all details are correct
              </label>
              {/* Submit */}
              <button type="submit" className="univ-submit-btn">
                Submit
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="univ-form-nav">
            {step > 1 && step <= totalSteps && (
              <button type="button" onClick={prev} className="univ-nav-btn">
                ⬅ Back
              </button>
            )}
            {step < totalSteps && (
              <button type="button" onClick={next} className="univ-nav-btn">
                Next ➡
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}