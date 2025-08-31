import React, { useState, useEffect } from 'react';
import './Placement.css';
import { applyTheme } from '../../utils/themeUtils';

const recruiters = [
  'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://1000logos.net/wp-content/uploads/2021/04/Amazon-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tata_Consultancy_Services_Logo.svg',
  'https://1000logos.net/wp-content/uploads/2021/04/Accenture-logo.png',
  'https://1000logos.net/wp-content/uploads/2020/09/Adobe-Logo.png',
  'https://1000logos.net/wp-content/uploads/2020/08/Wipro-Logo.png',
  'https://1000logos.net/wp-content/uploads/2016/10/Infosys-Logo.png',
];

const branchData = [
  { branch: 'CSE', highest: '₹45 LPA', average: '₹10 LPA' },
  { branch: 'ECE', highest: '₹28 LPA', average: '₹7.5 LPA' },
  { branch: 'IT', highest: '₹32 LPA', average: '₹8.1 LPA' },
  { branch: 'ME', highest: '₹18 LPA', average: '₹6.2 LPA' },
];

const Placement = ({ darkMode }) => {
  const [openBranch, setOpenBranch] = useState(null);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleBranch = (index) => {
    setOpenBranch(openBranch === index ? null : index);
  };

  return (
    <div className={`placement-container ${darkMode ? 'dark' : ''}`}>
      <section className="hero-section">
        <h1 className="hero-title">Placement Highlights 2024</h1>
        <p className="hero-subtitle">Empowering Futures with Top Recruiters and Record-Breaking Packages</p>
        <div className="hero-stats">
          <div>🎯 95% Placement Rate</div>
          <div>💼 120+ Companies</div>
          <div>🏆 ₹45 LPA Highest</div>
          <div>📊 ₹7.8 LPA Average</div>
        </div>
      </section>

      <section className="recruiters-section">
        <h2 className="section-title">Top Recruiters</h2>
        <div className="recruiters-grid">
          {recruiters.map((logo, index) => (
            <div key={index} className="recruiter-card">
              <img src={logo} alt="Recruiter Logo" className="recruiter-logo" />
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Year-wise Placement Stats</h2>
        <div className="stats-table-wrapper">
          <table className="stats-table">
            <thead>
              <tr>
                <th className="stats-th">Year</th>
                <th className="stats-th">Companies</th>
                <th className="stats-th">Placed</th>
                <th className="stats-th">Highest CTC</th>
                <th className="stats-th">Avg CTC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="stats-td">2024</td>
                <td className="stats-td">120+</td>
                <td className="stats-td">450+</td>
                <td className="stats-td">₹45 LPA</td>
                <td className="stats-td">₹7.8 LPA</td>
              </tr>
              <tr>
                <td className="stats-td">2023</td>
                <td className="stats-td">110</td>
                <td className="stats-td">420</td>
                <td className="stats-td">₹38 LPA</td>
                <td className="stats-td">₹6.5 LPA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="branch-section">
        <h2 className="section-title">Branch-wise Placement</h2>
        <div className="branch-accordion">
          {branchData.map((item, index) => (
            <div key={index} className="accordion-item">
              <button onClick={() => toggleBranch(index)} className="accordion-toggle">
                <span className="accordion-title">{item.branch}</span>
                <span className="accordion-icon">{openBranch === index ? '▲' : '▼'}</span>
              </button>
              {openBranch === index && (
                <div className="accordion-content">
                  <p>Highest Package: <strong>{item.highest}</strong></p>
                  <p>Average Package: <strong>{item.average}</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Placement;