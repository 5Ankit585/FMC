import React from "react";
import { Link } from "react-router-dom";
import "./Info.css"; // Import the CSS file
import Image1 from "../Images/pngegg(2).png";
import Image2 from "../Images/pngegg(3).png";
import Image3 from "../Images/pngegg(4).png";
import Image4 from "../Images/pngegg(5).png";
import Image5 from "../Images/pngegg(6).png";
import Image6 from "../Images/pngegg(7).png";

export default function Info() {
  const cards = [
    {
      title: "Explore Universities, College, and Courses",
      desc: "Explore the best colleges and universities based on your interest in the type, of course, you want to choose",
      img: Image1,
      link: "/explorecollegespage",
    },
    {
      title: "Free Counselling By Experts",
      desc: "Get Free Counselling from our experts and good advice on choosing the best-suited career for your ward",
      img: Image2,
      link: "/counsellingpage",
      className: "info-block", // ✅ added CSS class
    },
    {
      title: "Education Loan And Scholarship",
      desc: "Get easy loans and scholarships based on various schemes launched by governments and tests conducted by the university.",
      img: Image3,
      link: "/scholarship",
    },
    {
      title: "Study Abroad",
      desc: "Want to secure your future and go abroad just give it a click and you will be guided with step by step procedure to go abroad and study there.",
      img: Image4,
      link: "",
    },
    {
      title: "Online Coaching",
      desc: "Want the best coaching institutes for your ward to crack various competitive exams? Just click it and you will be redirected to the best online coaching institutes in India.",
      img: Image5,
      link: "",
    },
    {
      title: "Education News And Exam Updates",
      desc: "Just one single click will lead you to the page that consists of all the latest news and exam updates",
      img: Image6,
      link: "",
    },
  ];

  return (
    <section className="info-comp-section">
      <div className="info-comp-container">
        <h2 className="info-comp-title">
          <span>Bring Your</span>
          <span className="info-comp-highlight"> Vision into Focus</span>
        </h2>

        <div className="info-comp-cards-grid">
          {cards.map((card, index) => {
            const cardContent = (
              <div
                className={card.className ? card.className : "info-comp-card"}
                key={index}
              >
                <div className="info-comp-card-img info-icon">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="info-comp-card-content info-text">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            );

            return card.link ? (
              <Link to={card.link} key={index}>
                {cardContent}
              </Link>
            ) : (
              cardContent
            );
          })}
        </div>
      </div>
    </section>
  );
}
