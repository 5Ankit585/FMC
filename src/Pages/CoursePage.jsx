import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "./CoursePage.css";

/* Stat Component */
const Stat = ({ label, value, highlight = false }) => (
  <div className="course-stat-container">
    <span className="course-stat-label">{label}</span>
    <span className={`course-stat-value ${highlight ? "course-stat-highlight" : ""}`}>{value}</span>
  </div>
);

/* Generic Card with optional image */
const Card = ({ title, desc, icon, imgSrc }) => (
  <div className="course-card-container">
    {imgSrc ? (
      <div className="course-card-image">
        <img src={imgSrc} alt={title} className="course-card-img" loading="lazy" />
        <div className="course-card-img-overlay" />
      </div>
    ) : null}
    <div className="course-card-content">
      <div className="course-card-icon">
        {icon ?? <span className="course-card-icon-fallback">★</span>}
      </div>
      <h4 className="course-card-title">{title}</h4>
      {desc && <p className="course-card-desc">{desc}</p>}
    </div>
  </div>
);

/* Institute Card */
const InstituteCard = ({ title, desc, img }) => (
  <div className="course-institute-card-container">
    <div className="course-institute-card">
      <div className="course-institute-image">
        <img src={img} alt={title} className="course-institute-img" loading="lazy" />
        <div className="course-institute-img-overlay" />
      </div>
      <div className="course-institute-content">
        <h4 className="course-institute-title">{title}</h4>
        {desc && <p className="course-institute-desc">{desc}</p>}
      </div>
    </div>
  </div>
);

/* Section Component */
const Section = ({ title, subtitle, children, id }) => (
  <section id={id} className="course-section-container">
    <div className="course-section-header">
      <div>
        <h2 className="course-section-title">{title}</h2>
        {subtitle && <p className="course-section-subtitle">{subtitle}</p>}
      </div>
      <div className="course-section-buttons">
        <a href="#counselor" className="course-section-counselor-button">
          Talk to Counselor
        </a>
      </div>
    </div>
    {children}
  </section>
);

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const scrollerRef = useRef(null);

  // Mock image mappings (replace with actual asset paths or API data)
  const INSTITUTE_IMAGES = {
    "IIM Indore": "/Indore.jpeg",
    "Shaheed Sukhdev College": "/Delhi.jpeg",
    "NMIMS Mumbai": "/Mumbai.jpeg",
    "Symbiosis": "/Symbiosis.jpeg",
  };

  const SPECIALIZATION_IMAGES = {
    "Marketing": "/Marketing.jpeg",
    "Finance": "/Finance.jpeg",
    "HR Management": "/HR.jpeg",
    "Business Analytics": "/BA.jpeg",
  };

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        const courseData = await res.json();
        console.log("Course fetched:", courseData);

        const parsed = {
          ...courseData,
          highlights: courseData.highlights ? courseData.highlights.split(",") : [],
          careerRoles: courseData.careerRoles ? courseData.careerRoles.split(",") : [],
          topInstitutes: courseData.topInstitutes ? courseData.topInstitutes.split(",") : [],
          curriculum: courseData.curriculum ? courseData.curriculum.split(",") : [],
          specializations: courseData.specializations || [], // Keep as array of objects
        };

        setCourse(parsed);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);

  // Auto-scroll for institutes
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const firstCard = el.querySelector(":scope > .contents > *");
    const cardWidth = firstCard?.getBoundingClientRect().width || 320;
    const gap = 16;
    const stride = cardWidth * 3 + gap * 3;
    let scrollAmount = 0;

    const step = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = scrollAmount + stride;
      if (next >= max - 4) {
        scrollAmount = 0;
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollAmount = next;
        el.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const interval = setInterval(step, 3200);
    const pause = () => clearInterval(interval);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mousedown", pause);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("mousedown", pause);
    };
  }, [course]);

  if (!course) return <div className="course-loading">Loading course...</div>;

  return (
    <div className="course-page-container">
      {/* Navbar */}
      <header className="course-navbar">
        <div className="course-navbar-content">
          <div className="course-navbar-logo">
            <div className="course-navbar-logo-icon">{course.shortName || "🎓"}</div>
            <span className="course-navbar-logo-text">{course.courseTitle}</span>
          </div>
          <nav className="course-navbar-links">
            <a href="#overview" className="course-navbar-link">Overview</a>
            <a href="#specializations" className="course-navbar-link">Specializations</a>
            <a href="#curriculum" className="course-navbar-link">Curriculum</a>
            <a href="#institutes" className="course-navbar-link">Top Institutes</a>
            <a href="#career" className="course-navbar-link">Careers</a>
          </nav>
          <a href="#brochure" className="course-navbar-brochure-button">Download Brochure</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className="course-hero-section">
        <div className="course-hero-overlay">
          <div className="course-hero-blur-left" />
          <div className="course-hero-blur-right" />
        </div>
        <div className="course-hero-grid">
          <div>
            <div className="course-hero-badge">{course.shortName || "Course"}</div>
            <h1 className="course-hero-title">{course.courseTitle}</h1>
            <p className="course-hero-description">{course.description}</p>
            <div className="course-hero-stats">
              <Stat label="Duration" value={course.duration} highlight />
              <Stat label="Fees" value={course.fees} />
              <Stat label="Mode" value={course.mode} />
              <Stat label="Level" value={course.level} />
            </div>
            <div className="course-hero-buttons">
              <a href="#counselor" className="course-hero-counselor-button">Talk to Counselor</a>
              <a href="#brochure" className="course-hero-brochure-button">Download Brochure</a>
            </div>
          </div>
          <div className="course-highlights-container">
            <div className="course-highlights-background" />
            <h3 className="course-highlights-title">Key Highlights</h3>
            <ul className="course-highlights-list">
              {course.highlights.map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
            <div className="course-highlights-stats">
              <Stat label="Internship" value={course.internship || "N/A"} />
              <Stat label="Placement" value={course.placement || "N/A"} />
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <Section
        id="specializations"
        title="Specializations"
        subtitle="Choose a focus area to align with career goals."
      >
        <div className="course-specializations-grid">
          {course.specializations?.map((spec, idx) => (
            <Card
              key={idx}
              title={spec.name || `Specialization ${idx + 1}`}
              desc={spec.description}
              imgSrc={spec.image ? `http://localhost:5000/${spec.image}` : "/default-spec.jpeg"}
            />
          ))}
        </div>
      </Section>

      {/* Curriculum */}
      <Section
        id="curriculum"
        title="Curriculum Snapshot"
        subtitle="Core subjects and electives."
      >
        <div className="course-curriculum-grid">
          {course.curriculum.map((item, idx) => (
            <div key={idx} className="course-curriculum-card">
              <h4 className="course-curriculum-title">Subject {idx + 1}</h4>
              <ul className="course-curriculum-list">
                <li>{item.trim()}</li>
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Top Institutes */}
      <Section
        id="institutes"
        title="Top Institutes"
        subtitle="Popular institutions offering this course."
      >
        <div className="course-institutes-container">
          <div className="course-institutes-background" />
          <div ref={scrollerRef} className="course-institutes-scroller">
            <div className="course-institutes-content">
              {course.topInstituteImages?.map((item, idx) => (
                <InstituteCard
                  key={idx}
                  title={item.description || course.topInstitutes[idx] || `Institute ${idx + 1}`}
                  img={item.url ? `http://localhost:5000/${item.url}` : "/default-institute.jpeg"}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Career Opportunities */}
      <Section
        id="career"
        title="Career Opportunities"
        subtitle="Roles with strong growth potential."
      >
        <div className="course-careers-grid">
          <div className="course-careers-card">
            <h4 className="course-careers-title">Popular Roles</h4>
            <ul className="course-careers-list">
              {course.careerRoles.map((role, idx) => (
                <li key={idx}>{role.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section id="apply" className="course-cta-section">
        <div className="course-cta-container">
          <div className="course-cta-background" />
          <div className="course-cta-grid">
            <div>
              <h3 className="course-cta-title">Ready to begin your journey?</h3>
              <p className="course-cta-description">
                Apply now or speak with a counselor to clarify admissions and course details.
              </p>
            </div>
            <div className="course-cta-buttons">
              <a href="#counselor" className="course-cta-counselor-button">Talk to Counselor</a>
              <a href="#apply-form" className="course-cta-apply-button">Start Application</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <footer className="course-footer">
        <div className="course-footer-content">
          <p>© {new Date().getFullYear()} Course Guide</p>
          <div className="course-footer-links">
            <a href="#brochure" className="course-footer-link">Brochure</a>
            <a href="#counselor" className="course-footer-link">Counselor</a>
          </div>
        </div>
      </footer>
    </div>
  );
}