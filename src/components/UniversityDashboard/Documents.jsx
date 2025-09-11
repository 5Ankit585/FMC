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

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);

  // Fetch docs from Firestore
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

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "universityproject"); // your preset
    data.append("cloud_name", "dapjccnab"); // your cloud name

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dapjccnab/auto/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploaded = await res.json();
      console.log("Uploaded:", uploaded);

      // Save metadata to Firestore
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

  // Delete doc
  const handleDelete = async (docItem) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDoc(firestoreDoc(db, "documents", docItem.id));
      setDocuments((prev) => prev.filter((doc) => doc.id !== docItem.id));
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return (
    <div className="documents-page">
      <div className="upload-section">
        <button className="upload-btn" onClick={() => setShowPopup(true)}>
          <FontAwesomeIcon icon={faUpload} /> Upload Document
        </button>
      </div>

      {/* Small custom popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Document</h3>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
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
              <div className="doc-icon">
                {doc.type === "image" ? "🖼️" : "📄"}
              </div>
              <p className="doc-name">{doc.name}</p>
              <div className="doc-actions">
                <button className="btn view" onClick={() => setPreviewDoc(doc)}>
                  <FontAwesomeIcon icon={faEye} /> View
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDelete(doc)}
                >
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
            {previewDoc.type === "image" ? (
              <img src={previewDoc.url} alt="Preview" className="doc-preview" />
            ) : (
              <iframe
                src={previewDoc.url}
                title="Document Preview"
                className="doc-preview"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
