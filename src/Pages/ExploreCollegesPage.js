import React, { useState } from "react";
import ExploreColleges from "../Modals/ExploreColleges";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ExploreCollegesPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const navigate = useNavigate();
  const collegeData = [
    {
      colleges: [
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjZ88ubKULeq3xMeELXKh2DlXYZ1n2R5BSQg&usqp=CAU",
          name: "ABC College",
          location: "New Delhi, Delhi",
          courses: [
            "Engineering",
            "Business Administration",
            "Computer Science",
          ],
          affiliation: "University of Delhi",
          established: 2000,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE9XOiQy5vGSPy2p-ZguaaqN8bj5afX0FWng&usqp=CAU",
          name: "nirvana college",
          location: "Kochi, Kerala",
          courses: ["Marine Biology", "Tourism Management", "Culinary Arts"],
          affiliation: "Cochin University of Science and Technology",
          established: 2008,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRenQc3c6iLXMf2D50H4MjG5bEZsRRIIpmztA&usqp=CAU",
          name: "heritage university",
          location: "Ahmedabad, Gujarat",
          courses: ["Chemistry", "Business Administration", "Sociology"],
          affiliation: "Gujarat University",
          established: 1990,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIX9AvhUcPzK5hDeymbQsRcNyb7JTCH2aw7FcV839loGxzSOGg2Fy0ERNr-haeJ-5W4XY&usqp=CAU",
          name: "lotus college",
          location: "Jaipur, Rajasthan",
          courses: ["Law", "Management", "Environmental Science"],
          affiliation: "University of Rajasthan",
          established: 1985,
        },
        {
          name: "IKGPTU",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2MTh3Gy201dC6tgURy6qw-4aMwbt44NkSDYJfvYmpQts0iDIBJ45X63tjNI7Bs-ean0&usqp=CAU",
          location: "Pune, Maharashtra",
          courses: ["Arts", "History", "Social Work"],
          affiliation: "University of Pune",
          established: 1992,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMS2r2QxTmw1q9yFDAjWnaQDL9CkRlxcjP6Q&usqp=CAU",
          name: "golden state college",
          location: "Mumbai, Maharashtra",
          courses: ["Medicine", "Law", "Fine Arts"],
          affiliation: "Mumbai University",
          established: 1995,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9L6UbVW0_xzDrXB5uqAnQrh5BbMDHLaGtp-z073YbW4yJvaPPTeSYnf4-M2vBEhE9ABw&usqp=CAU",
          name: "City College",
          location: "Kolkata, West Bengal",
          courses: ["Commerce", "Literature", "Science"],
          affiliation: "University of Calcutta",
          established: 1980,
        },
        {
          name: "Sunshine University",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT52NFA2o8XgJxd2NU83IbxJxzQi3kLh71QFQ&usqp=CAU",
          location: "Chennai, Tamil Nadu",
          courses: ["Information Technology", "Management", "Biochemistry"],
          affiliation: "Anna University",
          established: 2005,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdXXF0adygatNf1o8hk4nwcqHOUAHLNDz9mQ&usqp=CAU",
          name: "Green Valley Institute",
          location: "Bangalore, Karnataka",
          courses: [
            "Computer Engineering",
            "Electronics",
            "Business Management",
          ],
          affiliation: "Bangalore University",
          established: 1998,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRFctQFlpA3WcRGszK8cDbiqQQWvUhfLKtw&usqp=CAU",
          name: "Golden State College",
          location: "Hyderabad, Telangana",
          courses: ["Physics", "Economics", "Mathematics"],
          affiliation: "Osmania University",
          established: 2002,
        },
        // Add more college data here...
      ],
    },
  ];

  return (
    <>
      {openModal && <ExploreColleges closeModal={setOpenModal} />}
      <div className="bg-gray-200 p-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Explore Colleges</h1>
            <div className="relative">
              <input
                type="text"
                className="w-48 sm:w-64 p-2 pl-8 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search Colleges"
              />
              <div className="absolute top-3 left-3 text-gray-400">
              <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {collegeData[0].colleges.map((college, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex">
            <div className="w-1/3">
              <img src={college.image} alt="" className="w-full h-auto" />
            </div>
            <div className="w-2/3 p-4">
              <h2 className="text-xl font-semibold">{college.name}</h2>
              <p className="text-gray-500">{college.location}</p>
              <p className="text-gray-600">
                Courses: {college.courses.join(", ")}
              </p>
              <p className="text-gray-600">
                Affiliation: {college.affiliation}
              </p>
              <p className="text-gray-600">
                Established: {college.established}
              </p>
              <button
                className="btn hover:bg-black hover:text-white"
                onClick={() => navigate("/universityDetails")}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExploreCollegesPage;
