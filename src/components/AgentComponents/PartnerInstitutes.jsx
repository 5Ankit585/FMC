import React, { useEffect, useMemo, useState } from "react";
import "./PartnerInstitutes.css";


export default function PartnerInstitutes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", courses: "", commission: "" });
  const [error, setError] = useState("");

 
  const [sort, setSort] = useState({ key: "name", dir: "asc" });

 
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
  const [institutes, setInstitutes] = useState([
    { id: 1, name: "ABC University", location: "New York, NY", courses: "MBA, B.Tech", commission: "10%" },
    { id: 2, name: "XYZ College", location: "San Francisco, CA", courses: "BBA, MCA", commission: "8%" },
    { id: 3, name: "Global Institute", location: "London, UK", courses: "MS, PhD", commission: "12%" },
  ]);

 
  const toPercentNumber = (val) =>
    Math.max(0, Math.min(100, Number(String(val).replace(/[^\d.]/g, "")) || 0));

  const courseList = (courses) =>
    String(courses)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

 
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return institutes;
    return institutes.filter((i) =>
      [i.name, i.location, i.courses].some((f) => String(f).toLowerCase().includes(q))
    );
  }, [searchTerm, institutes]);

  // Sort
  const sorted = useMemo(() => {
    const list = [...filtered];
    const { key, dir } = sort;

    list.sort((a, b) => {
      let av = a[key];
      let bv = b[key];

      if (key === "commission") {
        av = toPercentNumber(av);
        bv = toPercentNumber(bv);
      } else {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }

      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [filtered, sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * rowsPerPage;
  const pageRows = sorted.slice(start, start + rowsPerPage);

  
  const handleRowClick = (institute) => setSelectedInstitute(institute);
  const closeDetailsModal = () => setSelectedInstitute(null);

  const onSort = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSort({ key: "name", dir: "asc" });
    setPage(1);
  };

  const exportCSV = () => {
    const headers = ["Name", "Location", "Courses", "Commission"];
    const rows = sorted.map((i) => [i.name, i.location, i.courses, i.commission]);
    const csv = [headers, ...rows].map((r) =>
      r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "partner-institutes.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openAddModal = () => {
    setForm({ name: "", location: "", courses: "", commission: "" });
    setError("");
    setShowAddModal(true);
  };
  const closeAddModal = () => setShowAddModal(false);

  const submitAdd = (e) => {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const location = form.location.trim();
    const courses = form.courses.trim();
    let commission = form.commission.trim();

    if (!name || !location || !courses || !commission) {
      setError("All fields are required.");
      return;
    }
    const cNum = toPercentNumber(commission);
    commission = `${cNum}%`;

    const nextId = (institutes.reduce((m, i) => Math.max(m, i.id), 0) || 0) + 1;
    setInstitutes((prev) => [
      ...prev,
      { id: nextId, name, location, courses, commission },
    ]);
    setShowAddModal(false);
    setSearchTerm("");
    setPage(1);
  };

  // Close modals with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (selectedInstitute) setSelectedInstitute(null);
        if (showAddModal) setShowAddModal(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedInstitute, showAddModal]);

  const SortIcon = ({ active, dir }) => (
    <svg className="sort-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      {active ? (
        dir === "asc" ? (
          <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
        ) : (
          <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
        )
      ) : (
        <path d="M7 10l5 5 5-5H7z" fill="currentColor" opacity="0.45" />
      )}
    </svg>
  );

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.47 6.47 0 001.57-4.23 6.5 6.5 0 10-6.5 6.5 6.47 6.47 0 004.23-1.57l.27.28v.79l5 4.99L20.49 19 15.5 14zm-5 0A4.5 4.5 0 1115 9.5 4.5 4.5 0 0110.5 14z"/>
    </svg>
  );

  const headerSubtitle = (
    <p className="header-subtitle">Manage, track and grow your partner network.</p>
  );

  const header = (
    <div className="partner-institutes-header">
      <div>
        <h2>Partner Institutes</h2>
        {headerSubtitle}
      </div>
      <div className="partner-institutes-actions">
        <div className="input-with-icon">
          <input
            type="text"
            placeholder="Search by name, location, or course…"
            className="search-input"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            aria-label="Search institutes"
          />
          <SearchIcon />
        </div>
        <button className="action-button secondary" onClick={resetFilters} title="Clear filters">
          Clear
        </button>
        <button className="action-button secondary" onClick={exportCSV} title="Export CSV">
          Export
        </button>
        <button className="action-button primary" onClick={openAddModal}>
          + Add Institute
        </button>
      </div>
    </div>
  );

  const ariaSort = (key) => (sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none");

  return (
    <div className="partner-institutes-content">
      {header}

      <div className="partner-institutes-table">
        <div className="ad-table-card">
          <h3>Institute List</h3>

          <div className="table-scroll" role="region" aria-label="Partner institutes table">
            <table role="grid">
              <thead>
                <tr>
                  <th scope="col" aria-sort={ariaSort("name")}>
                    <button className="th-sort" onClick={() => onSort("name")} aria-label={`Sort by name, current ${ariaSort("name")}`}>
                      Name <SortIcon active={sort.key === "name"} dir={sort.dir} />
                    </button>
                  </th>
                  <th scope="col" aria-sort={ariaSort("location")}>
                    <button className="th-sort" onClick={() => onSort("location")} aria-label={`Sort by location, current ${ariaSort("location")}`}>
                      Location <SortIcon active={sort.key === "location"} dir={sort.dir} />
                    </button>
                  </th>
                  <th scope="col">
                    Courses Offered
                  </th>
                  <th scope="col" aria-sort={ariaSort("commission")}>
                    <button className="th-sort" onClick={() => onSort("commission")} aria-label={`Sort by commission, current ${ariaSort("commission")}`}>
                      Commission <SortIcon active={sort.key === "commission"} dir={sort.dir} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageRows.length > 0 ? (
                  pageRows.map((institute) => {
                    const percent = toPercentNumber(institute.commission);
                    const initials = institute.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={institute.id}
                        className="institute-row"
                        onClick={() => handleRowClick(institute)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View details for ${institute.name}`}
                        onKeyDown={(e) => e.key === "Enter" && handleRowClick(institute)}
                      >
                        <td>
                          <div className="cell-name">
                            <div className="avatar" aria-hidden="true">{initials}</div>
                            <div>{institute.name}</div>
                          </div>
                        </td>
                        <td>{institute.location}</td>
                        <td>
                          <div className="chips" aria-label={`Courses offered by ${institute.name}`}>
                            {courseList(institute.courses).map((c, idx) => (
                              <span key={idx} className="chip">{c}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className="commission" aria-label={`Commission ${percent}%`}>
                            {percent}%
                            <span className="commission-bar" aria-hidden="true">
                              <span className="commission-fill" style={{ width: `${percent}%` }} />
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data" aria-live="polite">
                      No institutes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer with pagination */}
          <div className="table-footer">
            <div>
              Showing <strong>{pageRows.length}</strong> of <strong>{total}</strong>
            </div>
            <div className="pagination">
              <button className="page-btn" onClick={() => setPage(1)} disabled={currentPage === 1} aria-label="First page">«</button>
              <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page">‹</button>
              <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
              <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page">›</button>
              <button className="page-btn" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">»</button>
            </div>
            <div>
              <label htmlFor="rows" style={{ marginRight: 8, color: "var(--color-muted)" }}>Rows</label>
              <select
                id="rows"
                className="rows-select"
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedInstitute && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          onClick={closeDetailsModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="modal-title">{selectedInstitute.name}</h3>
            <p><strong>Location:</strong> {selectedInstitute.location}</p>
            <p><strong>Courses Offered:</strong> {selectedInstitute.courses}</p>
            <p><strong>Commission Rate:</strong> {selectedInstitute.commission}</p>
            <div className="form-actions">
              <button className="action-button secondary" onClick={closeDetailsModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Institute Modal */}
      {showAddModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-labelledby="add-modal-title"
          aria-modal="true"
          onClick={closeAddModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="add-modal-title">Add New Institute</h3>

            <form className="form-grid" onSubmit={submitAdd}>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-field">
                <label htmlFor="loc">Location</label>
                <input id="loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              </div>
              <div className="form-field">
                <label htmlFor="courses">Courses (comma separated)</label>
                <input id="courses" value={form.courses} onChange={(e) => setForm({ ...form, courses: e.target.value })} required />
              </div>
              <div className="form-field">
                <label htmlFor="commission">Commission (%)</label>
                <input id="commission" inputMode="numeric" placeholder="e.g., 10 or 10%" value={form.commission} onChange={(e) => setForm({ ...form, commission: e.target.value })} required />
              </div>

              {error && <div style={{ color: "#ff6b6b", fontWeight: 600 }}>{error}</div>}

              <div className="form-actions">
                <button type="button" className="action-button secondary" onClick={closeAddModal}>Cancel</button>
                <button type="submit" className="action-button primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
