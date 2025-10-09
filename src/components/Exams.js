import React, { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
// --------------------
// Reusable Dropdown Component
// --------------------
const CustomDropdown = ({ title, options, selectedValues, setSelectedValues }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (option) => {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter((v) => v !== option));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  return (
    <div className="mb-6 relative">
      <label className="text-yellow-500 font-bold mb-2 block">{title}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:border-yellow-400 transition"
      >
        <span className="truncate">
          {selectedValues.length > 0 ? selectedValues.join(", ") : `Select ${title}`}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-yellow-50 ${
                  selectedValues.includes(option) ? "bg-yellow-100" : ""
                }`}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border ${
                    selectedValues.includes(option)
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedValues.includes(option) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --------------------
// Exam Card
// --------------------

const ExamCard = ({
  examName,
  conductingBody,
  nextEvent,
  modeLevel,
  eligibility,
  pattern,
  syllabus,
  samplePapers,
  isSelected,
  toggleSelect,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`border border-gray-100 rounded-2xl bg-white shadow-md mb-6 overflow-hidden transition-all duration-50
        ${isSelected ? "ring-4 ring-yellow-500" : "hover:shadow-xl"}`}
    >
      {/* Header Section */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col sm:flex-row sm:space-x-6 flex-1">
          <div>
            {/* Checkbox Select */}
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelect(examName);
                }}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer accent-yellow-500 w-5 h-5"
                id={`select-${examName}`}
              />
              <label
                htmlFor={`select-${examName}`}
                className="select-none text-gray-800 font-semibold cursor-pointer"
              >
                Select
              </label>
            </div>

            {/* Title & Details */}
            <h3 className="text-left font-extrabold text-xl text-gray-800 group-hover:text-yellow-500 transition">
              {examName}
            </h3>
            <p className="text-left text-gray-700">
              Conducting Body:{" "}
              <span className="font-semibold text-gray-900">{conductingBody}</span>
            </p>
            <p className="text-left text-gray-700">
              Next Event:{" "}
              <span className="font-semibold text-yellow-500">{nextEvent}</span>
            </p>
            <p className="text-left text-gray-700">
              Mode & Level:{" "}
              <span className="font-semibold text-gray-900">{modeLevel}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4 sm:mt-0">
         
          <button
            type="button"
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-400 font-semibold transition"
            onClick={(e) => {
              e.stopPropagation();
              alert("Showing Details...");
            }}
          >
            Details
           
          </button>
         
          <button
            type="button"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 font-semibold transition"
            onClick={(e) => {
              e.stopPropagation();
              alert("Apply clicked");
            }}
          >
            Apply
          </button>
          <button
            type="button"
            className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-yellow-500 font-semibold transition"
            onClick={(e) => {
              e.stopPropagation();
              alert("Alert set");
            }}
          >
            Set Alert
          </button>
        </div>
      </div>

      {/* Expandable Section */}
      {/* <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 p-5 text-gray-800 bg-yellow-50"
          >
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">Eligibility</h4>
              <p>{eligibility}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">Pattern</h4>
              <p>{pattern}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">Syllabus</h4>
              <p>{syllabus}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Sample Papers</h4>
              <p>{samplePapers}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </motion.div>
  );
};

// --------------------
// Main Component
// --------------------
const Examain = () => {
  // States list
  const allStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
    "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
    "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
    "Delhi","Jammu and Kashmir",
  ];

  // Filters
  const filters = {
    stream: ["Engineering", "Medical", "Law", "Commerce", "Govt. Jobs", "Management"],
    level: ["UG", "PG", "PhD"],
    examType: ["National", "State", "Scholarship", "Competitive"],
    mode: ["Online", "Offline"],
    dateRange: ["Next 3 months", "Next 6 months", "Custom"],
  };

  // Filter states
  const [selectedStateFilter, setSelectedStateFilter] = useState([]);
  const [selectedStream, setSelectedStream] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  // Top section
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Upcoming");

  // Applied filters
  const appliedFilters = [
    ...selectedStateFilter.map((v) => ({ category: "State", value: v })),
    ...selectedStream.map((v) => ({ category: "Stream", value: v })),
    ...selectedLevel.map((v) => ({ category: "Level", value: v })),
    ...selectedExamType.map((v) => ({ category: "Exam Type", value: v })),
    ...selectedMode.map((v) => ({ category: "Mode", value: v })),
    ...selectedDateRange.map((v) => ({ category: "Date Range", value: v })),
  ];

  // Remove filter
  const removeFilter = (category, value) => {
    switch (category) {
      case "State":
        setSelectedStateFilter(selectedStateFilter.filter((v) => v !== value));
        break;
      case "Stream":
        setSelectedStream(selectedStream.filter((v) => v !== value));
        break;
      case "Level":
        setSelectedLevel(selectedLevel.filter((v) => v !== value));
        break;
      case "Exam Type":
        setSelectedExamType(selectedExamType.filter((v) => v !== value));
        break;
      case "Mode":
        setSelectedMode(selectedMode.filter((v) => v !== value));
        break;
      case "Date Range":
        setSelectedDateRange(selectedDateRange.filter((v) => v !== value));
        break;
      default:
        break;
    }
  };

  // Animation mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compare
  const [compareSelected, setCompareSelected] = useState([]);
  const toggleCompare = (examName) => {
    if (compareSelected.includes(examName)) {
      setCompareSelected(compareSelected.filter((e) => e !== examName));
    } else {
      if (compareSelected.length < 3) {
        setCompareSelected([...compareSelected, examName]);
      } else {
        alert("You can compare up to 3 exams only.");
      }
    }
  };

  const handleCompare = () => {
    if (compareSelected.length < 2) {
      alert("Select at least 2 exams to compare.");
      return;
    }
    alert(`Comparing exams: ${compareSelected.join(", ")}`);
  };

  const handleDownloadCalendar = () => {
    if (compareSelected.length === 0) {
      alert("Select exam(s) to download calendar.");
      return;
    }
    alert(`Downloading calendar for: ${compareSelected.join(", ")}`);
  };

  // Exam data (unchanged)
  const examData = [
    { examName: "JEE Main", conductingBody: "NTA", nextEvent: "Registration Open – 15 Dec 2025",
      modeLevel: "Online, UG", eligibility: "Candidates must have passed Class 12...", 
      pattern: "Multiple choice...", syllabus: "Class 11 and 12...", samplePapers: "Available on NTA...",
      states: [] },
    { examName: "NEET", conductingBody: "NTA", nextEvent: "Exam Date – 30 Sep 2025",
      modeLevel: "Offline, UG", eligibility: "Candidates should have passed Class 12...", 
      pattern: "Single paper...", syllabus: "NCERT Class 11 and 12...", samplePapers: "Download from NTA...",
      states: [] },
    { examName: "MHT CET", conductingBody: "Maharashtra State", nextEvent: "Application Deadline – 1 Apr 2025",
      modeLevel: "Online, UG", eligibility: "Candidates must be domicile of Maharashtra...", 
      pattern: "Multiple choice...", syllabus: "HSC syllabus...", samplePapers: "Available on MHT CET site",
      states: ["Maharashtra"] },
    { examName: "KCET", conductingBody: "Karnataka Examination Authority", nextEvent: "Exam Date – 20 May 2025",
      modeLevel: "Offline, UG", eligibility: "Candidates must be domiciled in Karnataka...", 
      pattern: "Objective questions...", syllabus: "Karnataka State syllabus...", samplePapers: "Official portal...",
      states: ["Karnataka"] },
    { examName: "WBJEE", conductingBody: "West Bengal Board", nextEvent: "Registration Opens – 10 Jan 2025",
      modeLevel: "Online, UG", eligibility: "Candidates should be permanent residents of WB...", 
      pattern: "Multiple choice...", syllabus: "West Bengal syllabus...", samplePapers: "Available on WBJEE...",
      states: ["West Bengal"] },
  ];

  // Filter by state
  const filteredExamData = examData.filter((exam) => {
    if (selectedStateFilter.length === 0) return true;
    if (exam.states.length === 0) return false;
    return exam.states.some((st) => selectedStateFilter.includes(st));
  });

  // Search
  const visibleExams = filteredExamData.filter((exam) =>
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row pb-20">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-72 p-6 border-r border-gray-300 bg-gray-50 transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0 translate-x-[-20px]"
        }`}
      >
        {/* State filter */}
        <CustomDropdown
          title="State"
          options={allStates}
          selectedValues={selectedStateFilter}
          setSelectedValues={setSelectedStateFilter}
        />
        <CustomDropdown
          title="Stream"
          options={filters.stream}
          selectedValues={selectedStream}
          setSelectedValues={setSelectedStream}
        />
        <CustomDropdown
          title="Level"
          options={filters.level}
          selectedValues={selectedLevel}
          setSelectedValues={setSelectedLevel}
        />
        <CustomDropdown
          title="Exam Type"
          options={filters.examType}
          selectedValues={selectedExamType}
          setSelectedValues={setSelectedExamType}
        />
        <CustomDropdown
          title="Mode"
          options={filters.mode}
          selectedValues={selectedMode}
          setSelectedValues={setSelectedMode}
        />
        <CustomDropdown
          title="Date Range"
          options={filters.dateRange}
          selectedValues={selectedDateRange}
          setSelectedValues={setSelectedDateRange}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 bg-gray-100 flex flex-col">
        {/* Search + Applied Filters + Tabs */}
        <section
          className={`mb-8 transition-transform duration-700 ease-in-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {/* Search bar */}
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search Exam by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 focus:border-yellow-500 focus:outline-none shadow-sm text-gray-900"
              
            />
           <span className="absolute right-3 top-3 text-gray-800 font-bold cursor-pointer select-none">
      <i class="fa-solid fa-magnifying-glass"></i>

</span>

          </div>
    
          {/* Applied Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {appliedFilters.length === 0 ? (
              <span className="text-gray-500 italic">No filters applied</span>
            ) : (
              appliedFilters.map(({ category, value }) => (
                <div
                  key={`${category}-${value}`}
                  className="flex items-center bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-semibold shadow cursor-pointer hover:bg-yellow-400 transition"
                  onClick={() => removeFilter(category, value)}
                  title={`Remove ${category}: ${value}`}
                >
                  {value}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </div>
              ))
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-300 pb-2 text-gray-900">
            {["Upcoming", "Ongoing", "Past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-semibold transition-colors duration-300 ${
                  activeTab === tab
                    ? "border-b-4 border-yellow-500 text-yellow-500"
                    : "hover:text-yellow-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          University Exams Dashboard.<span className="text-yellow-500"></span>
        </h1>

        {/* <p className="mb-10 text-lg">
          Select filters from the sidebar or use the search above to narrow down
          exam listings and details.
        </p> */}

        {/* Exam cards */}
        <div
          className={`transition-transform duration-500 ease-in-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {visibleExams.length === 0 ? (
            <p className="text-gray-700">No exams found.</p>
          ) : (
            visibleExams.map((exam) => (
              <ExamCard
                key={exam.examName}
                examName={exam.examName}
                conductingBody={exam.conductingBody}
                nextEvent={exam.nextEvent}
                modeLevel={exam.modeLevel}
                eligibility={exam.eligibility}
                pattern={exam.pattern}
                syllabus={exam.syllabus}
                samplePapers={exam.samplePapers}
                isSelected={compareSelected.includes(exam.examName)}
                toggleSelect={toggleCompare}
              />
            ))
          )}
        </div>
      </main>

      {/* Sticky tools */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-yellow-500 shadow-lg border-t border-yellow-500 z-50 flex items-center justify-center space-x-8 py-3 px-4">
        <button
          onClick={() => alert("Set Alerts clicked")}
          className="bg-yellow-500 text-gray-900 px-5 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
        >
          Set Alerts
        </button>
        <button
          onClick={handleCompare}
          disabled={compareSelected.length < 2}
          className={`px-5 py-2 rounded-md font-semibold transition ${
            compareSelected.length < 2
              ? "bg-yellow-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          }`}
        >
          Compare Exams ({compareSelected.length})
        </button>
        <button
          onClick={handleDownloadCalendar}
          disabled={compareSelected.length === 0}
          className={`px-5 py-2 rounded-md font-semibold transition ${
            compareSelected.length === 0
              ? "bg-yellow-300 text-gray-900 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          }`}
        >
          Download Calendar
        </button>
      </div>
    </div>
    
    </>
  );
};

export default Examain;
