import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "./CoursePage.css";

/* Stat Component */
const Stat = ({ label, value, highlight = false }) => (
  <div className="stat-container">
    <span className="stat-label">{label}</span>
    <span className={`stat-value ${highlight ? "stat-highlight" : ""}`}>{value}</span>
  </div>
);

/* Generic Card with optional image */
const Card = ({ title, desc, icon, imgSrc }) => (
  <div className="card-container">
    {imgSrc ? (
      <div className="card-image">
        <img src={imgSrc} alt={title} className="card-img" loading="lazy" />
        <div className="card-img-overlay" />
      </div>
    ) : null}
    <div className="card-content">
      <div className="card-icon">
        {icon ?? <span className="card-icon-fallback">★</span>}
      </div>
      <h4 className="card-title">{title}</h4>
      {desc && <p className="card-desc">{desc}</p>}
    </div>
  </div>
);

/* Institute Card */
const InstituteCard = ({ title, desc, img }) => (
  <div className="institute-card-container">
    <div className="institute-card">
      <div className="institute-image">
        <img src={img} alt={title} className="institute-img" loading="lazy" />
        <div className="institute-img-overlay" />
      </div>
      <div className="institute-content">
        <h4 className="institute-title">{title}</h4>
        {desc && <p className="institute-desc">{desc}</p>}
      </div>
    </div>
  </div>
);

/* Section Component */
const Section = ({ title, subtitle, children, id }) => (
  <section id={id} className="section-container">
    <div className="section-header">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      <div className="section-buttons">
        <a href="#counselor" className="section-counselor-button">
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
        const result = await res.json();

        if (!result.success) return console.error("Course fetch failed");

        const courseData = result.data;
        const parsed = {
          ...courseData,
          highlights: courseData.highlights ? courseData.highlights.split(",") : [],
          specializations: courseData.specializations ? courseData.specializations.split(",") : [],
          careerRoles: courseData.careerRoles ? courseData.careerRoles.split(",") : [],
          topInstitutes: courseData.topInstitutes ? courseData.topInstitutes.split(",") : [],
          curriculum: courseData.curriculum ? courseData.curriculum.split(",") : [],
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

  if (!course) return <div className="loading">Loading course...</div>;

  return (
    <div className="page-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <div className="navbar-logo-icon">{course.shortName || "🎓"}</div>
            <span className="navbar-logo-text">{course.courseTitle}</span>
          </div>
          <nav className="navbar-links">
            <a href="#overview" className="navbar-link">Overview</a>
            <a href="#specializations" className="navbar-link">Specializations</a>
            <a href="#curriculum" className="navbar-link">Curriculum</a>
            <a href="#institutes" className="navbar-link">Top Institutes</a>
            <a href="#career" className="navbar-link">Careers</a>
          </nav>
          <a href="#brochure" className="navbar-brochure-button">Download Brochure</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className="hero-section">
        <div className="hero-overlay">
          <div className="hero-blur-left" />
          <div className="hero-blur-right" />
        </div>
        <div className="hero-grid">
          <div>
            <div className="hero-badge">{course.shortName || "Course"}</div>
            <h1 className="hero-title">{course.courseTitle}</h1>
            <p className="hero-description">{course.description}</p>
            <div className="hero-stats">
              <Stat label="Duration" value={course.duration} highlight />
              <Stat label="Fees" value={course.fees} />
              <Stat label="Mode" value={course.mode} />
              <Stat label="Level" value={course.level} />
            </div>
            <div className="hero-buttons">
              <a href="#counselor" className="hero-counselor-button">Talk to Counselor</a>
              <a href="#brochure" className="hero-brochure-button">Download Brochure</a>
            </div>
          </div>
          <div className="highlights-container">
            <div className="highlights-background" />
            <h3 className="highlights-title">Key Highlights</h3>
            <ul className="highlights-list">
              {course.highlights.map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
            <div className="highlights-stats">
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
        <div className="specializations-grid">
          {course.specializations.map((spec, idx) => (
            <Card
              key={idx}
              title={spec.trim()}
              imgSrc={SPECIALIZATION_IMAGES[spec.trim()] || "/default-spec.jpeg"}
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
        <div className="curriculum-grid">
          {course.curriculum.map((item, idx) => (
            <div key={idx} className="curriculum-card">
              <h4 className="curriculum-title">Subject {idx + 1}</h4>
              <ul className="curriculum-list">
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
        <div className="institutes-container">
          <div className="institutes-background" />
          <div ref={scrollerRef} className="institutes-scroller">
            <div className="institutes-content">
              {course.topInstitutes.map((inst, idx) => (
                <InstituteCard
                  key={idx}
                  title={inst.trim()}
                  img={INSTITUTE_IMAGES[inst.trim()] || "/default-institute.jpeg"}
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
        <div className="careers-grid">
          <div className="careers-card">
            <h4 className="careers-title">Popular Roles</h4>
            <ul className="careers-list">
              {course.careerRoles.map((role, idx) => (
                <li key={idx}>{role.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section id="apply" className="cta-section">
        <div className="cta-container">
          <div className="cta-background" />
          <div className="cta-grid">
            <div>
              <h3 className="cta-title">Ready to begin your journey?</h3>
              <p className="cta-description">
                Apply now or speak with a counselor to clarify admissions and course details.
              </p>
            </div>
            <div className="cta-buttons">
              <a href="#counselor" className="cta-counselor-button">Talk to Counselor</a>
              <a href="#apply-form" className="cta-apply-button">Start Application</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Course Guide</p>
          <div className="footer-links">
            <a href="#brochure" className="footer-link">Brochure</a>
            <a href="#counselor" className="footer-link">Counselor</a>
          </div>
        </div>
      </footer>
    </div>
  );
}