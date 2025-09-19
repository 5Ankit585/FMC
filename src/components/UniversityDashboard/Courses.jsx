// src/Courses.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Courses.css";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Courses({ universityId }) {
  const [courseData, setCourseData] = useState([]);
  const [courseFileName, setCourseFileName] = useState("courses.xlsx");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");

  // Read Excel file for preview
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCourseFileName(file.name);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setCourseData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "universityproject"); // Unsigned preset
    formData.append("folder", "courses");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dapjccnab/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Send course data to backend
  const updateBackendCourses = async () => {
    try {
      const res = await fetch(`/api/universities/${universityId}/courses/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses: courseData }),
      });
      const data = await res.json();
      console.log("Backend update response:", data);
    } catch (err) {
      console.error("Error updating backend courses:", err);
      throw err;
    }
  };

  // Handle Submit button click
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      // Upload to Cloudinary
      const url = await uploadToCloudinary(selectedFile);
      setCloudinaryURL(url);

      // Save metadata in Firestore
      await addDoc(collection(db, "coursesFiles"), {
        fileName: selectedFile.name,
        cloudinaryURL: url,
        uploadedAt: serverTimestamp(),
      });

      // Update backend with parsed course data
      await updateBackendCourses();

      alert("File uploaded and courses updated successfully!");
    } catch (error) {
      console.error("Upload or backend update failed:", error);
      alert("Failed to upload file or update courses");
    }
  };

  // Download the current table
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(courseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
    XLSX.writeFile(workbook, courseFileName);
  };

  const formatFee = (value) => {
    if (!value || isNaN(value)) return value;
    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  return (
    <div className="courses-page">
      <h2 className="courses-title">Courses</h2>
      <p className="courses-subtitle">Upload your course and fee Excel file.</p>

      <div className="courses-card">
        <label className="file-upload-btn">
          <FontAwesomeIcon icon={faUpload} /> Select File
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileSelect}
            hidden
          />
        </label>

        <button className="btn btn-submit" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} /> Submit
        </button>

        {courseData.length > 0 && (
          <div className="file-preview">
            <p className="file-name">
              Selected File: {courseFileName}{" "}
              {cloudinaryURL && (
                <a
                  href={cloudinaryURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (View on Cloudinary)
                </a>
              )}
            </p>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {Object.keys(courseData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, i) => (
                    <tr key={i}>
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key}>
                          {key.toLowerCase().includes("fee")
                            ? formatFee(value)
                            : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="btn btn-download" onClick={handleDownload}>
              <FontAwesomeIcon icon={faDownload} /> Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
