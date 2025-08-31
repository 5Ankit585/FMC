import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./Documents.css";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc as firestoreDoc } from "firebase/firestore";

export default function Documents() {
  const [documents, setDocuments] = useState([]); // Uploaded documents
  const [previewDoc, setPreviewDoc] = useState(null);

  // Fetch existing documents from Firestore
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

  // Save Cloudinary file metadata to Firestore
  const saveToFirestore = async (fileInfo) => {
    try {
      const docRef = await addDoc(collection(db, "documents"), {
        name: fileInfo.original_filename + "." + fileInfo.format,
        type: fileInfo.resource_type,
        url: fileInfo.secure_url,
        cloudinaryId: fileInfo.public_id,
        folder: fileInfo.folder || "",
        createdAt: serverTimestamp(),
      });
      console.log("Saved in Firestore with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  // Open Cloudinary Upload Widget
  const handleUpload = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dapjccnab",           // replace with your Cloudinary cloud name
        uploadPreset: "universityproject",     // your unsigned preset
        multiple: true,
        resourceType: "auto",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded:", result.info);

          // Save metadata in Firestore
          saveToFirestore(result.info);

          // Update local state for immediate UI
          const newDoc = {
            id: result.info.public_id,
            name: result.info.original_filename + "." + result.info.format,
            type: result.info.resource_type,
            url: result.info.secure_url,
          };
          setDocuments((prev) => [newDoc, ...prev]);
        } else if (error) {
          console.error("Upload error:", error);
          alert("Failed to upload document");
        }
      }
    );

    myWidget.open();
  };

  // Delete document from Firestore (files remain in Cloudinary)
  const handleDelete = async (docItem) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      // Delete from Firestore
      await deleteDoc(firestoreDoc(db, "documents", docItem.id));

      // Remove from local state
      setDocuments((prev) => prev.filter((doc) => doc.id !== docItem.id));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document");
    }
  };

  return (
    <div className="documents-page">
      <div className="upload-section">
        <button className="upload-btn" onClick={handleUpload}>
          <FontAwesomeIcon icon={faUpload} /> Select Documents
        </button>
      </div>

      {/* Display uploaded documents */}
      {documents.length > 0 ? (
        <div className="documents-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="doc-icon">{doc.type === "image" ? "🖼️" : "📄"}</div>
              <p className="doc-name">{doc.name}</p>
              <div className="doc-actions">
                <button className="btn view" onClick={() => setPreviewDoc(doc)}>
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
            <button className="modal-close" onClick={() => setPreviewDoc(null)}>✖</button>
            <h3>{previewDoc.name}</h3>
            {previewDoc.type === "image" ? (
              <img src={previewDoc.url} alt="Preview" className="doc-preview" />
            ) : (
              <iframe src={previewDoc.url} title="Document Preview" className="doc-preview"></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
