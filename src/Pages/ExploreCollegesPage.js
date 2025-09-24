import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CollegeCard from "../components/CollegeCard";
import "./ExploreCollegesPage.css";

const ExploreCollegesPage = () => {
  const [universities, setUniversities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [degreeFilter, setDegreeFilter] = useState([]);
  const [examFilter, setExamFilter] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);
  const [instituteTypeFilter, setInstituteTypeFilter] = useState([]);
  const [managementTypeFilter, setManagementTypeFilter] = useState([]);
  const [activeTab, setActiveTab] = useState("degree");
  const [loading, setLoading] = useState(true);

  // Filter options
  const degrees = ["BSc", "BA", "BCom", "MSc", "MA", "MCom", "PhD"];
  const exams = ["JEE", "NEET", "CAT", "GATE", "UPSC"];
  const specializations = ["Engineering", "Management", "Arts", "Science"];
  const cities = ["Agartala", "Agra", "Ahmedabad", "Ahmednagar", "Aizawl", "Ajmer", "Aligarh", "Allahabad", "Amaravati", "Ambala", "Amritsar", "Anand", "Anantapur", "Annamalai", "Arkonam", "Aurangabad", "Bagalkot", "Balaghat", "Baleshwar", "Ballari", "Banga", "Bangalore", "Bankura", "Bardhaman", "Bareilly", "Bargarh", "Barmer", "Barnala", "Baroda", "Beawar", "Belagavi", "Berhampur", "Bhilai", "Bhimavaram", "Bhind", "Bhiwani", "Bhopal", "Bhubaneswar", "Bhuj", "Bikaner", "Bilaspur", "Bodh Gaya", "Bokaro", "Burdwan", "Calicut", "Chandigarh", "Chennai", "Chhindwara", "Chittorgarh", "Coimbatore", "Cooch Behar", "Cuddalore", "Darjeeling", "Darrang", "Dehradun", "Deoghar", "Dhanbad", "Dharamshala", "Dibrugarh", "Dindigul", "Diu", "Durg", "Erode", "Faridkot", "Gandhinagar", "Gangtok", "Gaya", "Ghaziabad", "Gokak", "Gondia", "Gopalganj", "Gudivada", "Gujarat", "Guntur", "Gurugram", "Gwalior", "Haldia", "Haldwani", "Hamirpur", "Haridwar", "Hassan", "Hazaribagh", "Hissar", "Howrah", "Hukumari", "Hyderabad", "Imphal", "Indore", "Itanagar", "Jabalpur", "Jaipur", "Jalandhar", "Jalgaon", "Jammu", "Jamnagar", "Jamshedpur", "Jangipur", "Jhajjar", "Jhunjhunu", "Jind", "Jodhpur", "Jorhat", "Junagadh", "Kadapa", "Kakinada", "Kalaburagi", "Kalahandi", "Kalburgi", "Kalyani", "Kangra", "Kannur", "Kanpur", "Karimnagar", "Karnal", "Karnataka", "Karur", "Kashipur", "Kavaratti", "Kerala", "Khammam", "Kharagpur", "Kheri", "Kochi", "Kohima", "Kolkata", "Kollam", "Kota", "Kottayam", "Kozhikode", "Kriganspalle", "Kurnool", "Kurukshetra", "Lalitpur", "Latur", "Laxmangarh", "Lohit", "Lucknow", "Ludhiana", "Lunglei", "Machilipatnam", "Madras", "Madurai", "Mahbubnagar", "Maldah", "Mandi", "Mandya", "Mango", "Mangalore", "Manipal", "Mathura", "Medinipur", "Meerut", "Midnapore", "Mizoram", "Moradabad", "Mumbai", "Mysore", "Nagercoil", "Nagpur", "Naihati", "Nalgonda", "Namakkal", "Nanded", "Nandurbar", "Nashik", "Navsari", "Nawada", "Nayagarh", "Nellore", "New Delhi", "Nizamabad", "Noida", "Ongole", "Palakkad", "Palam", "Palampur", "Palghar", "Palghat", "Palni", "Panchkula", "Panihati", "Panipat", "Panvel", "Pasighat", "Patan", "Pathankot", "Patiala", "Patna", "Pondicherry", "Port Blair", "Prakasam", "Pratapgarh", "Puducherry", "Pune", "Puri", "Purnia", "Puruliya", "Raebareli", "Raichur", "Raigad", "Raipur", "Raisen", "Rajahmundry", "Rajkot", "Rajmohan", "Rajpipla", "Ramanathapuram", "Ranchi", "Ranipet", "Ratnagiri", "Ravulapalem", "Rourkela", "Sagar", "Saharanpur", "Salem", "Sambalpur", "Sangli", "Sangrur", "Sankrail", "Sardarshahr", "Sasaram", "Sathyamangalam", "Satna", "Secunderabad", "Sehore", "Seoni", "Serampore", "Shahdol", "Shimla", "Shivamogga", "Sikar", "Silchar", "Siliguri", "Sindhudurg", "Singhbhum", "Sirsa", "Sivaganga", "Sivakasi", "Siwan", "Solapur", "Sonepat", "Sonitpur", "Srikakulam", "Srinagar", "Sundargarh", "Surat", "Surendranagar", "Tadpatri", "Tarn Taran", "Tezpur", "Thane", "Thanjavur", "Thiruvananthapuram", "Thoothukudi", "Thrissur", "Tinsukia", "Tiruchirappalli", "Tirunelveli", "Tirupati", "Tiruppur", "Tumkur", "Tura", "Udaipur", "Udalguri", "Udham Singh Nagar", "Udhna", "Udupi", "Ujjain", "Una", "Unnao", "Uttar Dinajpur", "Vadodara", "Vapi", "Varanasi", "Vellore", "Vijayawada", "Viluppuram", "Virudhunagar", "Visakhapatnam", "Vizianagaram", "Warangal", "Wardha", "Washim", "Yavatmal", "Yemmiganur"];
  const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

 const instituteTypes = [
  "Central University",
  "State University",
  "Private University",
  "Deemed University",
  "Autonomous University",
  "Institute of National Importance",
  "Open University"
];

 const managementTypes = [
  "Public",
  "Private",
  "Government-Aided",
  "Autonomous",
  "Deemed",
  "Central",
  "State",
  "Community",
  "Trust",
  "Society"
];


  // ✅ Fetch universities from backend
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/universities");
        if (res.data.success) {
          setUniversities(res.data.data);
        } else if (Array.isArray(res.data)) {
          setUniversities(res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching universities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  // ✅ Filtering logic applied to universities
  const filteredColleges = universities.filter((uni) => {
    const matchesSearch = `${uni.instituteName} ${uni.city} ${uni.state}`
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesDegree =
      degreeFilter.length === 0 ||
      degreeFilter.some((deg) =>
        uni.courses?.some((c) => c.courseName?.toLowerCase().includes(deg.toLowerCase()))
      );

    const matchesExam =
      examFilter.length === 0 ||
      examFilter.some((exam) =>
        uni.admissions?.some((a) => a.eligibility?.toLowerCase().includes(exam.toLowerCase()))
      );

    const matchesSpecialization =
      specializationFilter.length === 0 ||
      specializationFilter.some((spec) =>
        uni.admissions?.some((a) => a.specialization?.toLowerCase().includes(spec.toLowerCase()))
      );

    const matchesCity =
      cityFilter.length === 0 || cityFilter.includes(uni.city);

    const matchesState =
      stateFilter.length === 0 || stateFilter.includes(uni.state);

    const matchesInstituteType =
      instituteTypeFilter.length === 0 || instituteTypeFilter.includes(uni.type);

    const matchesManagementType =
      managementTypeFilter.length === 0 || managementTypeFilter.includes(uni.ownership);

    return (
      matchesSearch &&
      matchesDegree &&
      matchesExam &&
      matchesSpecialization &&
      matchesCity &&
      matchesState &&
      matchesInstituteType &&
      matchesManagementType
    );
  });

  // ✅ Handle checkbox toggle
  const handleFilterChange = (filterType, value) => {
    const setFunction = {
      degree: setDegreeFilter,
      exam: setExamFilter,
      specialization: setSpecializationFilter,
      city: setCityFilter,
      state: setStateFilter,
      institute: setInstituteTypeFilter,
      management: setManagementTypeFilter,
    }[filterType];

    setFunction((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="explore-page">
      <Navbar />
      <div className="explore-content">
        <header className="explore-header">
          <h1>
            Top Colleges In India 2025 <sub>({filteredColleges.length})</sub>
          </h1>
          <p>
            Top colleges offer a variety of programs for students interested in
            diverse fields. Whether you're pursuing a degree in engineering,
            management, or other specializations, these institutions provide a
            strong academic foundation and robust career opportunities.
          </p>
        </header>

        <div className="main-layout">
          {/* Filters Panel */}
          <div className="filters-panel">
            <h3>Filters</h3>
            <div style={{ display: "flex", flex: 1 }}>
              {/* Left Tabs */}
              <div className="filters-tabs">
                {[
                  { key: "degree", label: "Degrees" },
                  { key: "exam", label: "Exams" },
                  { key: "specialization", label: "Specializations" },
                  { key: "city", label: "City" },
                  { key: "state", label: "State" },
                  { key: "institute", label: "Institute Type" },
                  { key: "management", label: "Management Type" },
                ].map((tab) => (
                  <div
                    key={tab.key}
                    className={`filter-tab ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              {/* Right Content */}
              <div className="filters-content">
                <div className="filter-search">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="filter-options">
                  {activeTab === "degree" &&
                    degrees.map((deg) => (
                      <label key={deg}>
                        <input
                          type="checkbox"
                          checked={degreeFilter.includes(deg)}
                          onChange={() => handleFilterChange("degree", deg)}
                        />
                        {deg}
                      </label>
                    ))}

                  {activeTab === "exam" &&
                    exams.map((exam) => (
                      <label key={exam}>
                        <input
                          type="checkbox"
                          checked={examFilter.includes(exam)}
                          onChange={() => handleFilterChange("exam", exam)}
                        />
                        {exam}
                      </label>
                    ))}

                  {activeTab === "specialization" &&
                    specializations.map((spec) => (
                      <label key={spec}>
                        <input
                          type="checkbox"
                          checked={specializationFilter.includes(spec)}
                          onChange={() => handleFilterChange("specialization", spec)}
                        />
                        {spec}
                      </label>
                    ))}

                  {activeTab === "city" &&
                    cities.map((city) => (
                      <label key={city}>
                        <input
                          type="checkbox"
                          checked={cityFilter.includes(city)}
                          onChange={() => handleFilterChange("city", city)}
                        />
                        {city}
                      </label>
                    ))}

                  {activeTab === "state" &&
                    states.map((state) => (
                      <label key={state}>
                        <input
                          type="checkbox"
                          checked={stateFilter.includes(state)}
                          onChange={() => handleFilterChange("state", state)}
                        />
                        {state}
                      </label>
                    ))}

                  {activeTab === "institute" &&
                    instituteTypes.map((type) => (
                      <label key={type}>
                        <input
                          type="checkbox"
                          checked={instituteTypeFilter.includes(type)}
                          onChange={() => handleFilterChange("institute", type)}
                        />
                        {type}
                      </label>
                    ))}

                  {activeTab === "management" &&
                    managementTypes.map((mgmt) => (
                      <label key={mgmt}>
                        <input
                          type="checkbox"
                          checked={managementTypeFilter.includes(mgmt)}
                          onChange={() => handleFilterChange("management", mgmt)}
                        />
                        {mgmt}
                      </label>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="college-grid">
            {loading ? (
              <p>Loading universities...</p>
            ) : filteredColleges.length === 0 ? (
              <p>No universities found.</p>
            ) : (
              filteredColleges.map((uni) => (
                <CollegeCard key={uni._id} university={uni} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCollegesPage;
