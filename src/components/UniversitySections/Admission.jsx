import React from 'react';

const admissionData = [
  {
    course: 'MBA',
    eligibility: 'Graduation with minimum 60%',
    specializations: 2,
    fees: 'INR 1.9L / Year',
    highestPackage: '23 LPA',
    averagePackage: '9.6 LPA',
    applicationLink: '#',
    questionPaperLink: '#',
  },
  {
    course: 'BBA',
    eligibility: '10+2 with minimum 60%',
    specializations: 1,
    fees: 'INR 1.2L / Year',
    highestPackage: '12 LPA',
    averagePackage: '5.2 LPA',
    applicationLink: '#',
    questionPaperLink: '#',
  },
  {
    course: 'B.Tech - CSE',
    eligibility: 'JEE Main + JoSAA',
    specializations: 1,
    fees: 'INR 2.1L / Year',
    highestPackage: '82.05 LPA',
    averagePackage: '18.5 LPA',
    applicationLink: '#',
    questionPaperLink: '#',
  },
  {
    course: 'B.Tech - ECE',
    eligibility: 'JEE Main + JoSAA',
    specializations: 1,
    fees: 'INR 2.1L / Year',
    highestPackage: '50 LPA',
    averagePackage: '14 LPA',
    applicationLink: '#',
    questionPaperLink: '#',
  },
  // Add more programs as needed
];

const Admission = () => {
  return (
    <section className="bg-gray-900 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">DTU Delhi Admission 2025</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {admissionData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{item.course}</h3>
              <ul className="text-sm space-y-1 mb-4">
                <li><strong>Eligibility:</strong> {item.eligibility}</li>
                <li><strong>Specializations:</strong> {item.specializations}</li>
                <li><strong>Fees:</strong> {item.fees}</li>
                <li><strong>Highest Package:</strong> {item.highestPackage}</li>
                <li><strong>Average Package:</strong> {item.averagePackage}</li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a
                  href={item.applicationLink}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium"
                >
                  Apply Now
                </a>
                <a
                  href={item.questionPaperLink}
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
