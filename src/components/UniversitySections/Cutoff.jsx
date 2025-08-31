import React, { useEffect, useState } from 'react';
import './Cutoff.css';
import { applyTheme } from '../../utils/themeUtils';

const cutoffData = [
  {
    course: 'B.Tech in CSE',
    open: 13567,
    general: 13567,
    ews: 25062,
    obc: 57096,
    sc: 122763,
    st: 361124,
    pwd: '-',
  },
  {
    course: 'B.Tech in ECE',
    open: 28173,
    general: 28173,
    ews: 41619,
    obc: 109062,
    sc: 222834,
    st: '-',
    pwd: 1176223,
  },
  {
    course: 'B.Tech in ME',
    open: 54356,
    general: 54356,
    ews: 79877,
    obc: 203069,
    sc: 459706,
    st: '-',
    pwd: 732816,
  },
  {
    course: 'B.Tech in IT',
    open: 17916,
    general: 17916,
    ews: 27361,
    obc: 71245,
    sc: 140198,
    st: '-',
    pwd: 494782,
  },
];

const Cutoff = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`cutoff-container ${darkMode ? 'dark' : ''}`}>
      <h2>Cutoff for Year 2024</h2>
      <div className="table-wrapper">
        <table className="cutoff-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Open</th>
              <th>General</th>
              <th>EWS</th>
              <th>OBC</th>
              <th>SC</th>
              <th>ST</th>
              <th>PWD</th>
            </tr>
          </thead>
          <tbody>
            {cutoffData.map(({ course, open, general, ews, obc, sc, st, pwd }) => (
              <tr key={course}>
                <td>{course}</td>
                <td>{open}</td>
                <td>{general}</td>
                <td>{ews}</td>
                <td>{obc}</td>
                <td>{sc}</td>
                <td>{st}</td>
                <td>{pwd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cutoff;
