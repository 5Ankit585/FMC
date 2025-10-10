import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ Ensure this import is there
import Navbar from "../components/Navbar";

const MyCourses = () => {
  const [savedCourses, setSavedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");  // Redirect if not logged in
      return;
    }

    // ✅ Fetch from backend
    axios.get(`http://localhost:5000/api/savedCourses/${userId}`)
      .then(res => {
        setSavedCourses(res.data);
      })
      .catch(err => {
        console.error('Error fetching saved courses:', err);
        // Fallback to localStorage if needed
        const saved = localStorage.getItem("savedCourses");
        if (saved) {
          setSavedCourses(JSON.parse(saved));
        }
      });
  }, [navigate]);

  if (!savedCourses.length) {
    return (
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <p className="text-center py-8 text-gray-500">No saved courses yet. <a href="/courses" className="text-blue-500 underline">Explore courses</a>.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Saved Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedCourses.map((course) => (
            <div
            key={course.courseId}  // Use courseId
            className="border p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => navigate(`/coursepage/${course.courseId}`)}  // Use courseId
          >
            <h2 className="font-semibold text-lg mb-2">{course.courseTitle}</h2>
            <p className="text-gray-600"><strong>Eligibility:</strong> {course.eligibility}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MyCourses;