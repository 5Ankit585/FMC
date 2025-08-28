import React from 'react';
import profile from '../Images/regpic.webp';
import './Marquee.css';

const Marquee = () => {
  return (
    <section className='marquee-section'>
      <div className='marquee-container'>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Best Colleges for Diploma in Mechanical Engineering</h3>
            <p>Check Details of Best colleges for Diploma in mechanical engineering for ranking</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Top Diploma Colleges in Civil Engineering</h3>
            <p>Explore leading colleges for Diploma in Civil Engineering with ranking details</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Best Diploma Colleges in Electrical Engineering</h3>
            <p>Get insights into top colleges for Electrical Engineering diploma courses</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Top Computer Engineering Diploma Colleges</h3>
            <p>Discover colleges offering best Computer Engineering diploma programs</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Diploma Colleges in Electronics Engineering</h3>
            <p>Check rankings and details of best electronics engineering diploma colleges</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Top Diploma Colleges in Automobile Engineering</h3>
            <p>Explore colleges offering diploma in automobile engineering with good placement</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Best Diploma Colleges for Architecture</h3>
            <p>Find top colleges providing diploma in architecture with course details</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Diploma Colleges in Chemical Engineering</h3>
            <p>Check best colleges offering diploma in chemical engineering courses</p>
          </div>
        </div>

        <div className="marquee-card">
          <img src={profile} alt="/" />
          <div className="card-content">
            <h3>Top Diploma Colleges in Information Technology</h3>
            <p>Explore the leading IT diploma colleges and their rankings</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Marquee;
