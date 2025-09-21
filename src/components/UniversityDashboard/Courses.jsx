// src/components/UniversityDashboard/Courses.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Courses.css";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Courses() {
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

  // Handle Submit button click
  const handleSubmit = async () => {
    if (!courseData || courseData.length === 0) {
      alert("⚠️ Please select and edit file first.");
      return;
    }

    try {
      // Convert updated courseData to Excel Blob
      const worksheet = XLSX.utils.json_to_sheet(courseData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });

      // Upload new Excel file to Cloudinary
      const formData = new FormData();
      formData.append("file", blob, courseFileName);
      formData.append("upload_preset", "universityproject");
      formData.append("folder", "courses");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dapjccnab/auto/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      const url = data.secure_url;
      setCloudinaryURL(url);

      // Save metadata in Firestore
      await addDoc(collection(db, "coursesFiles"), {
        fileName: courseFileName,
        cloudinaryURL: url,
        uploadedAt: serverTimestamp(),
      });

      alert("✅ File uploaded successfully with updates!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Failed to upload updated file to Cloudinary");
    }
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(courseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
    XLSX.writeFile(workbook, courseFileName);
  };

  // Edit cell
  const handleCellChange = (rowIndex, key, value) => {
    const updatedData = [...courseData];
    updatedData[rowIndex][key] = value;
    setCourseData(updatedData);
  };

  // Add new row
  const handleAddRow = () => {
    if (courseData.length === 0) {
      alert("Please upload a file first.");
      return;
    }
    const newRow = {};
    Object.keys(courseData[0]).forEach((key) => {
      newRow[key] = "";
    });
    setCourseData([...courseData, newRow]);
  };

  const formatFee = (value) => {
    if (!value || isNaN(value)) return value;
    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  return (
    <div className="courses-page">
      <h2 className="courses-title">Courses</h2>
      <p className="courses-subtitle">Upload, edit, and manage your courses Excel file.</p>

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
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleCellChange(i, key, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="btn btn-add" onClick={handleAddRow}>
              <FontAwesomeIcon icon={faPlus} /> Add Row
            </button>

            <button className="btn btn-download" onClick={handleDownload}>
              <FontAwesomeIcon icon={faDownload} /> Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
