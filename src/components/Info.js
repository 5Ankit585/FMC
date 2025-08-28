import React from "react";
import "./Info.css"; // Import the CSS file
import Image1 from "../Images/pngegg(2).png";
import Image2 from "../Images/pngegg(3).png";
import Image3 from "../Images/pngegg(4).png";
import Image4 from "../Images/pngegg(5).png";
import Image5 from "../Images/pngegg(6).png";
import Image6 from "../Images/pngegg(7).png";
import Image7 from "../Images/pngegg(8).png";

export default function Info() {
  const cards = [
    { title: "Courses & University Search", desc: "Quickly find courses and universities that fit your interests and goals.", img: Image1 },
    { title: "Scholarship Matcher", desc: "Discover scholarships tailored to your profile and maximize opportunities.", img: Image2 },
    { title: "Career Pathways", desc: "Prepare effectively for exams and plan your career path with expert resources.", img: Image3 },
    { title: "Study Abroad / Foreign Student Support", desc: "Get guidance and assistance for studying abroad and international student life.", img: Image4 },
    { title: "Exam Preparation", desc: "Access study materials, mock tests, and tips to prepare confidently for your exams.", img: Image5 },
    { title: "Rank Prediction", desc: "Estimate your rank based on performance analytics and previous trends.", img: Image6 },
    { title: "News", desc: "Latest news of exams, universities, and results.", img: Image7 },
    { title: "Blogs", desc: "Read insightful articles, tips, and guides written by experts and students.", img: Image6 },
  ];

  return (
    <section className="info-comp-section">
      <div className="info-comp-container">
        <h2 className="info-comp-title">
          <span>Bring Your</span>
          <span className="info-comp-highlight">Vision into Focus</span>
        </h2>

        <div className="info-comp-cards-grid">
          {cards.map((card, index) => (
            <div className="info-comp-card" key={index}>
              <div className="info-comp-card-img">
                <img src={card.img} alt={card.title} />
              </div>
              <div className="info-comp-card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
