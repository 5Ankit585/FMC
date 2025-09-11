import React, { useEffect, useMemo, useState } from "react";
import "./Students.css";
import AddStudentPopup from "./AddStudentPopup";

const Students = ({ students, addStudent, updateStudent, deleteStudent }) => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) return saved;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {}
  }, [theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      String(s.id).includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  }, [query, students]);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const s = students.find((x) => x.id === id);
    if (!window.confirm(`Delete ${s?.name ?? "this student"}?`)) return;
    deleteStudent(id);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const StatusBadge = ({ status }) => {
    const ok = (status || "").toLowerCase() === "active";
    const cls = `status-badge ${ok ? "status-active" : "status-inactive"}`;
    return (
      <span className={cls} aria-label={`Status: ${status}`}>
        <span className="status-dot" />
        {status}
      </span>
    );
  };

  return (
    <div className="page-wrap">
      <div className="students-container">
        {/* Header */}
        <div className="students-header">
          <div className="students-header-left">
            <div className="logo-chip" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 8v9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 10.5l5 2.5 5-2.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
            <div>
              <h1 className="students-title">Student Management</h1>
              <div className="students-subtitle">
                Manage roster, search, and update student records quickly
              </div>
            </div>
          </div>

          <div className="students-header-actions">
            {/* Search */}
<div className="students-input-wrap" role="search">
  <span className="students-input-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </span>
  <input
    className="students-input"
    type="search"
    placeholder="Search by name, email, status…"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    aria-label="Search students"
  />
</div>


            {/* Add button */}
            <button
              className="btn btn-add-student"
              onClick={() => {
                setEditingStudent(null);
                setIsModalOpen(true);
              }}
            >
              <span aria-hidden="true" style={{ display: "inline-grid", placeItems: "center", marginRight: ".3rem" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              Add Student
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrap" role="region" aria-label="Students table">
          <table className="students-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ width: "140px" }}>Status</th>
                <th style={{ width: "170px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <h3>No students found</h3>
                      <div>Try a different search term or add a new student.</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <StatusBadge status={student.status} />
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="action-button edit"
                          onClick={() => handleEdit(student)}
                          aria-label={`Edit ${student.name}`}
                          title="Edit"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M4 20h4l10.5-10.5a2.1 2.1 0 10-3-3L5 17v3z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="action-button delete"
                          onClick={() => handleDelete(student.id)}
                          aria-label={`Delete ${student.name}`}
                          title="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 11v6M12 11v6M15 11v6"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Popup */}
      <AddStudentPopup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        onAddStudent={addStudent}
        onUpdateStudent={updateStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default Students;
