import React, { useState, useEffect } from "react";
import "./Applications.css";

const Applications = ({ students, addPayment }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(
      students.map((student) => ({
        id: student.id,
        name: student.name || "Unknown",
        course: student.details?.course || "Not Assigned",
        status: student.status || "Pending",
        submitted: new Date().toISOString().split("T")[0],
        university: student.university || "",
        email: student.email || "N/A",
      }))
    );
  }, [students]);

  const [paymentModal, setPaymentModal] = useState({
    open: false,
    appId: null,
    selectedMethod: null,
  });

  const [viewModal, setViewModal] = useState({
    open: false,
    student: null,
  });

  const handleStatusChange = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const openPaymentModal = (appId) => {
    setPaymentModal({ open: true, appId, selectedMethod: null });
    document.body.style.overflow = "hidden";
  };

  const closePaymentModal = () => {
    setPaymentModal({ open: false, appId: null, selectedMethod: null });
    document.body.style.overflow = "";
  };

  const selectMethod = (method) => {
    setPaymentModal((prev) => ({ ...prev, selectedMethod: method }));
  };

  const proceedPayment = () => {
    const { appId, selectedMethod } = paymentModal;
    if (!selectedMethod) return;

    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    addPayment({
      studentName: app.name,
      course: app.course,
      amount: 5000,
      status: "Pending",
      email: app.email,
    });

    alert(`Payment via ${selectedMethod.toUpperCase()} for Application ID: ${appId}`);
    closePaymentModal();
  };

  const openViewModal = (id) => {
    const student = students.find((s) => s.id === id);
    setViewModal({ open: true, student });
    document.body.style.overflow = "hidden";
  };

  const closeViewModal = () => {
    setViewModal({ open: false, student: null });
    document.body.style.overflow = "";
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Agent Panel — Student Applications</h1>
        <p className="app-subtitle">Manage approvals and collect fees easily.</p>
      </div>

      <div className="app-table-card">
        <div className="app-table-scroll">
          <table className="app-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>University</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>#{app.id}</td>
                  <td className="app-strong">{app.name}</td>
                  <td>{app.course}</td>
                  <td>{app.university || "Not Assigned"}</td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="app-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{app.submitted}</td>
                  <td>
                    <div className="app-actions">
                      <button
                        className="btn btn-blue"
                        onClick={() => openPaymentModal(app.id)}
                      >
                        Pay
                      </button>
                      <button
                        className="btn btn-yellow"
                        onClick={() => openViewModal(app.id)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {paymentModal.open && (
        <div className="app-modal-overlay" onClick={closePaymentModal}>
          <div className="app-modal" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h2 className="app-modal-title">Choose Payment Method</h2>
              <button className="app-close" onClick={closePaymentModal}>×</button>
            </div>

            <div className="app-modal-body">
              <div className="app-method-grid">
                {['bank','upi','paypal','netbanking'].map((m) => (
                  <button
                    key={m}
                    className={`app-method ${paymentModal.selectedMethod === m ? 'active' : ''}`}
                    onClick={() => selectMethod(m)}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="app-modal-footer">
              <button className="btn btn-gray" onClick={closePaymentModal}>Cancel</button>
              <button className="btn btn-blue" onClick={proceedPayment} disabled={!paymentModal.selectedMethod}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal.open && viewModal.student && (
        <div className="app-modal-overlay" onClick={closeViewModal}>
          <div className="app-modal view" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-body">
              <h3>Student Details</h3>
              <p><strong>Name:</strong> {viewModal.student.name}</p>
              <p><strong>Email:</strong> {viewModal.student.email}</p>
              <p><strong>Course:</strong> {viewModal.student.details?.course || "N/A"}</p>
              <p><strong>University:</strong> {viewModal.student.university || "N/A"}</p>
            </div>
            <div className="app-modal-footer">
              <button className="btn btn-gray" onClick={closeViewModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
