import React from "react";
import { FaUserCog, FaShieldAlt, FaBell, FaPlug, FaGlobe } from "react-icons/fa";
import "./Settings.css";

export default function Settings() {
  const settingsOptions = [
    {
      title: "Profile Settings",
      description: "Update your profile info, change password, and manage account details.",
      icon: <FaUserCog />,
      action: () => alert("Profile settings clicked"),
    },
    {
      title: "Security",
      description: "Enable 2FA, manage devices, and view login history.",
      icon: <FaShieldAlt />,
      action: () => alert("Security settings clicked"),
    },
    {
      title: "Notifications",
      description: "Manage email, SMS, and WhatsApp alerts.",
      icon: <FaBell />,
      action: () => alert("Notifications settings clicked"),
    },
    {
      title: "Integrations",
      description: "Connect Google Calendar, CRM, and payment gateways.",
      icon: <FaPlug />,
      action: () => alert("Integrations clicked"),
    },
    {
      title: "System Preferences",
      description: "Change theme, language, and time zone settings.",
      icon: <FaGlobe />,
      action: () => alert("Preferences clicked"),
    },
  ];

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p className="settings-subtext">Manage your account, preferences, and integrations.</p>

      <div className="settings-grid">
        {settingsOptions.map((item, idx) => (
          <div key={idx} className="settings-card" onClick={item.action}>
            <div className="settings-icon">{item.icon}</div>
            <div className="settings-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <button className="settings-btn">Manage</button>
          </div>
        ))}
      </div>
    </div>
  );
}
