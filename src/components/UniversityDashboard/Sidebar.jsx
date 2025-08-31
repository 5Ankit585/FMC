import React from "react";
import {
  FaTachometerAlt,
  FaUniversity,
  FaUserGraduate,
  FaInbox,
  FaFileInvoiceDollar,
  FaWallet,
  FaChartLine,
  FaBullhorn,
  FaCog
} from "react-icons/fa";
import "./Sidebar.css";

const MENU = [
  { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { id: "My Profile", label: "My Profile", icon: FaUniversity },
  { id: "Courses & Fees", label: "Courses & Fees", icon: FaUserGraduate },
  { id: "News", label: "News", icon: FaInbox },
  { id: "Applications", label: "Applications", icon: FaFileInvoiceDollar },
  { id: "Documents", label: "Documents", icon: FaWallet },
  { id: "analytics", label: "Analytics", icon: FaChartLine }, 
  { id: "Subscription", label: "Subscription", icon: FaBullhorn },
  { id: "settings", label: "Settings", icon: FaCog }
];

export default function Sidebar({ sidebarOpen, setRoute, currentRoute }) {
  return (
    <aside className={`ud-sidebar ${sidebarOpen ? "open" : "closed"}`} aria-label="Primary navigation">
      <div
        className="ud-brand"
        onClick={() => setRoute("dashboard")}
        style={{ cursor: "pointer" }}
      >
        <div className="ud-logo">
          <strong>University Dashboard</strong>
        </div>
      </div>

      <nav className="ud-menu" role="menu">
        {MENU.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`ud-menu-item ${currentRoute === id ? "active" : ""}`}
            onClick={() => setRoute(id)}
            role="menuitem"
          >
            <Icon size={18} />
            <span className="ud-menu-label">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}