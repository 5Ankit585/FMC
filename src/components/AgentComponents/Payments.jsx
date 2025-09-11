import React from "react";
import emailjs from "emailjs-com";
import "./Payments.css";

const Payments = ({ payments, addPayment, updatePayment }) => {
  // Send Email via EmailJS
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
        "service_rbc4u72",
        "template_163su2m",
        templateParams,
        "1HOFIU2nqy2IjgAzB"
      )
      .then(
        (response) => console.log("✅ Email sent:", response.status, response.text),
        (err) => console.error("❌ Email error:", err)
      );
  };

  const handleStatusChange = (id, newStatus) => {
    updatePayment(id, { status: newStatus });
    const payment = payments.find((p) => p.id === id);
    sendEmail(payment, newStatus);
  };

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
      {/* 🔹 Panel Header */}
      <header className="payments-header">
        <h2 className="payments-title">Agent Panel — Payment Management</h2>
        <p className="payments-subtitle">
          Manage payment statuses, send receipts, and notify students.
        </p>
      </header>

      {/* 🔹 Table */}
      <div className="pyament-table-wrapper">
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
                <td>#{payment.id}</td>
                <td className="strong-text">{payment.studentName}</td>
                <td>{payment.course}</td>
                <td>{payment.email}</td>
                <td>${payment.amount}</td>
                <td>
                  <select
                    value={payment.status}
                    onChange={(e) =>
                      handleStatusChange(payment.id, e.target.value)
                    }
                    className={`status-select ${getStatusClass(payment.status)}`}
                  >
                    <option value="Pending" className="status-pending">
                      Pending
                    </option>
                    <option value="Completed" className="status-completed">
                      Completed
                    </option>
                    <option value="Refunded" className="status-refunded">
                      Refunded
                    </option>
                  </select>
                </td>
                <td>{payment.date}</td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => handleDownloadReceipt(payment)}
                    title="Download Receipt"
                  >
                    ⬇
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
