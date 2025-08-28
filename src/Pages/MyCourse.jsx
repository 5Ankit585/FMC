import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";  

export default function MyCourse() {
  const [isVisible, setIsVisible] = useState(false);

const [courses] = useState({
    savedCourses: [
      { name: "B.Sc. Computer Science – XYZ University" },
      { name: "MBA – ABC Business School" },
    ],
    applications: [
      { course: "M.Tech – DEF University", status: "Pending" },
      { course: "PG Diploma – GHI Institute", status: "Accepted" },
      { course: "BBA – JKL College", status: "Rejected" },
    ],
    tracking: [
      { stage: "Application Submitted", date: "2025-06-01" },
      { stage: "Documents Verified", date: "2025-06-15" },
      { stage: "Interview Scheduled", date: "2025-07-10" },
    ],
    documents: [
      { name: "SOP", file: "sop.pdf" },
      { name: "LOR", file: "lor.pdf" },
      { name: "Transcripts", file: "transcripts.pdf" },
    ],
  });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-500";
    if (status === "Accepted") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
    return "bg-gray-500";
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-xl rounded-2xl p-8 ">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
          My Courses
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Saved Courses */}
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Saved Courses
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {courses.savedCourses.map((course, idx) => (
            <li key={idx}>{course.name}</li>
          ))}
        </ul>
      </div>

      {/* Applications */}
      <div
        className={`mt-8 border-t pt-6 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Applications
        </h3>
        <ul className="space-y-3">
          {courses.applications.map((app, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
            >
              <span>{app.course}</span>
              <span
                className={`text-white text-sm px-3 py-1 rounded-full ${getStatusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Application Tracking */}
      <div
        className={`mt-8 border-t pt-6 transition-all duration-700 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Application Tracking
        </h3>
        <div className="relative border-l-2 border-blue-500 pl-4 space-y-4">
          {courses.tracking.map((track, idx) => (
            <div key={idx} className="ml-2">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] mt-1"></div>
              <p className="font-medium">{track.stage}</p>
              <p className="text-sm text-gray-500">{track.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Linked */}
      <div
        className={`mt-8 border-t pt-6 transition-all duration-700 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Documents Linked
        </h3>
        <ul className="space-y-2">
          {courses.documents.map((doc, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
            >
              <span>{doc.name}</span>
              <a
                href={`/${doc.file}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Withdraw / Edit Application */}
      <div
        className={`mt-8 border-t pt-6 transition-all duration-700 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Withdraw / Edit Application
        </h3>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:scale-105 shadow-md transition-transform">
            Withdraw
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 shadow-md transition-transform">
            Edit Application
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
