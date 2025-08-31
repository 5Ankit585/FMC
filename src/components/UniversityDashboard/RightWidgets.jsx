import React from "react";
import { FaBook, FaMapMarkerAlt, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./RightWidgets.css";

export default function RightWidgets() {
  const locationData = {
    labels: ["Delhi", "Mumbai", "Bangalore"],
    datasets: [
      {
        label: "Leads",
        data: [65, 45, 35],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <aside className="ud-right-widgets">
      
      {/* Top Courses */}
      <div className="ud-card">
        <div className="ud-card-header">
          <FaBook className="ud-icon" /> <h4>Top Courses</h4>
        </div>
        <div className="ud-progress-list">
          <div>
            <span>B.Sc Computer Science</span>
            <div className="ud-progress">
              <div className="ud-progress-bar" style={{ width: "80%" }}></div>
            </div>
          </div>
          <div>
            <span>BBA</span>
            <div className="ud-progress">
              <div className="ud-progress-bar" style={{ width: "65%", background: "#2196F3" }}></div>
            </div>
          </div>
          <div>
            <span>BCA</span>
            <div className="ud-progress">
              <div className="ud-progress-bar" style={{ width: "50%", background: "#FFC107" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Insights */}
      <div className="ud-card">
        <div className="ud-card-header">
          <FaMapMarkerAlt className="ud-icon" /> <h4>Location Insights</h4>
        </div>
        <Bar data={locationData} options={{ plugins: { legend: { display: false } } }} />
      </div>

      {/* Deadlines */}
      <div className="ud-card">
        <div className="ud-card-header">
          <FaCalendarAlt className="ud-icon" /> <h4>Deadlines</h4>
        </div>
        <ul className="ud-list-compact">
          <li><span className="deadline urgent">Application Deadline:</span> 30 Jun</li>
          <li><span className="deadline upcoming">Fee Submission:</span> 5 Jul</li>
        </ul>
      </div>

      {/* Leads Summary */}
      <div className="ud-card">
        <div className="ud-card-header">
          <FaChartLine className="ud-icon" /> <h4>Leads Conversion</h4>
        </div>
        <p className="ud-small">This month: <strong>78%</strong> conversion rate</p>
        <div className="ud-progress">
          <div className="ud-progress-bar" style={{ width: "78%", background: "#4CAF50" }}></div>
        </div>
      </div>

    </aside>
  );
}
