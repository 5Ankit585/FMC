import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Banknote, BellRing, Landmark } from "lucide-react";

export default function ScholarshipsLoans() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(tenure);
    if (principal && rate && n) {
      const emiValue =
        (principal * rate * Math.pow(1 + rate, n)) /
        (Math.pow(1 + rate, n) - 1);
      setEmi(emiValue.toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8"
      >
        🎓 Scholarships & Loans
      </motion.h1>

      {/* Unified Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-gradient-to-r from-indigo-500 to-blue-600 inline-block pb-1">
          Scholarships
        </h2>

        {/* Applied Scholarships Form */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-indigo-600 w-7 h-7" />
            <h3 className="text-xl font-semibold text-gray-800">
              Applied Scholarships
            </h3>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter scholarship name" />
            </div>
            <div>
              <label className="block text-gray-700">Provider</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter provider name" />
            </div>
            <div>
              <label className="block text-gray-700">Status</label>
              <select className="w-full border rounded-lg p-2">
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Amount</label>
              <input type="number" className="w-full border rounded-lg p-2" placeholder="Enter amount" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700">Deadline</label>
              <input type="date" className="w-full border rounded-lg p-2" />
            </div>
          </form>
        </div>

        {/* Eligible Scholarships */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BellRing className="text-green-600 w-7 h-7" />
            <h3 className="text-xl font-semibold text-gray-800">
              Eligible Scholarships (AI Suggested)
            </h3>
          </div>
          <p className="text-gray-600 mb-3">Based on your profile, you may qualify for:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Women in Tech Fellowship – Deadline: Oct 15</li>
            <li>State Minority Scholarship – Deadline: Sep 30</li>
          </ul>
        </div>

        {/* Government Schemes */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Landmark className="text-blue-600 w-7 h-7" />
            <h3 className="text-xl font-semibold text-gray-800">Government Schemes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Select State</label>
              <select className="w-full border rounded-lg p-2">
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Uttar Pradesh</option>
                <option>Tamil Nadu</option>
                <option>Delhi</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Select Category</label>
              <select className="w-full border rounded-lg p-2">
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>Minority</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Search</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Search scheme" />
            </div>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>State Education Loan Subsidy Scheme</li>
            <li>Central OBC Scholarship – Income Bracket Eligible</li>
          </ul>
        </div>

        {/* Loan Applications */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Banknote className="text-pink-600 w-7 h-7" />
            <h3 className="text-xl font-semibold text-gray-800">Loan Applications</h3>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Loan Amount (₹)</label>
              <input type="number" className="w-full border rounded-lg p-2" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700">Interest Rate (%)</label>
              <input type="number" className="w-full border rounded-lg p-2" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700">Tenure (months)</label>
              <select className="w-full border rounded-lg p-2" value={tenure} onChange={(e) => setTenure(e.target.value)}>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
                <option value="60">60</option>
              </select>
            </div>
          </form>
          <button onClick={calculateEMI} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
            Calculate EMI
          </button>
          {emi && <p className="mt-3 text-gray-700">Estimated EMI: ₹{emi}/month</p>}
        </div>
      </motion.div>

      {/* New Opportunities Alert */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mt-10 bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg text-center"
      >
        <h2 className="text-2xl font-bold mb-2">🔔 New Opportunities Alert</h2>
        <p>We’ll notify you when new funding opportunities match your profile.</p>
      </motion.div>
    </div>
  );
}
