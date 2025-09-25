import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExploreCoursesPage.css';

const CourseExplorer = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [filters, setFilters] = useState({
    streams: [],
    avgFee: [],
    courseType: [],
    courseDuration: [],
    courseLevel: [],
    states: [],
    cities: [],
    exams: [],
    programTypes: [],
  });
  const [loading, setLoading] = useState(true);

  // Sample data
  const streams = ['PCM', 'PCB', 'Commerce', 'Humanities/Arts', 'Engineering', 'Medical', 'Management'];
  const avgFee = ['<1L', '1L-5L', '5L-10L', '>10L'];
  const courseTypes = ['UG Degree', 'PG Degree', 'Diploma', 'Certificate'];
  const courseDurations = ['3 Years', '4 Years', '2 Years', '1 Year'];
  const courseLevels = ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate', 'PhD'];
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
  const states = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal'];
  const exams = ['JEE Main', 'NEET', 'CAT', 'CUET', 'TS DOST'];
  const programTypes = ['Full Time', 'Part Time', 'Online', 'Distance'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://api.example.com/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setCourses([
          {
            id: 1,
            title: 'Bachelor of Commerce [B.Com]',
            duration: '3 Years',
            degreeType: 'UG Degree',
            studyMode: 'Full Time',
            level: 'Undergraduate',
            avgFee: '1L-5L',
            eligibility: '10+2 | Entrance Exam: TS DOST',
            exams: ['CUET', 'TS DOST'],
            description:
              'BCom is a 3-year undergraduate course for students who have cleared 12th standard with a major in Commerce. The full form of BCom is Bachelor of Commerce. BCom Admissions are based on merit as well as entrance exams such as CUET, PU CET, NPAT, etc. BCom offers diverse career opportunities.',
            jobRoles: ['Chartered Accountant', 'Accounting Analyst', 'Equity Analyst', 'Financial Analyst'],
          },
          {
            id: 2,
            title: 'Bachelor of Computer Applications [BCA]',
            duration: '3 Years',
            degreeType: 'UG Degree',
            studyMode: 'Full Time',
            level: 'Undergraduate',
            avgFee: '1L-5L',
            eligibility: '10+2 with Maths | Entrance Exam: CUET',
            exams: ['CUET'],
            description: 'BCA is a 3-year undergraduate course focusing on computer applications and software development.',
            jobRoles: ['Software Developer', 'Web Designer', 'System Analyst'],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleAccordion = (category) => {
    setActiveAccordion(activeAccordion === category ? null : category);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilters =
      (!filters.streams.length || filters.streams.includes('Commerce')) &&
      (!filters.avgFee.length || filters.avgFee.includes(course.avgFee)) &&
      (!filters.courseType.length || filters.courseType.includes(course.degreeType)) &&
      (!filters.courseDuration.length || filters.courseDuration.includes(course.duration)) &&
      (!filters.courseLevel.length || filters.courseLevel.includes(course.level)) &&
      (!filters.exams.length || course.exams.some((exam) => filters.exams.includes(exam))) &&
      (!filters.programTypes.length || filters.programTypes.includes(course.studyMode));
    return matchesSearch && matchesFilters;
  });

  /* ===== Inner Components ===== */
  const Header = () => (
    <header className="ce-header">
      <div className="ce-header-container">
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span>Course Finder</span>
        </button>
        <div className="ce-header-links">
          {['All Courses', 'B.Tech', 'MBA', 'M.Tech', 'MBBS', 'B.Com', 'B.Sc', 'B.Sc (Nursing)', 'BA', 'BBA', 'BCA'].map(
            (link) => (
              <a key={link} href="#">
                {link}
              </a>
            )
          )}
        </div>
        <a href="#" className="ce-btn-primary">
          NEW Course Finder
        </a>
      </div>
    </header>
  );

  const SidebarFilters = () => {
    const filterCategories = [
      { key: 'streams', label: 'Stream', options: streams },
      { key: 'avgFee', label: 'Avg Fee Per Year (in Rupees)', options: avgFee },
      { key: 'courseType', label: 'Course Type', options: courseTypes },
      { key: 'courseDuration', label: 'Course Duration (in Years)', options: courseDurations },
      { key: 'courseLevel', label: 'Course Level', options: courseLevels },
    ];

    return (
      <div className="ce-sidebar md:w-1/4">
        <h2>Filters</h2>
        {filterCategories.map((category) => (
          <div key={category.key} className="ce-accordion">
            <button onClick={() => toggleAccordion(category.key)} className="ce-accordion-btn">
              {category.label}
              <svg
                className={`w-5 h-5 transform ${activeAccordion === category.key ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeAccordion === category.key && (
              <div className="ce-accordion-options">
                {category.options.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={filters[category.key].includes(option)}
                      onChange={() => handleFilterChange(category.key, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const SearchFilters = () => {
    const topFilters = [
      { key: 'courses', label: 'Course', options: courses.map((c) => c.title) },
      { key: 'states', label: 'State', options: states },
      { key: 'cities', label: 'City', options: cities },
      { key: 'exams', label: 'Entrance/Exam Accepted', options: exams },
      { key: 'programTypes', label: 'Program Type', options: programTypes },
    ];

    return (
      <div className="ce-searchbar">
        <div className="flex flex-col md:flex-row gap-4 items-center"> {/* Added items-center */}
          <input
            type="text"
            placeholder="Find your desired course"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="ce-search-input"
          />
          <button className="ce-btn-orange">Set Default</button>
        </div>
        <div className="ce-top-filters">
          {topFilters.map((filter) => (
            <select
              key={filter.key}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    );
  };

  const CourseCard = ({ course }) => (
    <div className="ce-course-card">
      <h3 className="ce-course-title">{course.title}</h3>
      <div className="ce-tags">
        {[course.duration, course.degreeType, course.studyMode, course.level].map((tag) => (
          <span key={tag} className="ce-tag">{tag}</span>
        ))}
      </div>
      <p className="ce-eligibility"><strong>Course Eligibility:</strong> {course.eligibility}</p>
      <p className="ce-description">{course.description}</p>
      <div className="ce-jobroles">
        {course.jobRoles.map((role) => (
          <span key={role} className="ce-jobrole">{role}</span>
        ))}
      </div>
      <div className="ce-card-footer">
        <a href="#" className="ce-link">
          View {course.title.split(' ')[0]} Colleges
        </a>
        <button className="ce-btn-apply">Apply Now →</button>
      </div>
    </div>
  );

  /* ===== Main JSX ===== */
  return (
    <div className="course-explorer">
      <Header />
      <div className="ce-main">
        <h1 className="ce-title">List of Top Courses in Indian Colleges 2025</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <SidebarFilters />
          <div className="md:w-3/4">
            <SearchFilters />
            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                <p className="text-center text-gray-500 py-8">Loading courses...</p>
              ) : filteredCourses.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No courses found.</p>
              ) : (
                filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseExplorer;