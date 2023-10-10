import React, { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      // You can perform actions with the selected file here, such as sending it to a server.
      console.log('Selected file:', selectedFile);
      // Reset the selected file
      setSelectedFile(null);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div>
      <h2>Upload Your university brochure</h2>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
