import React, { useState, useMemo, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './wallet.css';

const Wallet = () => {
  const [balance, setBalance] = useState(3200.5);
  const [transactions, setTransactions] = useState([
    {
      id: uuidv4(),
      date: '2025-08-10',
      student: 'John Doe',
      course: 'Computer Science',
      amount: 500,
      status: 'Credited',
      paymentMethod: 'N/A',
      paymentDetails: {},
    },
    {
      id: uuidv4(),
      date: '2025-08-12',
      student: 'Jane Smith',
      course: 'Mathematics',
      amount: 450,
      status: 'Credited',
      paymentMethod: 'N/A',
      paymentDetails: {},
    },
    {
      id: uuidv4(),
      date: '2025-08-09',
      student: 'Alice Johnson',
      course: 'Physics',
      amount: 200,
      status: 'Withdrawn',
      paymentMethod: 'Bank Transfer',
      paymentDetails: {
        accountHolder: 'Alice Johnson',
        accountNumber: '1234567890',
        ifsc: 'HDFC0001234',
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');

  // Withdraw form state
  const [form, setForm] = useState({
    amount: '',
    method: 'Bank Transfer',
    upiId: '',
    accountNumber: '',
    ifsc: '',
    accountHolder: '',
    paypalEmail: '',
    attachment: null,
  });

  // For focusing the first input when modal opens
  const amountInputRef = useRef(null);
  useEffect(() => {
    if (isModalOpen && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [isModalOpen]);

  const openWithdrawModal = () => {
    setIsModalOpen(true);
    setNote('');
  };

  const closeWithdrawModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, attachment: file }));
  };

  const resetForm = () => {
    setForm({
      amount: '',
      method: 'Bank Transfer',
      upiId: '',
      accountNumber: '',
      ifsc: '',
      accountHolder: '',
      paypalEmail: '',
      attachment: null,
    });
  };

  const validateForm = () => {
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return 'Please enter a valid withdrawal amount.';
    if (amount > balance) return 'Insufficient balance for withdrawal.';

    if (form.method === 'Bank Transfer') {
      if (!form.accountHolder || !form.accountNumber || !form.ifsc) {
        return 'Please fill Account Holder, Account Number and IFSC for Bank Transfer.';
      }
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.trim().toUpperCase())) {
        return 'Please enter a valid IFSC (e.g., HDFC0001234).';
      }
    } else if (form.method === 'UPI') {
      if (!form.upiId) return 'Please enter your UPI ID.';
      if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(form.upiId.trim())) return 'Please enter a valid UPI ID (e.g., name@bank).';
    } else if (form.method === 'PayPal') {
      if (!form.paypalEmail) return 'Please enter your PayPal email.';
      if (!/^\S+@\S+\.\S+$/.test(form.paypalEmail.trim())) return 'Please enter a valid email for PayPal.';
    }
    return '';
  };

  const handleSubmitWithdraw = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    const amount = parseFloat(form.amount);
    const paymentDetails =
      form.method === 'Bank Transfer'
        ? {
            accountHolder: form.accountHolder,
            accountNumber: form.accountNumber,
            ifsc: form.ifsc,
          }
        : form.method === 'UPI'
        ? { upiId: form.upiId }
        : { paypalEmail: form.paypalEmail };

    // Simulate withdrawal success
    setBalance((b) => b - amount);
    setTransactions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
        student: 'N/A',
        course: 'N/A',
        amount,
        status: 'Withdrawn',
        paymentMethod: form.method,
        paymentDetails,
      },
    ]);

    if (form.attachment) {
      console.log('Attachment selected:', {
        name: form.attachment.name,
        size: form.attachment.size,
        type: form.attachment.type,
      });
    }

    setNote(`Withdrawal of $${amount.toFixed(2)} via ${form.method} submitted successfully!`);
    closeWithdrawModal();
    resetForm();
  };

  const downloadReceipt = (transaction) => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('Error: jsPDF library is not loaded. Please ensure the jsPDF script is included.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Withdrawal Receipt', 105, 20, { align: 'center' });

    // Transaction Details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    let y = 40;

    doc.text('Transaction Details', 20, y);
    doc.setLineWidth(0.5);
    doc.line(20, y + 2, 190, y + 2); // Underline
    y += 10;

    doc.text(`Transaction ID: ${transaction.id || 'N/A'}`, 20, y);
    y += 8;
    doc.text(`Date: ${transaction.date || 'N/A'}`, 20, y);
    y += 8;
    doc.text(`Amount: $${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}`, 20, y);
    y += 8;
    doc.text(`Status: ${transaction.status || 'N/A'}`, 20, y);
    y += 8;
    doc.text(`Payment Method: ${transaction.paymentMethod || 'N/A'}`, 20, y);
    y += 12;

    // Payment Details
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Details', 20, y);
    doc.line(20, y + 2, 190, y + 2); // Underline
    doc.setFont('helvetica', 'normal');
    y += 10;

    if (transaction.paymentMethod === 'Bank Transfer') {
      doc.text(`Account Holder: ${transaction.paymentDetails.accountHolder || 'N/A'}`, 20, y);
      y += 8;
      doc.text(`Account Number: ${transaction.paymentDetails.accountNumber || 'N/A'}`, 20, y);
      y += 8;
      doc.text(`IFSC Code: ${transaction.paymentDetails.ifsc || 'N/A'}`, 20, y);
    } else if (transaction.paymentMethod === 'UPI') {
      doc.text(`UPI ID: ${transaction.paymentDetails.upiId || 'N/A'}`, 20, y);
    } else if (transaction.paymentMethod === 'PayPal') {
      doc.text(`PayPal Email: ${transaction.paymentDetails.paypalEmail || 'N/A'}`, 20, y);
    } else {
      doc.text('No additional payment details available.', 20, y);
    }
    y += 12;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for using Commission Wallet!', 105, y, { align: 'center' });
    y += 8;
    doc.text('Contact: support@commissionwallet.com', 105, y, { align: 'center' });

    // Save PDF
    try {
      doc.save(`withdrawal_receipt_${transaction.id.slice(0, 8)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  const shortId = (id) => (id ? id.slice(0, 8) + '…' : '');

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions]);

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Agent Panel – Commission Wallet</h1>
      <p className="wallet-subtitle">Track credits & withdrawals, and manage your payout preferences.</p>

      {/* Hero with centered balance card */}
      <section className="wallet-hero">
        <div className="wallet-balance-card" role="region" aria-label="Current balance">
          <p className="wallet-balance-title">Current Balance</p>
          <p className="wallet-balance-amount">${balance.toFixed(2)}</p>
          <p className="card-hint">Withdraw to Bank / UPI / PayPal</p>

          <button className="action-btn withdraw-btn" onClick={openWithdrawModal}>
            Withdraw Funds
          </button>

          {note ? (
            <div className="inline-note" role="status">
              {note}
            </div>
          ) : null}
        </div>
      </section>

      {/* Transactions */}
      <section className="wallet-table-container">
        <h2 className="wallet-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', textAlign: 'left' }}>
          Transaction History
        </h2>
        <div className="wallet-table-wrapper">
          <table className="wallet-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Student</th>
                <th>Course</th>
                <th>Amount ($)</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td title={tx.id}>{shortId(tx.id)}</td>
                  <td>{tx.date}</td>
                  <td>{tx.student}</td>
                  <td>{tx.course}</td>
                  <td>{tx.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        tx.status === 'Credited' ? 'status-credited' : 'status-withdrawn'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>{tx.paymentMethod}</td>
                  <td>
                    {tx.status === 'Withdrawn' && (
                      <button
                        className="download-btn"
                        onClick={() => downloadReceipt(tx)}
                        aria-label={`Download receipt for transaction ${tx.id}`}
                      >
                        Download Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Withdraw Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            e.stopPropagation();
            closeWithdrawModal();
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Withdraw funds"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">Withdraw Funds</h3>
              <button
                className="modal-close"
                aria-label="Close withdraw modal"
                onClick={closeWithdrawModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitWithdraw}>
              <div className="modal-body">
                <div className="input-group">
                  <label htmlFor="amount" className="input-label">Withdrawal Amount ($)</label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className="text-input"
                    value={form.amount}
                    onChange={onChange}
                    ref={amountInputRef}
                    placeholder="e.g., 150.00"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="method" className="input-label">Payment Method</label>
                  <select
                    id="method"
                    name="method"
                    className="select-input"
                    value={form.method}
                    onChange={onChange}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                {form.method === 'Bank Transfer' && (
                  <>
                    <div className="input-group">
                      <label htmlFor="accountHolder" className="input-label">Account Holder Name</label>
                      <input
                        id="accountHolder"
                        name="accountHolder"
                        type="text"
                        className="text-input"
                        value={form.accountHolder}
                        onChange={onChange}
                        placeholder="As per bank records"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="accountNumber" className="input-label">Account Number</label>
                      <input
                        id="accountNumber"
                        name="accountNumber"
                        type="text"
                        className="text-input"
                        value={form.accountNumber}
                        onChange={onChange}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="ifsc" className="input-label">IFSC Code</label>
                      <input
                        id="ifsc"
                        name="ifsc"
                        type="text"
                        className="text-input"
                        value={form.ifsc}
                        onChange={onChange}
                        placeholder="e.g., HDFC0001234"
                      />
                    </div>
                  </>
                )}

                {form.method === 'UPI' && (
                  <div className="input-group">
                    <label htmlFor="upiId" className="input-label">UPI ID</label>
                    <input
                      id="upiId"
                      name="upiId"
                      type="text"
                      className="text-input"
                      value={form.upiId}
                      onChange={onChange}
                      placeholder="e.g., name@bank"
                    />
                  </div>
                )}

                {form.method === 'PayPal' && (
                  <div className="input-group">
                    <label htmlFor="paypalEmail" className="input-label">PayPal Email</label>
                    <input
                      id="paypalEmail"
                      name="paypalEmail"
                      type="email"
                      className="text-input"
                      value={form.paypalEmail}
                      onChange={onChange}
                      placeholder="your@email.com"
                    />
                  </div>
                )}

                <div className="input-group">
                  <label htmlFor="attachment" className="input-label">
                    Optional Attachment (Proof/Receipt – PDF/PNG/JPG)
                  </label>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    className="file-input"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={onFileChange}
                  />
                  {form.attachment && (
                    <small style={{ display: 'block', marginTop: '0.375rem', color: '#6b7280' }}>
                      Selected: {form.attachment.name}
                    </small>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeWithdrawModal}>
                  Cancel
                </button>
                <button type="submit" className="action-btn withdraw-btn">
                  Submit Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;