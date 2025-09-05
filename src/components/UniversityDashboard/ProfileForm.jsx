import React, { useState } from "react";
import "./ProfileForm.css";
import axios from "axios";

const universityTypes = ['Government', 'Private', 'Deemed', 'Central', 'State'];
const affiliations = ['UGC', 'AICTE', 'NAAC', 'ICAR', 'BCI', 'MCI', 'Others'];
const states = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal'
];
const countryCodes = ['+91', '+1', '+44', '+61', '+81', '+86', '+971'];
const contactTypes = ['Director','Examiner','Vice Chancellor','MD','Owner','Registrar','Other'];

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
      updated[index]._photo = files?.[0] || null; // optional photo for this contact
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side checks to avoid backend 400s
    if (!form.name || !form.type) {
      alert("Please fill required fields: University Name and Type.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();

      // Files
      if (form.logo) formData.append("logo", form.logo);
      if (form.seal) formData.append("seal", form.seal);
      if (form.brochure) formData.append("brochure", form.brochure);
      if (form.coursesFile) formData.append("coursesFile", form.coursesFile);
      form.images.forEach(img => formData.append("images", img));
      form.videos.forEach(vid => formData.append("videos", vid));

      // Contact photos if any (matches backend organizeFiles: "contactPhoto_{index}")
      form.contacts.forEach((c, idx) => {
        if (c._photo) {
          formData.append(`contactPhoto_${idx}`, c._photo);
        }
      });

      // Everything else as JSON string under "data"
      const { logo, seal, brochure, coursesFile, images, videos, confirmPassword, ...otherFields } = form;

      // (Optional) Convert numerics to numbers to keep DB clean
      const normalized = {
        ...otherFields,
        students: otherFields.students ? Number(otherFields.students) : "",
        faculty: otherFields.faculty ? Number(otherFields.faculty) : "",
        campusArea: otherFields.campusArea ? Number(otherFields.campusArea) : "",
        placementRate: otherFields.placementRate ? Number(otherFields.placementRate) : "",
      };

      formData.append("data", JSON.stringify(normalized));

      // IMPORTANT: do NOT set Content-Type header manually; let Axios set the boundary.
      const res = await api.post("/api/universities", formData);


      if (res.data?.success) {
        alert("University profile saved successfully!");
        resetForm();
      } else {
        alert(res.data?.error || "Failed to save profile.");
      }
    } catch (err) {
      // Rich error logging so you can see exactly what's wrong
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

  return (
    <form className="profile-form" onSubmit={handleSubmit} noValidate>
      <section>
        <h3>Basic Information</h3>
        <label>University Name <small>(required)</small>
          <input type="text" name="name" required value={form.name} onChange={handleChange} />
        </label>
        <label>Year Established
          <input type="date" name="established" value={form.established} onChange={handleChange} />
        </label>
        <label>Official Website
          <input type="url" name="website" value={form.website} onChange={handleChange} />
        </label>
        <label>University Type <small>(required)</small>
          <select name="type" required value={form.type} onChange={handleChange}>
            <option value="">Select type</option>
            {universityTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label>Affiliation
          <select name="affiliation" value={form.affiliation} onChange={handleChange}>
            <option value="">Select affiliation</option>
            {affiliations.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
      </section>

      <section>
        <h3>Location Details</h3>
        <label>Address<input type="text" name="address" value={form.address} onChange={handleChange} /></label>
        <label>City<input type="text" name="city" value={form.city} onChange={handleChange} /></label>
        <label>Pincode<input type="text" name="pincode" value={form.pincode} onChange={handleChange} /></label>
        <label>State<select name="state" value={form.state} onChange={handleChange}>
          <option value="">Select state</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select></label>
      </section>

      <section>
        <h3>Contact Information</h3>
        <label>Primary Contact<input type="text" name="contact" value={form.contact} onChange={handleChange} /></label>
        <label>Alt Contact Country Code
          <select name="countryCode" value={form.altContact.countryCode} onChange={handleAltContactChange}>
            <option value="">Select</option>
            {countryCodes.map(cc => <option key={cc} value={cc}>{cc}</option>)}
          </select>
        </label>
        <label>Alt Contact Phone<input type="text" name="phone" value={form.altContact.phone} onChange={handleAltContactChange} /></label>

        <div className="additional-contacts">
          <h4>Additional Contacts</h4>
          {form.contacts.map((c, idx) => (
            <div key={idx}>
              <label>Type<select name="type" value={c.type} onChange={e => handleContactChange(idx, e)}>
                <option value="">Select</option>
                {contactTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
              </select></label>
              <label>Country Code<select name="countryCode" value={c.countryCode} onChange={e => handleContactChange(idx, e)}>
                <option value="">Select</option>
                {countryCodes.map(cc => <option key={cc} value={cc}>{cc}</option>)}
              </select></label>
              <label>Name<input type="text" name="name" value={c.name} onChange={e => handleContactChange(idx, e)} /></label>
              <label>Email<input type="email" name="email" value={c.email} onChange={e => handleContactChange(idx, e)} /></label>
              <label>Phone<input type="text" name="phone" value={c.phone} onChange={e => handleContactChange(idx, e)} /></label>
              {/* Optional photo per contact; backend expects contactPhoto_{index} */}
              <label>Photo (optional)
                <input type="file" name={`contactPhoto_${idx}`} accept="image/*" onChange={e => handleContactChange(idx, e)} />
              </label>
              <button type="button" onClick={() => removeContact(idx)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addContact}>+ Add Contact</button>
        </div>
      </section>

      <section>
        <h3>Academic Details & Media</h3>
        <label>Streams<input type="text" name="streams" value={form.streams} onChange={handleChange} /></label>
        <label>Total Students<input type="number" name="students" value={form.students} onChange={handleChange} /></label>
        <label>Total Faculty<input type="number" name="faculty" value={form.faculty} onChange={handleChange} /></label>
        <label>Hostel<input type="text" name="hostel" value={form.hostel} onChange={handleChange} /></label>
        <label>Campus Area<input type="number" name="campusArea" value={form.campusArea} onChange={handleChange} /></label>

        <label>Courses Excel File<input type="file" name="coursesFile" onChange={handleChange} /></label>
        <label>Logo<input type="file" name="logo" accept="image/*" onChange={handleChange} /></label>
        <label>Seal (optional)<input type="file" name="seal" accept="image/*" onChange={handleChange} /></label>
        <label>Brochure<input type="file" name="brochure" accept="application/pdf" onChange={handleChange} /></label>
        <label>Images<input type="file" name="images" accept="image/*" multiple onChange={handleChange} /></label>
        <label>Videos<input type="file" name="videos" accept="video/mp4" multiple onChange={handleChange} /></label>
      </section>

      <section>
        <h3>Placement & Admin</h3>
        <label>Placement Rate<input type="number" name="placementRate" value={form.placementRate} onChange={handleChange} /></label>
        <label>Top Recruiters<input type="text" name="topRecruiters" value={form.topRecruiters} onChange={handleChange} /></label>
        <label>Average Package<input type="text" name="averagePackage" value={form.averagePackage} onChange={handleChange} /></label>
        <label>Highest Package<input type="text" name="highestPackage" value={form.highestPackage} onChange={handleChange} /></label>
        <label>Placement Cell Email<input type="email" name="placementCellContactEmail" value={form.placementCellContactEmail} onChange={handleChange} /></label>
        <label>Admin Email<input type="email" name="adminEmail" required value={form.adminEmail} onChange={handleChange} /></label>
        <label>Password<input type="password" name="password" required value={form.password} onChange={handleChange} /></label>
        <label>Confirm Password<input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} /></label>
      </section>

      <section>
        <h3>About University</h3>
        <textarea name="about" rows="5" value={form.about} onChange={handleChange} />
      </section>

      <button type="submit" className="ud-btn" disabled={uploading}>
        {uploading ? "Uploading..." : "Submit"}
      </button>
      <p style={{fontSize:12, opacity:0.7, marginTop:8}}>
        API: {API_BASE}/api/universities
      </p>
    </form>
  );
}
