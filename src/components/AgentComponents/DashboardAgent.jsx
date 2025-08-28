import React from "react";
import "./DashboardAgent.css";

function RecentApplications() {
  const data = [
    { student: "John Doe", institute: "ABC University", course: "MBA", stage: "Interview" },
    { student: "Jane Smith", institute: "XYZ College", course: "B.Tech", stage: "Submitted" },
  ];

  return (
    <div className="ad-table-card">
      <h3>Recent Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Institute</th>
            <th>Course</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.student}</td>
              <td>{row.institute}</td>
              <td>{row.course}</td>
              <td>{row.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecentReceipts() {
  const data = [
    { id: "#R001", student: "John Doe", institute: "ABC University", amount: "$1,200" },
    { id: "#R002", student: "Jane Smith", institute: "XYZ College", amount: "$900" },
  ];

  return (
    <div className="ad-table-card">
      <h3>Recent Receipts</h3>
      <table>
        <thead>
          <tr>
            <th>Receipt ID</th>
            <th>Student</th>
            <th>Institute</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.student}</td>
              <td>{row.institute}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatsCards() {
  const stats = [
    { label: "Applications This Month", value: 42 },
    { label: "Confirmed Admissions", value: 18 },
    { label: "Commission Earned", value: "$3,200" },
    { label: "Pending Actions", value: 7 },
  ];

  return (
    <div className="ad-stats">
      {stats.map((stat, i) => (
        <div className="ad-stat-card" key={i}>
          <div className="ad-stat-value">{stat.value}</div>
          <div className="ad-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-content">
      {/* Stat Cards */}
      <StatsCards />

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <button className="action-button">+ Add New Student</button>
        <button className="action-button">+ New Application</button>
        <button className="action-button">Withdraw Commission</button>
        <button className="action-button">Download Statement</button>
      </div>

      {/* Tables */}
      <div className="dashboard-tables">
        <RecentApplications />
        <RecentReceipts />
      </div>
    </div>
  );
}