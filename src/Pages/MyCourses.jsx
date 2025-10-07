import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [savedCourses, setSavedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("savedCourses");
    if (saved) {
      setSavedCourses(JSON.parse(saved));
    }
  }, []);

  if (!savedCourses.length) {
    return (
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <p className="text-center py-8 text-gray-500">No saved courses yet.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Saved Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedCourses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => navigate(`/coursepage/${course._id}`)}
          >
            <h2 className="font-semibold text-lg mb-2">{course.courseTitle}</h2>
            <p className="text-gray-600"><strong>Eligibility:</strong> {course.eligibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;