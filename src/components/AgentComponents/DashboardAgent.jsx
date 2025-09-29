import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardAgent.css";

function RecentApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students/recent");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching recent applications:", err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="ad-table-card">
      <h3>Recent Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Institute</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.university}</td>
              <td>{s.details?.course || "N/A"}</td>
              <td>{s.status}</td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No recent applications
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function RecentReceipts() {
  // yaha payments collection add karne ke baad same fetch karna hoga
  const data = [
    { id: "#R001", student: "John Doe", institute: "ABC University", amount: "₹1,200" },
    { id: "#R002", student: "Jane Smith", institute: "XYZ College", amount: "₹900" },
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
  const [stats, setStats] = useState({
    applicationsThisMonth: 0,
    confirmedAdmissions: 0,
    commissionEarned: 0,
    pendingApplications: 0, 
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const statsArr = [
    { label: "Applications This Month", value: stats.applicationsThisMonth },
    { label: "Confirmed Admissions", value: stats.confirmedAdmissions },
    { label: "Commission Earned", value: `₹${stats.commissionEarned}` },
    { label: "Pending Applications", value: stats.pendingApplications }, // 👈 updated
  ];

  return (
    <div className="ad-stats">
      {statsArr.map((stat, i) => (
        <div className="ad-stat-card" key={i}>
          <div className="ad-stat-value">{stat.value}</div>
          <div className="ad-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardAgent() {
  return (
    <div className="dashboard-content">
      <StatsCards />
      <div className="dashboard-actions">
        <button className="action-button">Download Application</button>
      </div>
      <div className="dashboard-tables">
        <RecentApplications />
        <RecentReceipts />
      </div>
    </div>
  );
}
