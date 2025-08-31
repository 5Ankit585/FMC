import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import './Gallery.css';
import Aside from './Aside'; // import the sidebar

const Gallery = ({ darkMode }) => {
  const [showMoreInfra, setShowMoreInfra] = useState(false);
  const [showMoreEvents, setShowMoreEvents] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const infrastructureImages = [
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745234452086.JPG',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745240450871.jpg',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745240450871.jpg',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745240450871.jpg',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745234452086.JPG',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745240450871.jpg',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745240450871.jpg',
    'https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1745240450871.jpg',
  ];

  const eventImages = [...infrastructureImages];

  const visibleInfraImages = showMoreInfra
    ? infrastructureImages
    : infrastructureImages.slice(0, 4);

  const visibleEventImages = showMoreEvents
    ? eventImages
    : eventImages.slice(0, 4);

  return (
    <div className={`gallery-layout ${darkMode ? 'dark' : ''}`}>
      {/* Main content */}
      <div className="gallery-main">
        <section className="gallery-section">
          <h2 className="heading">University Infrastructure Gallery</h2>
          <div className="image-layout">
            {visibleInfraImages.map((src, index) => (
              <div
                key={`infra-${index}`}
                className={`image-item ${index === 0 ? 'main-image' : ''}`}
              >
                <img src={src} alt={`Infrastructure Image ${index + 1}`} />
                <button
                  className="preview-btn"
                  onClick={() => setPreviewImage(src)}
                >
                  <FaEye />
                </button>
              </div>
            ))}
            <div
              className="image-item show-more-item"
              onClick={() => setShowMoreInfra(!showMoreInfra)}
            >
              {showMoreInfra ? 'Show less' : 'Show more'}
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <h2 className="heading">Events Gallery</h2>
          <div className="image-layout">
            {visibleEventImages.map((src, index) => (
              <div
                key={`event-${index}`}
                className={`image-item ${index === 0 ? 'main-image' : ''}`}
              >
                <img src={src} alt={`Event Image ${index + 1}`} />
                <button
                  className="preview-btn"
                  onClick={() => setPreviewImage(src)}
                >
                  <FaEye />
                </button>
              </div>
            ))}
            <div
              className="image-item show-more-item"
              onClick={() => setShowMoreEvents(!showMoreEvents)}
            >
              {showMoreEvents ? 'Show less' : 'Show more'}
            </div>
          </div>
        </section>

        {previewImage && (
          <div
            className="preview-modal"
            onClick={() => setPreviewImage(null)}
          >
            <img src={previewImage} alt="Preview" />
          </div>
        )}
      </div>
      <div className="gallery-aside">
        <Aside />
      </div>
    </div>
  );
};

export default Gallery;
