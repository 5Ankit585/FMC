import React, { useState, useEffect } from 'react';
import './Aboutus.css';

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
  };

  // Image state and data
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    'https://i.pinimg.com/736x/93/85/5b/93855bc9e97f4ec0f5df5f12b48169b5.jpg',
    'https://i.pinimg.com/736x/93/85/5b/93855bc9e97f4ec0f5df5f12b48169b5.jpg', 
    'https://i.pinimg.com/736x/93/85/5b/93855bc9e97f4ec0f5df5f12b48169b5.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`about-us-container ${darkMode ? 'dark' : ''}`}>
      <div className="about-us-content">
        <h2 className="about-us-title">About Us</h2>
        <p className="about-us-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      <div className="about-us-image">
        <div className="image-carousel">
          <div
            className="carousel-images"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Campus Slide ${index + 1}`}
                className="carousel-image"
              />
            ))}
          </div>
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;