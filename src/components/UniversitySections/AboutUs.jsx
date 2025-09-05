import React, { useState, useEffect, useMemo } from "react";
import "./Aboutus.css";

const AboutUs = ({ university }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Collect only aboutImages (5 required)
  const images = useMemo(() => {
    if (!university) return [];
    return (university.aboutImages || []).slice(0, 5); // enforce max 5
  }, [university]);

  // Auto-slide
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (!university) {
    return <p className="p-4">Loading About Us...</p>;
  }

  return (
    <div className="about-us-container">
      {/* Title */}
      <h2 className="about-us-title">About {university.instituteName}</h2>

      {/* Description */}
      <p className="about-us-description">{university.description}</p>

      {/* Image Carousel */}
      <div className="about-us-image">
        {images.length > 0 ? (
          <div className="image-carousel">
            <div
              className="carousel-images"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`About Slide ${index + 1}`}
                  className="carousel-image"
                />
              ))}
            </div>
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`indicator ${
                    currentSlide === index ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
