import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="trending-header">
        <h2>Trending Exams</h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee">
          <span>JEE Advanced 2025 • NEET UG 2025 • UPSC 2025 • GATE 2025 • CAT 2025 • SSC CGL 2025 • AIIMS 2025 •</span>
        </div>
      </div>

      <div className="marquee-wrapper marquee-upcoming">
        <div className="marquee">
          <span>Upcoming Top Exams: NDA 2025 • CLAT 2025 • IBPS PO 2025 • RRB NTPC 2025 • LIC AAO 2025 •</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
