import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaMapMarkerAlt, FaChartBar, FaCalendarAlt } from "react-icons/fa";
import "./AnalyticsDashboard.css";

export default function AnalyticsDashboard() {
  const stats = [
    { label: "Total Followers", value: "21.2k", change: "+112.71%", positive: true },
    { label: "Impressions", value: "1.6k", change: "+112.71%", positive: true },
    { label: "Reach", value: "826", change: "-24.2%", positive: false },
    { label: "Engagement Rate", value: "18.2%", change: "+112.71%", positive: true },
  ];

  const followerGrowth = [6, 9, 4, 7, 10, 8, 5];

  const locationData = [
    { region: "North America", percentage: 45, color: "var(--chart-color1)" },
    { region: "Asia", percentage: 30, color: "var(--chart-color2)" },
    { region: "Europe", percentage: 15, color: "var(--chart-color3)" },
    { region: "Other", percentage: 10, color: "var(--chart-color4)" },
  ];

  // Calculate pie chart coordinates
  const calculatePieChart = () => {
    let startAngle = 0;
    return locationData.map((data) => {
      const percentage = data.percentage / 100;
      const endAngle = startAngle + percentage * 360;
      const largeArcFlag = percentage > 0.5 ? 1 : 0;
      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
      const path = `M 50,50 L ${startX},${startY} A 40,40 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
      startAngle = endAngle;
      return { ...data, path };
    });
  };

  const pieChartData = calculatePieChart();

  // Animation for fade-in
  const panelRef = useRef(null);
  useEffect(() => {
    panelRef.current.querySelectorAll(".widget-card").forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate-fade-in");
    });
  }, []);

  return (
    <div className="analytics-container" ref={panelRef}>
      <div className="analytics-header">
        <h2>Analytics Overview</h2>
        <select>
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stats-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
            <span className={stat.positive ? "positive" : "negative"}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="bottom-grid">
        <div className="progress-card">
          <h4>Get More Likes this Summer</h4>
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray="77, 100"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="progress-text">29.2k</div>
          </div>
          <p>You are at 77% of 36,000 likes</p>
        </div>

        <div className="chart-card">
          <h4>Follower Growth</h4>
          <div className="bar-chart">
            {followerGrowth.map((val, idx) => (
              <div key={idx} className="bar">
                <div
                  className="bar-fill"
                  style={{ height: `${val * 10}%` }}
                ></div>
              </div>
            ))}
          </div>
          <p>
            With <b>22.8%</b> growth rate we are steadily growing our following.
          </p>
        </div>
      </div>

      {/* Additional Widgets Section */}
      <div className="widgets-grid">
        {/* Top Courses Widget */}
        <div className="widget-card bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--text-color)] mb-3">
            <FaGraduationCap className="text-[var(--primary-color)]" aria-hidden="true" />
            Top Courses
          </h3>
          <ul className="space-y-3">
            {[
              "Computer Science - 1,200 enrollments",
              "Business Administration - 950 enrollments",
              "Mechanical Engineering - 800 enrollments",
              "Psychology - 600 enrollments",
            ].map((course, index) => (
              <li key={index} className="text-sm flex items-center gap-2 hover:text-[var(--primary-color)] transition-colors duration-200">
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
                {course}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Insights Widget with Pie Chart */}
        <div className="widget-card bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--text-color)] mb-3">
            <FaMapMarkerAlt className="text-[var(--primary-color)]" aria-hidden="true" />
            Location Insights
          </h3>
          <p className="text-sm mb-4">Applicant distribution by region:</p>
          <div className="flex items-center gap-4">
            <svg className="pie-chart" viewBox="0 0 100 100" width="100" height="100">
              {pieChartData.map((data, index) => (
                <path
                  key={index}
                  d={data.path}
                  fill={data.color}
                  className="pie-segment"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                />
              ))}
              <circle cx="50" cy="50" r="20" fill="var(--bg-color)" />
            </svg>
            <ul className="space-y-2">
              {pieChartData.map((data, index) => (
                <li key={index} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></span>
                  {data.region}: {data.percentage}%
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Competitor Data Widget */}
        <div className="widget-card bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--text-color)] mb-3">
            <FaChartBar className="text-[var(--primary-color)]" aria-hidden="true" />
            Competitor Data
          </h3>
          <p className="text-sm mb-3">Enrollment trends:</p>
          <ul className="space-y-3">
            {[
              { name: "University A", growth: "+5%", color: "text-green-500" },
              { name: "University B", growth: "-2%", color: "text-red-500" },
              { name: "University C", growth: "+3%", color: "text-green-500" },
            ].map((comp, index) => (
              <li key={index} className="text-sm flex items-center gap-2 hover:text-[var(--primary-color)] transition-colors duration-200">
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
                {comp.name}: <span className={comp.color}>{comp.growth}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deadlines Widget */}
        <div className="widget-card bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--text-color)] mb-3">
            <FaCalendarAlt className="text-[var(--primary-color)]" aria-hidden="true" />
            Deadlines
          </h3>
          <ul className="space-y-3">
            {[
              "Early Admission: Nov 1, 2025",
              "Regular Admission: Jan 15, 2026",
              "Scholarship Deadline: Dec 1, 2025",
            ].map((deadline, index) => (
              <li key={index} className="text-sm flex items-center gap-2 hover:text-[var(--primary-color)] transition-colors duration-200">
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
                {deadline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}