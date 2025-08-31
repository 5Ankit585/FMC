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
                  <tr>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                  <tr>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }
}