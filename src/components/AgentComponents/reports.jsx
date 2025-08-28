import React, { useState } from 'react';
import './reports.css';

const Reports = () => {
  const [filter, setFilter] = useState('All'); 
  const metrics = [
    { label: 'Total Applications', value: 150 },
    { label: 'Admissions Confirmed', value: 85 },
    { label: 'Total Commissions ($)', value: 12500.75 },
    { label: 'Pending Payments', value: 12 },
  ];

  const reports = [
    { id: 'R001', student: 'John Doe', course: 'Computer Science', applicationStatus: 'Approved', paymentStatus: 'Completed', commission: 500, date: '2025-08-10' },
    { id: 'R002', student: 'Jane Smith', course: 'Mathematics', applicationStatus: 'Pending', paymentStatus: 'Pending', commission: 0, date: '2025-08-12' },
    { id: 'R003', student: 'Alice Johnson', course: 'Physics', applicationStatus: 'Rejected', paymentStatus: 'N/A', commission: 0, date: '2025-08-09' },
    { id: 'R004', student: 'Bob Wilson', course: 'Biology', applicationStatus: 'Approved', paymentStatus: 'Completed', commission: 450, date: '2025-08-11' },
  ];

  const filteredReports = filter === 'All' 
    ? reports 
    : reports.filter(report => report.applicationStatus === filter);

  return (
    <div className="reports-container">
      <h1 className="text-3xl font-bold mb-6">Agent Panel - Reports & Analytics</h1>

      {/* Metrics Summary */}
      <div className="reports-metrics">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Controls */}
      <div className="filter-controls mt-8">
        <h2 className="text-xl font-semibold mb-4">Detailed Reports</h2>
        <select 
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Applications</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto mt-4">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th>Commission ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.student}</td>
                <td>{report.course}</td>
                <td>{report.applicationStatus}</td>
                <td>{report.paymentStatus}</td>
                <td>{report.commission.toFixed(2)}</td>
                <td>{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;