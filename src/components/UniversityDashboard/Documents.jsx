import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./Documents.css";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc as firestoreDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import Papa from "papaparse";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewData, setPreviewData] = useState([]); // Excel/CSV preview
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);

  // Fetch documents from Firestore
  useEffect(() => {
    const fetchDocuments = async () => {
      const q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docsArray);
    };
    fetchDocuments();
  }, []);

  // Upload file to Cloudinary
  const uploadToCloudinary = async () => {
    if (!file) return;

    // For Excel/CSV preview immediately
    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setPreviewData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith(".csv")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parsed = Papa.parse(text, { header: false });
        setPreviewData(parsed.data);
      };
      reader.readAsText(file);
    }

    const dataForm = new FormData();
    dataForm.append("file", file);
    dataForm.append("upload_preset", "universityproject");
    dataForm.append("cloud_name", "dapjccnab");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dapjccnab/auto/upload",
        { method: "POST", body: dataForm }
      );
      const uploaded = await res.json();

      const docRef = await addDoc(collection(db, "documents"), {
        name: uploaded.original_filename + "." + uploaded.format,
        type: uploaded.resource_type,
        url: uploaded.secure_url,
        cloudinaryId: uploaded.public_id,
        createdAt: serverTimestamp(),
      });

      setDocuments((prev) => [
        {
          id: docRef.id,
          name: uploaded.original_filename + "." + uploaded.format,
          type: uploaded.resource_type,
          url: uploaded.secure_url,
        },
        ...prev,
      ]);

      setShowPopup(false);
      setFile(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed!");
    }
  };

  // Delete document
  const handleDelete = async (docItem) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDoc(firestoreDoc(db, "documents", docItem.id));
      setDocuments((prev) => prev.filter((doc) => doc.id !== docItem.id));
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  // Render table for Excel/CSV preview
  const renderTable = (data) => (
    <div style={{ maxHeight: "60vh", overflow: "auto" }}>
      <table className="data-table">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="documents-page">
      {/* Upload section */}
      <div className="upload-section">
        <button className="upload-btn" onClick={() => setShowPopup(true)}>
          <FontAwesomeIcon icon={faUpload} /> Upload Document
        </button>
      </div>

      {/* Upload popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Document</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <div className="popup-actions">
              <button onClick={uploadToCloudinary} disabled={!file}>
                Upload
              </button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Documents list */}
      {documents.length > 0 ? (
        <div className="documents-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="doc-icon">{doc.type === "image" ? "🖼️" : "📄"}</div>
              <p className="doc-name">{doc.name}</p>
              <div className="doc-actions">
                <button
                  className="btn view"
                  onClick={() => {
                    setPreviewDoc(doc);
                    // For Excel/CSV from Cloudinary, we cannot preview due to CORS
                    setPreviewData([]);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} /> View
                </button>
                <button className="btn delete" onClick={() => handleDelete(doc)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-docs">No documents uploaded yet.</p>
      )}

      {/* Preview modal */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreviewDoc(null)}>
              ✖
            </button>
            <h3>{previewDoc.name}</h3>

            {/* Preview logic */}
            {previewDoc.type === "image" ? (
              <img src={previewDoc.url} alt="Preview" className="doc-preview" />
            ) : previewDoc.name.endsWith(".pdf") ? (
              <iframe
                src={previewDoc.url}
                title="PDF Preview"
                className="doc-preview"
                sandbox="allow-same-origin allow-scripts"
              ></iframe>
            ) : previewDoc.name.endsWith(".xlsx") ||
              previewDoc.name.endsWith(".xls") ||
              previewDoc.name.endsWith(".csv") ? (
              previewData.length > 0 ? (
                renderTable(previewData)
              ) : (
                <p>
                  Excel/CSV preview works immediately after upload. Download to view previously uploaded files.
                </p>
              )
            ) : (
              <p>Preview not available. Please download to view this file.</p>
            )}

            <div className="download-btn-container">
              <a href={previewDoc.url} download={previewDoc.name} className="btn download">
                ⬇ Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
