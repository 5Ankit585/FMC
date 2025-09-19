import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfileForm.css";

export default function ProfileForm() {
  const { id } = useParams(); // URL se id aayegi
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const baseUrl = "http://localhost:5000";

  // ---------------------------
  // Fetch profile on mount
  // ---------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) {
          console.log("⚠️ No universityId found in params");
          return;
        }
        const res = await fetch(`${baseUrl}/api/universities/${id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setFormData(data); // prefill form
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [id]);

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
      const res = await fetch(`${baseUrl}/api/universities/${id}`, {
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
      const res = await fetch(`${baseUrl}/api/universities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete profile");
      alert("🗑 University deleted!");
      navigate("/"); // redirect to home
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
        {/* Example Section */}
        <section>
          <h3>Basic Info</h3>
          <input name="instituteName" placeholder="Institute Name" value={formData.instituteName || ""} onChange={handleChange} disabled={!editing} />
          <input name="type" placeholder="Type" value={formData.type || ""} onChange={handleChange} disabled={!editing} />
          <input name="year" placeholder="Year" value={formData.year || ""} onChange={handleChange} disabled={!editing} />
          <input name="ownership" placeholder="Ownership" value={formData.ownership || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* Media Section */}
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
          </div>
        </section>
      </form>
    </div>
  );
}
