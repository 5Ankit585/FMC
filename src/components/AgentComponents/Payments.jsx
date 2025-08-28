import React from "react";
import emailjs from "emailjs-com";
import './Payments.css';


const Payments = ({ payments, addPayment, updatePayment }) => {
  // 🔹 Send Email via EmailJS
  const sendEmail = (payment, newStatus) => {
    const templateParams = {
      to_email: payment.email,
      studentName: payment.studentName,
      course: payment.course,
      amount: payment.amount,
      status: newStatus,
      date: payment.date,
      message: `Your payment has been updated to "${newStatus}".`,
    };

    emailjs
      .send(
        "service_rbc4u72", // 👉 Replace with EmailJS Service ID
        "template_163su2m", // 👉 Replace with EmailJS Template ID
        templateParams,
        "1HOFIU2nqy2IjgAzB" // 👉 Replace with EmailJS Public Key
      )
      .then(
        (response) => console.log("✅ Email sent:", response.status, response.text),
        (err) => console.error("❌ Email error:", err)
      );
  };

  // 🔹 Handle status change from dropdown
  const handleStatusChange = (id, newStatus) => {
    updatePayment(id, { status: newStatus });
    const payment = payments.find((p) => p.id === id);
    sendEmail(payment, newStatus);
  };

  // 🔹 Helper to get status class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Completed":
        return "status-completed";
      case "Refunded":
        return "status-refunded";
      default:
        return "";
    }
  };

  // 🔹 Handle receipt download
  const handleDownloadReceipt = (payment) => {
    const receiptContent = `
Payment Receipt
---------------
ID: ${payment.id}
Student: ${payment.studentName}
Course: ${payment.course}
Email: ${payment.email}
Amount: $${payment.amount}
Status: ${payment.status}
Date: ${payment.date}
---------------`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${payment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="payments-container">
      <h1 className="text-3xl font-bold mb-6">Agent Panel - Payment Management</h1>
      <div className="overflow-x-auto">
        <table className="payments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Email</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.studentName}</td>
                <td>{payment.course}</td>
                <td>{payment.email}</td>
                <td>{payment.amount}</td>
                <td>
                  <select
                    value={payment.status}
                    onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                    className={`status-select ${getStatusClass(payment.status)}`}
                  >
                    <option value="Pending" className="status-pending">Pending</option>
                    <option value="Completed" className="status-completed">Completed</option>
                    <option value="Refunded" className="status-refunded">Refunded</option>
                  </select>
                </td>
                <td>{payment.date}</td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => handleDownloadReceipt(payment)}
                    title="Download Receipt"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;