import React, { useState, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import "./ProfileForm.css";

const universityTypes = ['Government', 'Private', 'Deemed', 'Central', 'State'];
const affiliations = ['UGC', 'AICTE', 'NAAC', 'ICAR', 'BCI', 'MCI', 'Others'];
const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];
const countryCodes = ['+91', '+1', '+44', '+61', '+81', '+86', '+971'];
const contactTypes = ['Director', 'Examiner', 'Vice Chancellor', 'MD', 'Owner', 'Registrar', 'Other'];

// Axios instance with sensible defaults
const API_BASE = import.meta?.env?.VITE_API_URL || process.env.REACT_APP_API_URL || "http://localhost:5000";
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 30000,
});

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "", established: "", website: "", type: "", affiliation: "",
    address: "", city: "", pincode: "", state: "", contact: "",
    altContact: { countryCode: "", phone: "" }, contacts: [],
    streams: "", students: "", faculty: "", hostel: "", campusArea: "",
    coursesFile: null, logo: null, seal: null, brochure: null, images: [], videos: [],
    placementRate: "", topRecruiters: "", averagePackage: "", highestPackage: "",
    placementCellContactEmail: "", adminEmail: "", password: "", confirmPassword: "",
    about: "",
  });
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "images" || name === "videos") {
        setForm(f => ({ ...f, [name]: Array.from(files) }));
      } else {
        setForm(f => ({ ...f, [name]: files[0] }));
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleAltContactChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, altContact: { ...f.altContact, [name]: value } }));
  };

  const addContact = () => {
    setForm(f => ({
      ...f,
      contacts: [...f.contacts, { type: "", countryCode: "", name: "", email: "", phone: "", _photo: null }]
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value, files, type } = e.target;
    const updated = [...form.contacts];
    if (type === "file") {
      updated[index]._photo = files?.[0] || null;
    } else {
      updated[index][name] = value;
    }
    setForm(f => ({ ...f, contacts: updated }));
  };

  const removeContact = (index) => {
    setForm(f => ({ ...f, contacts: f.contacts.filter((_, i) => i !== index) }));
  };

  const resetForm = () => {
    setForm({
      name: "", established: "", website: "", type: "", affiliation: "",
      address: "", city: "", pincode: "", state: "", contact: "",
      altContact: { countryCode: "", phone: "" }, contacts: [],
      streams: "", students: "", faculty: "", hostel: "", campusArea: "",
      coursesFile: null, logo: null, seal: null, brochure: null, images: [], videos: [],
      placementRate: "", topRecruiters: "", averagePackage: "", highestPackage: "",
      placementCellContactEmail: "", adminEmail: "", password: "", confirmPassword: "",
      about: "",
    });
    setStep(1);
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.name || !form.type) {
        alert("Please fill required fields: University Name and Type.");
        return false;
      }
    } else if (step === 5) {
      if (!form.adminEmail) {
        alert("Please fill required field: Admin Email.");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setUploading(true);
    try {
      const formData = new FormData();

      if (form.logo) formData.append("logo", form.logo);
      if (form.seal) formData.append("seal", form.seal);
      if (form.brochure) formData.append("brochure", form.brochure);
      if (form.coursesFile) formData.append("coursesFile", form.coursesFile);
      form.images.forEach(img => formData.append("images", img));
      form.videos.forEach(vid => formData.append("videos", vid));

      form.contacts.forEach((c, idx) => {
        if (c._photo) {
          formData.append(`contactPhoto_${idx}`, c._photo);
        }
      });

      const { logo, seal, brochure, coursesFile, images, videos, confirmPassword, ...otherFields } = form;
      const normalized = {
        ...otherFields,
        students: otherFields.students ? Number(otherFields.students) : "",
        faculty: otherFields.faculty ? Number(otherFields.faculty) : "",
        campusArea: otherFields.campusArea ? Number(otherFields.campusArea) : "",
        placementRate: otherFields.placementRate ? Number(otherFields.placementRate) : "",
      };
      formData.append("data", JSON.stringify(normalized));

      const res = await api.post("/api/universities", formData);

      if (res.data?.success) {
        alert("University profile saved successfully!");
        resetForm();
      } else {
        alert(res.data?.error || "Failed to save profile.");
      }
    } catch (err) {
      console.error("Error saving profile:", err?.message || err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response data:", err.response.data);
        alert(err.response?.data?.error || err.response?.data?.message || "Server error. Check console.");
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("No response from server (network/CORS). Check that the server is running and CORS is configured.");
      } else {
        console.error("Axios config error:", err.message);
        alert("Request error. Check console for details.");
      }
    } finally {
      setUploading(false);
    }
  };

  const getStepClass = (currentStep) => {
    if (step > currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return '';
  };

  const getLineClass = (lineIndex) => (step > lineIndex + 1 ? 'uni-profile-step-line active' : 'uni-profile-step-line');

  return (
    <div className="uni-profile-form-container">
      <div className="uni-profile-stepper uni-profile-horizontal">
        <div className={`uni-profile-step ${getStepClass(1)}`}>{step > 1 ? <FaCheck /> : 1}</div>
        <div className={getLineClass(1)}></div>
        <div className={`uni-profile-step ${getStepClass(2)}`}>{step > 2 ? <FaCheck /> : 2}</div>
        <div className={getLineClass(2)}></div>
        <div className={`uni-profile-step ${getStepClass(3)}`}>{step > 3 ? <FaCheck /> : 3}</div>
        <div className={getLineClass(3)}></div>
        <div className={`uni-profile-step ${getStepClass(4)}`}>{step > 4 ? <FaCheck /> : 4}</div>
        <div className={getLineClass(4)}></div>
        <div className={`uni-profile-step ${getStepClass(5)}`}>{step > 5 ? <FaCheck /> : 5}</div>
        <div className={getLineClass(5)}></div>
        <div className={`uni-profile-step ${getStepClass(6)}`}>{step > 6 ? <FaCheck /> : 6}</div>
      </div>

      <form className="uni-profile-form" onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <section className="uni-profile-form-section">
            <h3 className="uni-profile-form-section-title">Basic Information</h3>
            <label className="uni-profile-form-label">
              University Name <span className="uni-profile-required">(required)</span>
              <input type="text" name="name" required value={form.name} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Year Established
              <input type="date" name="established" value={form.established} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Official Website
              <input type="url" name="website" value={form.website} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              University Type <span className="uni-profile-required">(required)</span>
              <select name="type" required value={form.type} onChange={handleChange} className="uni-profile-input">
                <option value="">Select type</option>
                {universityTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="uni-profile-form-label">
              Affiliation
              <select name="affiliation" value={form.affiliation} onChange={handleChange} className="uni-profile-input">
                <option value="">Select affiliation</option>
                {affiliations.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <div className="uni-profile-form-actions">
              <button type="button" className="uni-profile-btn uni-profile-btn-primary" onClick={nextStep}>Next</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="uni-profile-form-section">
            <h3 className="uni-profile-form-section-title">Location Details</h3>
            <label className="uni-profile-form-label">
              Address
              <input type="text" name="address" value={form.address} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              City
              <input type="text" name="city" value={form.city} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Pincode
              <input type="text" name="pincode" value={form.pincode} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              State
              <select name="state" value={form.state} onChange={handleChange} className="uni-profile-input">
                <option value="">Select state</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <div className="uni-profile-form-actions">
              <button type="button" className="uni-profile-btn" onClick={prevStep}>Back</button>
              <button type="button" className="uni-profile-btn uni-profile-btn-primary" onClick={nextStep}>Next</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="uni-profile-form-section">
            <h3 className="uni-profile-form-section-title">Contact Information</h3>
            <label className="uni-profile-form-label">
              Primary Contact
              <input type="text" name="contact" value={form.contact} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Alt Contact Country Code
              <select name="countryCode" value={form.altContact.countryCode} onChange={handleAltContactChange} className="uni-profile-input">
                <option value="">Select</option>
                {countryCodes.map(cc => <option key={cc} value={cc}>{cc}</option>)}
              </select>
            </label>
            <label className="uni-profile-form-label">
              Alt Contact Phone
              <input type="text" name="phone" value={form.altContact.phone} onChange={handleAltContactChange} className="uni-profile-input" />
            </label>
            <div className="uni-profile-additional-contacts">
              <h4>Additional Contacts</h4>
              {form.contacts.map((c, idx) => (
                <div key={idx} className="uni-profile-contact-group">
                  <label className="uni-profile-form-label">
                    Type
                    <select name="type" value={c.type} onChange={e => handleContactChange(idx, e)} className="uni-profile-input">
                      <option value="">Select</option>
                      {contactTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                    </select>
                  </label>
                  <label className="uni-profile-form-label">
                    Country Code
                    <select name="countryCode" value={c.countryCode} onChange={e => handleContactChange(idx, e)} className="uni-profile-input">
                      <option value="">Select</option>
                      {countryCodes.map(cc => <option key={cc} value={cc}>{cc}</option>)}
                    </select>
                  </label>
                  <label className="uni-profile-form-label">
                    Name
                    <input type="text" name="name" value={c.name} onChange={e => handleContactChange(idx, e)} className="uni-profile-input" />
                  </label>
                  <label className="uni-profile-form-label">
                    Email
                    <input type="email" name="email" value={c.email} onChange={e => handleContactChange(idx, e)} className="uni-profile-input" />
                  </label>
                  <label className="uni-profile-form-label">
                    Phone
                    <input type="text" name="phone" value={c.phone} onChange={e => handleContactChange(idx, e)} className="uni-profile-input" />
                  </label>
                  <label className="uni-profile-form-label">
                    Photo (optional)
                    <input type="file" name={`contactPhoto_${idx}`} accept="image/*" onChange={e => handleContactChange(idx, e)} className="uni-profile-input" />
                  </label>
                  <button type="button" className="uni-profile-btn uni-profile-btn-outline" onClick={() => removeContact(idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="uni-profile-btn uni-profile-btn-outline" onClick={addContact}>+ Add Contact</button>
            </div>
            <div className="uni-profile-form-actions">
              <button type="button" className="uni-profile-btn" onClick={prevStep}>Back</button>
              <button type="button" className="uni-profile-btn uni-profile-btn-primary" onClick={nextStep}>Next</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="uni-profile-form-section">
            <h3 className="uni-profile-form-section-title">Academic Details & Media</h3>
            <label className="uni-profile-form-label">
              Streams
              <input type="text" name="streams" value={form.streams} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Total Students
              <input type="number" name="students" value={form.students} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Total Faculty
              <input type="number" name="faculty" value={form.faculty} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Hostel
              <input type="text" name="hostel" value={form.hostel} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Campus Area
              <input type="number" name="campusArea" value={form.campusArea} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Courses Excel File
              <input type="file" name="coursesFile" onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Logo
              <input type="file" name="logo" accept="image/*" onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Seal (optional)
              <input type="file" name="seal" accept="image/*" onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Brochure
              <input type="file" name="brochure" accept="application/pdf" onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Images
              <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Videos
              <input type="file" name="videos" accept="video/mp4" multiple onChange={handleChange} className="uni-profile-input" />
            </label>
            <div className="uni-profile-form-actions">
              <button type="button" className="uni-profile-btn" onClick={prevStep}>Back</button>
              <button type="button" className="uni-profile-btn uni-profile-btn-primary" onClick={nextStep}>Next</button>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className="uni-profile-form-section">
            <h3 className="uni-profile-form-section-title">Placement & Admin</h3>
            <label className="uni-profile-form-label">
              Placement Rate
              <input type="number" name="placementRate" value={form.placementRate} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Top Recruiters
              <input type="text" name="topRecruiters" value={form.topRecruiters} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Average Package
              <input type="text" name="averagePackage" value={form.averagePackage} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Highest Package
              <input type="text" name="highestPackage" value={form.highestPackage} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Placement Cell Email
              <input type="email" name="placementCellContactEmail" value={form.placementCellContactEmail} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Admin Email <span className="uni-profile-required">(required)</span>
              <input type="email" name="adminEmail" required value={form.adminEmail} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Password <span className="uni-profile-required">(required)</span>
              <input type="password" name="password" required value={form.password} onChange={handleChange} className="uni-profile-input" />
            </label>
            <label className="uni-profile-form-label">
              Confirm Password <span className="uni-profile-required">(required)</span>
              <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} className="uni-profile-input" />
            </label>
            <div className="uni-profile-form-actions">
              <button type="button" className="uni-profile-btn" onClick={prevStep}>Back</button>
              <button type="button" className="uni-profile-btn uni-profile-btn-primary" onClick={nextStep}>Next</button>
            </div>
          </section>
        )}

        {step === 6 && (
          <section className="uni-profile-form-section">
            <h3 className="uni-profile-form-section-title">About University & Review</h3>
            <label className="uni-profile-form-label">
              About University
              <textarea name="about" rows="5" value={form.about} onChange={handleChange} className="uni-profile-input" />
            </label>
            <div className="uni-profile-review-section">
              <h4>Review Details</h4>
              <h5>Basic Information <button type="button" className="uni-profile-edit-btn" onClick={() => setStep(1)}>Edit</button></h5>
              <p><strong>Name:</strong> {form.name || 'N/A'}</p>
              <p><strong>Year Established:</strong> {form.established || 'N/A'}</p>
              <p><strong>Website:</strong> {form.website || 'N/A'}</p>
              <p><strong>Type:</strong> {form.type || 'N/A'}</p>
              <p><strong>Affiliation:</strong> {form.affiliation || 'N/A'}</p>

              <h5>Location Details <button type="button" className="uni-profile-edit-btn" onClick={() => setStep(2)}>Edit</button></h5>
              <p><strong>Address:</strong> {form.address || 'N/A'}</p>
              <p><strong>City:</strong> {form.city || 'N/A'}</p>
              <p><strong>Pincode:</strong> {form.pincode || 'N/A'}</p>
              <p><strong>State:</strong> {form.state || 'N/A'}</p>

              <h5>Contact Information <button type="button" className="uni-profile-edit-btn" onClick={() => setStep(3)}>Edit</button></h5>
              <p><strong>Primary Contact:</strong> {form.contact || 'N/A'}</p>
              <p><strong>Alt Contact:</strong> {form.altContact.countryCode} {form.altContact.phone || 'N/A'}</p>
              <p><strong>Additional Contacts:</strong> {form.contacts.length > 0 ? form.contacts.map(c => `${c.name} (${c.type})`).join(', ') : 'None'}</p>

              <h5>Academic Details & Media <button type="button" className="uni-profile-edit-btn" onClick={() => setStep(4)}>Edit</button></h5>
              <p><strong>Streams:</strong> {form.streams || 'N/A'}</p>
              <p><strong>Total Students:</strong> {form.students || 'N/A'}</p>
              <p><strong>Total Faculty:</strong> {form.faculty || 'N/A'}</p>
              <p><strong>Hostel:</strong> {form.hostel || 'N/A'}</p>
              <p><strong>Campus Area:</strong> {form.campusArea || 'N/A'}</p>
              <p><strong>Files:</strong> {form.coursesFile?.name || form.logo?.name || form.seal?.name || form.brochure?.name || form.images.length > 0 || form.videos.length > 0 ? 
                [
                  form.coursesFile?.name, 
                  form.logo?.name, 
                  form.seal?.name, 
                  form.brochure?.name, 
                  ...form.images.map(img => img.name), 
                  ...form.videos.map(vid => vid.name)
                ].filter(Boolean).join(', ') : 'None'}</p>

              <h5>Placement & Admin <button type="button" className="uni-profile-edit-btn" onClick={() => setStep(5)}>Edit</button></h5>
              <p><strong>Placement Rate:</strong> {form.placementRate || 'N/A'}</p>
              <p><strong>Top Recruiters:</strong> {form.topRecruiters || 'N/A'}</p>
              <p><strong>Average Package:</strong> {form.averagePackage || 'N/A'}</p>
              <p><strong>Highest Package:</strong> {form.highestPackage || 'N/A'}</p>
              <p><strong>Placement Cell Email:</strong> {form.placementCellContactEmail || 'N/A'}</p>
              <p><strong>Admin Email:</strong> {form.adminEmail || 'N/A'}</p>
            </div>
            <div className="uni-profile-form-actions">
              <button type="button" className="uni-profile-btn" onClick={prevStep}>Back</button>
              <button type="submit" className="uni-profile-btn uni-profile-btn-primary" disabled={uploading}>
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </section>
        )}
      </form>
      <p className="uni-profile-api-info">API: {API_BASE}/api/universities</p>
    </div>
  );
}