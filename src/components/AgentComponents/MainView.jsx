import React, { useState } from "react";
import "./MainView.css";
import DashboardAgent from "./DashboardAgent";
import PartnerInstitutes from "./PartnerInstitutes";
import Students from "./Students";
import Applications from "./Applications";
import Payments from "./Payments";
import Wallet from "./wallet";
import Reports from "./reports";
import Announcements from "./Announcements";
import Support from "./support";
import Settings from "./settings";

export default function MainView({ route }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "virendarrawat884@gmail.com",
      status: "Active",
      details: { course: "Computer Science" },
      university: "MIT",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "kunalk2005k@gmail.com",
      status: "Inactive",
      details: { course: "Mathematics" },
      university: "Stanford",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "kunalk2005k@gmail.com",
      status: "Active",
      details: { course: "Physics" },
      university: "Harvard",
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      studentName: "John Doe",
      course: "Computer Science",
      amount: 5000,
      status: "Pending",
      date: "2025-08-10",
      email: "virendarrawat884@gmail.com",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      course: "Mathematics",
      amount: 4500,
      status: "Pending",
      date: "2025-08-12",
      email: "kunalk2005k@gmail.com",
    },
    {
      id: 3,
      studentName: "Alice Johnson",
      course: "Physics",
      amount: 4800,
      status: "Pending",
      date: "2025-08-09",
      email: "kunalk2005k@gmail.com",
    },
  ]);

  const addStudent = (newStudent) => {
    const studentWithId = {
      ...newStudent,
      id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
    };
    setStudents((prev) => [...prev, studentWithId]);
    // Add payment entry for the new student
    setPayments((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1,
        studentName: newStudent.name,
        course: newStudent.details?.course || "Not Assigned",
        amount: 5000, // Default amount, adjust as needed
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        email: newStudent.email || "N/A",
      },
    ]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, ...updatedStudent } : student))
    );
    // Update payment entry for the student
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              studentName: updatedStudent.name,
              course: updatedStudent.details?.course || "Not Assigned",
              email: updatedStudent.email || "N/A",
            }
          : payment
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    // Optionally, remove payment entry for the student
    setPayments((prev) => prev.filter((payment) => payment.id !== id));
  };

  const addPayment = (payment) => {
    setPayments((prev) => [
      ...prev,
      {
        ...payment,
        id: prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const updatePayment = (id, updated) => {
    setPayments((prev) =>
      prev.map((payment) => (payment.id === id ? { ...payment, ...updated } : payment))
    );
  };

  switch (route) {
    case "dashboard":
      return (
        <div className="main-view">
          <DashboardAgent />
        </div>
      );
    case "PartnerInstitutes":
      return (
        <div className="main-view">
          <PartnerInstitutes />
        </div>
      );
    case "students":
      return (
        <div className="main-view">
          <Students
            students={students}
            addStudent={addStudent}
            updateStudent={updateStudent}
            deleteStudent={deleteStudent}
          />
        </div>
      );
    case "Applications":
      return (
        <div className="main-view">
          <Applications students={students} addPayment={addPayment} />
        </div>
      );
    case "Payments":
      return (
        <div className="main-view">
          <Payments payments={payments} addPayment={addPayment} updatePayment={updatePayment} />
        </div>
      );
    case "commission-wallet":
      return (
        <div className="main-view">
          <Wallet />
        </div>
      );
    case "reports":
      return (
        <div className="main-view">
          <Reports />
        </div>
      );
    case "Announcements":
      return (
        <div className="main-view">
          <Announcements />
        </div>
      );
    case "Support":
      return (
        <div className="main-view">
          <Support />
        </div>
      );
    case "Settings":
      return (
        <div className="main-view">
          <Settings />
        </div>
      );
    default:
      return (
        <div className="main-view">
          <h2>Welcome to DashboardAgent</h2>
          <p>Please select a valid route.</p>
        </div>
      );
  }
}