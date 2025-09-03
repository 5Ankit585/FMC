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

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "", established: "", website: "", type: "", affiliation: "",
    address: "", city: "", pincode: "", state: "", contact: "",
    altContact: { countryCode: "", phone: "" }, contacts: [],
    streams: "", students: "", faculty: "", hostel: "", campusArea: "",
    coursesFile: null, logo: null, brochure: null, images: [], videos: [],
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
    setForm(f => ({ ...f, contacts: [...f.contacts, { type: "", countryCode: "", name: "", email: "", phone: "" }] }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...form.contacts];
    updatedContacts[index][name] = value;
    setForm(f => ({ ...f, contacts: updatedContacts }));
  };

  const removeContact = (index) => {
    setForm(f => ({ ...f, contacts: f.contacts.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      if (form.logo) formData.append("logo", form.logo);
      if (form.brochure) formData.append("brochure", form.brochure);
      if (form.coursesFile) formData.append("coursesFile", form.coursesFile);
      form.images.forEach(img => formData.append("images", img));
      form.videos.forEach(vid => formData.append("videos", vid));

      // All other fields as JSON string
      const { logo, brochure, coursesFile, images, videos, ...otherFields } = form;
      formData.append("data", JSON.stringify(otherFields));

      const res = await axios.post("http://localhost:5000/api/universities", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        alert("University profile saved successfully!");
        setForm({
          name: "", established: "", website: "", type: "", affiliation: "",
          address: "", city: "", pincode: "", state: "", contact: "",
          altContact: { countryCode: "", phone: "" }, contacts: [],
          streams: "", students: "", faculty: "", hostel: "", campusArea: "",
          coursesFile: null, logo: null, brochure: null, images: [], videos: [],
          placementRate: "", topRecruiters: "", averagePackage: "", highestPackage: "",
          placementCellContactEmail: "", adminEmail: "", password: "", confirmPassword: "",
          about: "",
        });
      } else {
        alert("Failed to save profile.");
      }

    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Check console.");
    }

    setUploading(false);
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
    </form>
  );
}
