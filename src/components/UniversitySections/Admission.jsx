import React, { useEffect, useState } from "react";

const Admission = ({ university }) => {
  const [admissionData, setAdmissionData] = useState([]);

  useEffect(() => {
    if (university?.admissions) {
      setAdmissionData(university.admissions);
    }
  }, [university]);

  if (!admissionData || admissionData.length === 0) {
    return (
      <section className="bg-gray-900 text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Admission Information
          </h2>
          <p>No admission data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {university?.instituteName} Admission 2025
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {admissionData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                {item.courseName}
              </h3>
              <ul className="text-sm space-y-1 mb-4">
                <li><strong>Eligibility:</strong> {item.eligibility}</li>
                <li><strong>Specialization:</strong> {item.specialization}</li>
                <li><strong>Fees:</strong> {item.fee}</li>
                <li><strong>Highest Package:</strong> {item.highestPack}</li>
                <li><strong>Average Package:</strong> {item.avgPack}</li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a
                  href={item.applicationLink || "#"}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium"
                >
                  Apply Now
                </a>
                <a
                  href={item.questionPaperLink || "#"}
                  className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-md text-sm font-medium"
                >
                  Question Papers
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admission;
