import React from "react";
import ProfileForm from "./ProfileForm";
import Courses from "./Courses";
import LatestNews from "./LatestNews";
import ApplicationBoard from "./ApplicationBoard";
import Documents from "./Documents";
import AnalyticsDashboard from "./AnalyticsDashboard"; 
import Subscription from "./Subscription";
import Settings from "./Settings";
import "./MainView.css";

export default function MainView({ route }) {
  // 🔹 Sample data
  const recentApplications = [
    { id: 1, student: "John Doe", institute: "MIT", course: "Computer Science", stage: "Submitted" },
    { id: 2, student: "Jane Smith", institute: "Stanford", course: "Mathematics", stage: "Under Review" },
    { id: 3, student: "Alice Johnson", institute: "Harvard", course: "Physics", stage: "Approved" },
  ];

  const recentReceipts = [
    { id: "R-1001", student: "John Doe", institute: "MIT", amount: "$1200" },
    { id: "R-1002", student: "Jane Smith", institute: "Stanford", amount: "$900" },
    { id: "R-1003", student: "Alice Johnson", institute: "Harvard", amount: "$1500" },
  ];

  switch (route) {
    case "My Profile":
      return (
        <div className="ud-page">
          <h2>My Profile</h2>
          <p>Edit your profile, upload images & videos, update contact details.</p>
          <ProfileForm />
        </div>
      );

    case "Courses & Fees":
      return <Courses />;

    case "News":
      return (
        <div className="ud-page">
          <h2>News & Updates</h2>
          <p>Post admission dates, events, and scholarships.</p>
          <LatestNews />
        </div>
      );

    case "Applications":
      return (
        <div className="ud-page">
          <ApplicationBoard />
        </div>
      );

    case "Documents":
      return (
        <div className="ud-page">
          <Documents />
        </div>
      );

    case "analytics":
      return (
        <div className="ud-page">
          <AnalyticsDashboard />
        </div>
      );

    case "Subscription":
      return (
        <div className="ud-page">
          <Subscription />
        </div>
      );

    case "settings":
      return (
        <div className="ud-page">
          <Settings />
        </div>
      );

    case "dashboard":
    default:
      return (
        <div className="ud-page agent-dashboard">
          {/* Stat cards */}
          <div className="stats-grid">
            <div className="stat-card">Applications This Month</div>
            <div className="stat-card">Confirmed Admissions</div>
            <div className="stat-card">Commission Earned</div>
            <div className="stat-card">Pending Actions</div>
          </div>

          {/* Action buttons */}
          <div className="actions-row">
            <div className="button-group">
              <button className="primary-btn">+ Add New Student</button>
              <button className="primary-btn">+ New Application</button>
            </div>
            <div className="link-group">
              <button className="link-btn">Withdraw Commission</button>
              <button className="link-btn">Download Statement</button>
            </div>
          </div>

          {/* Tables */}
          <div className="tables-grid">
            {/* Recent Applications */}
            <div className="table-card">
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
                  {recentApplications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.student}</td>
                      <td>{app.institute}</td>
                      <td>{app.course}</td>
                      <td>{app.stage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Receipts */}
            <div className="table-card">
              <h3>Recent Receipts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Receipt ID</th>
                    <th>Student</th>
                    <th>Institute</th>
                    <th>Amount</th>
                    <th>Down</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReceipts.map((rec) => (
                    <tr key={rec.id}>
                      <td>{rec.id}</td>
                      <td>{rec.student}</td>
                      <td>{rec.institute}</td>
                      <td>{rec.amount}</td>
                      <td>
                        <button className="primary-btn" style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem" }}>
                          ⬇
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }
}
