import React, { useState, useEffect } from "react";
import Header from "../components/AgentComponents/Header";
import Sidebar from "../components/AgentComponents/Sidebar";
import MainView from "../components/AgentComponents/MainView";
import "./Agent.css";
export default function AgentDashboard() {
  const [route, setRoute] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("agent_theme") || "light";
    } catch {
      return "light";
    }
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("agent_theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    if (mql.matches) setSidebarOpen(false);
  }, [route]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`agent-dashboard ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        search={search}
        setSearch={setSearch}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="ad-body">
        <Sidebar sidebarOpen={sidebarOpen} setRoute={setRoute} currentRoute={route} />
        <main className="ad-main" id="main-content" tabIndex="-1">
          <MainView route={route} />
          <footer className="ad-footer">
            <div>© {new Date().getFullYear()} Agent Dashboard • Support • Help Docs • Contact</div>
          </footer>
        </main>
      </div>
    </div>
  );
}
