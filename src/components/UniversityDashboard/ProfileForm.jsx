import React, { useEffect, useState } from "react";
import "./ProfileForm.css";

export default function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const universityId = localStorage.getItem("universityId");
  const baseUrl = "http://localhost:5000";

  // ---------------------------
  // Fetch profile on mount
  // ---------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!universityId) {
          console.log("⚠️ No universityId found in localStorage");
          return;
        }
        const res = await fetch(`${baseUrl}/api/universities/${universityId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setFormData(data); // prefill
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [universityId]);

  // ---------------------------
  // Handlers
  // ---------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/universities/${universityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("❌ Update failed!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this university?")) return;
    try {
      const res = await fetch(`${baseUrl}/api/universities/${universityId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete profile");
      alert("🗑 University deleted!");
      localStorage.removeItem("universityId");
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Delete failed!");
    }
  };

  if (!profile) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">University Profile</h2>

      {/* Edit/Save/Delete Buttons */}
      <div className="profile-actions">
        {editing ? (
          <button className="btn save-btn" onClick={handleSubmit}>Save</button>
        ) : (
          <button className="btn edit-btn" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
      </div>

      {/* Profile Form */}
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* --- Step 1: Basic Info --- */}
        <section>
          <h3>Basic Info</h3>
          <input name="instituteName" placeholder="Institute Name" value={formData.instituteName || ""} onChange={handleChange} disabled={!editing} />
          <input name="type" placeholder="Type" value={formData.type || ""} onChange={handleChange} disabled={!editing} />
          <input name="year" placeholder="Year" value={formData.year || ""} onChange={handleChange} disabled={!editing} />
          <input name="ownership" placeholder="Ownership" value={formData.ownership || ""} onChange={handleChange} disabled={!editing} />
          <input name="accreditation" placeholder="Accreditation" value={formData.accreditation || ""} onChange={handleChange} disabled={!editing} />
          <input name="affiliation" placeholder="Affiliation" value={formData.affiliation || ""} onChange={handleChange} disabled={!editing} />
          <input name="students" placeholder="No. of Students" value={formData.students || ""} onChange={handleChange} disabled={!editing} />
          <input name="faculty" placeholder="No. of Faculty" value={formData.faculty || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* --- Step 2: About --- */}
        <section>
          <h3>About</h3>
          <textarea name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} disabled={!editing}></textarea>
        </section>

        {/* --- Step 3: Contact --- */}
        <section>
          <h3>Contact & Info</h3>
          <input name="address" placeholder="Address" value={formData.address || ""} onChange={handleChange} disabled={!editing} />
          <input name="state" placeholder="State" value={formData.state || ""} onChange={handleChange} disabled={!editing} />
          <input name="city" placeholder="City" value={formData.city || ""} onChange={handleChange} disabled={!editing} />
          <input name="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} disabled={!editing} />
          <input name="phone" placeholder="Phone" value={formData.phone || ""} onChange={handleChange} disabled={!editing} />
          <input name="website" placeholder="Website" value={formData.website || ""} onChange={handleChange} disabled={!editing} />
          <input name="socialMedia" placeholder="Social Media Links" value={formData.socialMedia || ""} onChange={handleChange} disabled={!editing} />
          <input name="topRecruiters" placeholder="Top Recruiters" value={formData.topRecruiters || ""} onChange={handleChange} disabled={!editing} />
          <input name="highestPackage" placeholder="Highest Package" value={formData.highestPackage || ""} onChange={handleChange} disabled={!editing} />
          <input name="avgPackage" placeholder="Average Package" value={formData.avgPackage || ""} onChange={handleChange} disabled={!editing} />
          <input name="campusSize" placeholder="Campus Size" value={formData.campusSize || ""} onChange={handleChange} disabled={!editing} />
          <input name="hostelFee" placeholder="Hostel Fee" value={formData.hostelFee || ""} onChange={handleChange} disabled={!editing} />
          <input name="studentRating" placeholder="Student Rating" value={formData.studentRating || ""} onChange={handleChange} disabled={!editing} />
          <input name="nirfRank" placeholder="NIRF Rank" value={formData.nirfRank || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* --- Step 4 & 5: Courses & Placements --- */}
        <section>
          <h3>Placements</h3>
          <input name="placementRate" placeholder="Placement Rate" value={formData.placementRate || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* --- Step 6: Facilities --- */}
        <section>
          <h3>Facilities</h3>
          <textarea name="facilities" placeholder="Facilities JSON" value={JSON.stringify(formData.facilities || [], null, 2)} onChange={handleChange} disabled={!editing}></textarea>
        </section>

        {/* --- Step 8: Admissions --- */}
        <section>
          <h3>Admissions</h3>
          <textarea name="admissionDetails" placeholder="Admission Details" value={formData.admissionDetails || ""} onChange={handleChange} disabled={!editing}></textarea>
          <input name="scholarships" placeholder="Scholarships" value={formData.scholarships || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* --- Step 9: International --- */}
        <section>
          <h3>International</h3>
          <input name="intlStudentOffice" placeholder="Intl. Student Office" value={formData.intlStudentOffice || ""} onChange={handleChange} disabled={!editing} />
          <input name="countriesEnrolled" placeholder="Countries Enrolled" value={formData.countriesEnrolled || ""} onChange={handleChange} disabled={!editing} />
          <input name="foreignMoUs" placeholder="Foreign MoUs" value={formData.foreignMoUs || ""} onChange={handleChange} disabled={!editing} />
          <input name="languageSupport" placeholder="Language Support" value={formData.languageSupport || ""} onChange={handleChange} disabled={!editing} />
          <input name="visaSupport" placeholder="Visa Support" value={formData.visaSupport || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* --- Step 9: Account --- */}
        <section>
          <h3>Account</h3>
          <input name="emailUsername" placeholder="Email (Username)" value={formData.emailUsername || ""} onChange={handleChange} disabled={!editing} />
          <input type="password" name="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} disabled={!editing} />
          <input name="subscriptionPlan" placeholder="Subscription Plan" value={formData.subscriptionPlan || ""} onChange={handleChange} disabled={!editing} />
        </section>

                {/* --- Media: Logo & Banner --- */}
        <section>
          <h3>Media</h3>
          <div className="media-preview">
            <h4>Logo</h4>
            {profile.logo && profile.logo.length > 0 ? (
              <img src={profile.logo[0]} alt="University Logo" className="media-logo" />
            ) : (
              <p>No logo uploaded</p>
            )}

            <h4>Banner Images</h4>
            <div className="media-grid">
              {profile.bannerImage?.length > 0 ? (
                profile.bannerImage.map((img, idx) => (
                  <img key={idx} src={img} alt={`Banner ${idx + 1}`} />
                ))
              ) : (
                <p>No banner images uploaded</p>
              )}
            </div>

            <h4>About Images</h4>
            <div className="media-grid">
              {profile.aboutImages?.length > 0 ? (
                profile.aboutImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`About ${idx + 1}`} />
                ))
              ) : (
                <p>No about images uploaded</p>
              )}
            </div>
          </div>
        </section>

        {/* --- Gallery --- */}
        <section>
          <h3>Gallery</h3>
          <div className="media-grid">
            {profile.galleryImages?.length > 0 ? (
              profile.galleryImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
              ))
            ) : (
              <p>No gallery images uploaded</p>
            )}
          </div>
        </section>

        {/* --- Recruiters --- */}
        <section>
          <h3>Recruiters Logos</h3>
          <div className="media-grid">
            {profile.recruitersLogos?.length > 0 ? (
              profile.recruitersLogos.map((img, idx) => (
                <img key={idx} src={img} alt={`Recruiter ${idx + 1}`} />
              ))
            ) : (
              <p>No recruiters logos uploaded</p>
            )}
          </div>
        </section>

      </form>
    </div>
  );
}
