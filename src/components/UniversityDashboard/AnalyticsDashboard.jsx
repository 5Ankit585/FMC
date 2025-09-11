import React, { useEffect, useRef, useState } from "react";
import {
  FaGraduationCap, FaMapMarkerAlt, FaChartBar, FaCalendarAlt,
  FaUserGraduate, FaUsers, FaUniversity, FaBriefcase,
} from "react-icons/fa";
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar,
} from "recharts";
import "./AnalyticsDashboard.css";

export default function AnalyticsDashboard() {
  const [compact, setCompact] = useState(true); // default compact

  const kpis = {
    applications: 12500,
    admissions: 8200,
    retention: 88,
    placement: 92,
    avgSalary: "₹6.5 LPA",
    facStuRatio: "1:18",
    goal: 12000,
    currentEnrollment: 9240,
  };

  const admissionTrend = [
    { year: "2020", admissions: 6000 },
    { year: "2021", admissions: 7200 },
    { year: "2022", admissions: 8000 },
    { year: "2023", admissions: 9100 },
    { year: "2024", admissions: 10500 },
  ];

  const monthlyApps = [
    { month: "Jan", applications: 900, admissions: 520 },
    { month: "Feb", applications: 1000, admissions: 590 },
    { month: "Mar", applications: 1150, admissions: 680 },
    { month: "Apr", applications: 1300, admissions: 760 },
    { month: "May", applications: 1450, admissions: 820 },
    { month: "Jun", applications: 1600, admissions: 920 },
  ];

  const locationData = [
    { region: "North America", percentage: 45, color: "var(--analytics-chart1)" },
    { region: "Asia", percentage: 30, color: "var(--analytics-chart2)" },
    { region: "Europe", percentage: 15, color: "var(--analytics-chart3)" },
    { region: "Other", percentage: 10, color: "var(--analytics-chart4)" },
  ];

  const calculatePieChart = () => {
    let startAngle = 0;
    return locationData.map((d) => {
      const pct = d.percentage / 100;
      const endAngle = startAngle + pct * 360;
      const largeArcFlag = pct > 0.5 ? 1 : 0;
      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
      const path = `M 50,50 L ${startX},${startY} A 40,40 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
      startAngle = endAngle;
      return { ...d, path };
    });
  };
  const pieChartData = calculatePieChart();

  const panelRef = useRef(null);
  useEffect(() => {
    panelRef.current?.querySelectorAll(".analytics-widget-card").forEach((card, i) => {
      card.style.animationDelay = `${i * 0.06}s`;
      card.style.opacity = "1";
    });
  }, []);

  return (
    <div className="analytics-dashboard-container" ref={panelRef}>
      {/* Header */}
      <div className="analytics-dashboard-header">
        <h2>University Analytics Overview</h2>
        <div>
          <button className="analytics-dashboard-toggle" onClick={() => setCompact(!compact)}>
            {compact ? "Comfortable View" : "Compact View"}
          </button>
          <select aria-label="Range">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card"><FaUniversity className="analytics-kpi-icon"/><h3>{kpis.applications.toLocaleString()}</h3><p>Applications</p></div>
        <div className="analytics-kpi-card"><FaUserGraduate className="analytics-kpi-icon"/><h3>{kpis.admissions.toLocaleString()}</h3><p>Admissions ({Math.round((kpis.admissions/kpis.applications)*100)}%)</p></div>
        <div className="analytics-kpi-card"><FaUsers className="analytics-kpi-icon"/><h3>{kpis.retention}%</h3><p>Retention Rate</p></div>
        <div className="analytics-kpi-card"><FaBriefcase className="analytics-kpi-icon"/><h3>{kpis.placement}%</h3><p>Placement • Avg {kpis.avgSalary}</p></div>
        <div className="analytics-kpi-card"><FaGraduationCap className="analytics-kpi-icon"/><h3>{kpis.facStuRatio}</h3><p>Faculty–Student Ratio</p></div>
      </div>

      {/* Charts */}
      <div className="analytics-bottom-grid">
        {/* Progress */}
        <div className="analytics-enrollment-card">
          <h4>Enrollment Goal Progress</h4>
          <div className="analytics-progress-circle" style={{width: compact?60:80, height: compact?60:80}}>
            <svg viewBox="0 0 36 36" className="analytics-circular-chart">
              <path className="analytics-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              <path className="analytics-circle" strokeDasharray="77, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            </svg>
            <div className="analytics-progress-text">{kpis.currentEnrollment.toLocaleString()}</div>
          </div>
          <p style={{textAlign:"center", fontSize: compact?".65rem":".75rem"}}>
            You are at <b>77%</b> of {kpis.goal.toLocaleString()} enrollments.
          </p>
        </div>

        {/* Admissions Growth */}
        <div className="analytics-growth-card">
          <h4>Admissions Growth (Last 5 Years)</h4>
          <ResponsiveContainer width="100%" height={compact ? 140 : 170}>
            <LineChart data={admissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--analytics-border)"/>
              <XAxis dataKey="year"/><YAxis/><Tooltip/><Legend/>
              <Line type="monotone" dataKey="admissions" stroke="var(--analytics-chart1)" strokeWidth={2} dot={{ r: 2 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Applications vs Admissions */}
        <div className="analytics-apps-card">
          <h4>Applications vs Admissions (This Year)</h4>
          <ResponsiveContainer width="100%" height={compact ? 140 : 170}>
            <BarChart data={monthlyApps} className="analytics-histogram">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--analytics-border)"/>
              <XAxis dataKey="month"/><YAxis/><Tooltip/><Legend/>
              <Bar dataKey="applications" fill="var(--analytics-histogram)" />
              <Bar dataKey="admissions" fill="var(--analytics-chart2)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Widgets */}
      <div className="analytics-widgets-grid">
        <div className="analytics-widget-card"><h3 className="analytics-widget-title"><FaGraduationCap/> Top Courses</h3>
          <ul>{["Computer Science — 1,200","Business Administration — 950","Mechanical Engineering — 800","Psychology — 600"].map((c,i)=><li key={i}><span className="analytics-dot"/> {c}</li>)}</ul>
        </div>
        <div className="analytics-widget-card"><h3 className="analytics-widget-title"><FaMapMarkerAlt/> Location Insights</h3>
          <svg viewBox="0 0 100 100" width="70" height="70">{pieChartData.map((d,i)=><path key={i} d={d.path} fill={d.color}/>)}</svg>
          <ul>{pieChartData.map((d,i)=><li key={i}><span className="analytics-dot" style={{background:d.color}}/> {d.region}: {d.percentage}%</li>)}</ul>
        </div>
        <div className="analytics-widget-card"><h3 className="analytics-widget-title"><FaChartBar/> Competitor Data</h3>
          <ul>{[{n:"University A",g:"+5%",c:"green"},{n:"University B",g:"-2%",c:"red"},{n:"University C",g:"+3%",c:"green"}].map((c,i)=><li key={i}><span className="analytics-dot"/> {c.n}: <span style={{color:c.c}}>{c.g}</span></li>)}</ul>
        </div>
        <div className="analytics-widget-card"><h3 className="analytics-widget-title"><FaCalendarAlt/> Deadlines</h3>
          <ul>{["Early Admission: Nov 1, 2025","Regular Admission: Jan 15, 2026","Scholarship Deadline: Dec 1, 2025"].map((d,i)=><li key={i}><span className="analytics-dot"/> {d}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
