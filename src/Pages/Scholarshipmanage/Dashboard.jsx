import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaUserGraduate, FaTasks, FaCheckCircle, FaBell } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const location = useLocation();

  // Dummy data for metrics
  const metrics = [
    { title: "Total Scholarships", value: 124, icon: <FaUserGraduate /> },
    { title: "Pending Approvals", value: 12, icon: <FaTasks /> },
    { title: "Approved", value: 95, icon: <FaCheckCircle /> },
    { title: "Notifications", value: 5, icon: <FaBell /> },
  ];

  // Pie chart data
  const pieData = [
    { name: "Approved", value: 95, color: "#4F46E5" },
    { name: "Pending", value: 12, color: "#F59E0B" },
    { name: "Rejected", value: 17, color: "#EF4444" },
  ];

  // Bar chart data
  const barData = [
    { month: "Jan", applications: 20 },
    { month: "Feb", applications: 35 },
    { month: "Mar", applications: 50 },
    { month: "Apr", applications: 30 },
    { month: "May", applications: 40 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar location={location} />

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-inner container">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Scholarship Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome to the Scholarship Admin Dashboard.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="dashboard-metrics-grid">
            {metrics.map((metric, idx) => (
              <div key={idx} className="dashboard-metric-card">
                <div className="dashboard-metric-icon">{metric.icon}</div>
                <div>
                  <p className="dashboard-metric-title">{metric.title}</p>
                  <p className="dashboard-metric-value">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scholarship Status Card */}
          <div className="dashboard-card dashboard-status-card">
            <h2 className="dashboard-card-title">Scholarship Status</h2>

            <div className="dashboard-status-charts">
              {/* Pie Chart */}
              <div className="dashboard-status-chart">
                <h3 className="dashboard-status-chart-title">Overall Status</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label={(entry) => entry.name}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="dashboard-legend">
                  {pieData.map((entry, index) => (
                    <span key={index} style={{ color: entry.color, marginRight: "1rem" }}>
                      {entry.name}: {entry.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="dashboard-status-chart">
                <h3 className="dashboard-status-chart-title">Applications per Month</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="dashboard-chart-note">
                  Number of applications submitted each month
                </p>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="dashboard-card dashboard-recent-applications">
            <h2 className="dashboard-card-title">Recent Applications</h2>
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Scholarship</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Merit Scholarship</td>
                    <td className="dashboard-approved">Approved</td>
                    <td>2025-09-15</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>Need-Based Scholarship</td>
                    <td className="dashboard-pending">Pending</td>
                    <td>2025-09-14</td>
                  </tr>
                  <tr>
                    <td>Alice Johnson</td>
                    <td>Merit Scholarship</td>
                    <td className="dashboard-rejected">Rejected</td>
                    <td>2025-09-13</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
