import React from "react";
import "./LatestNews.css";

export default function LatestNews() {
  const news = [
    {
      id: 1,
      category: "Academic Announcements",
      title: "New AI & Data Science Course Launched for 2025",
      date: "August 12, 2025",
      description: "Introducing our new B.Tech in AI & Data Science. Admissions open now!",
      image: "https://media.licdn.com/dms/image/v2/D5612AQFhbGfQlTwJQA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684380897420?e=2147483647&v=beta&t=I4lAsx34IinhnlidHiisPJy4P7TYl65j1pes6IvzJ8M",
    },
    {
      id: 2,
      category: "Academic Announcements",
      title: "Scholarship Applications Open",
      date: "August 10, 2025",
      description: "Merit-based scholarships for 2025-26 academic year. Deadline: September 15, 2025.",
      image: "https://cfbmc.org/wp-content/uploads/2021/02/scholarships-open-1200-%C3%97-640-px.png",
    },
    {
      id: 3,
      category: "Academic Announcements",
      title: "Mid-Term Exam Schedule Released",
      date: "August 8, 2025",
      description: "Exams for all undergraduate programs start September 20, 2025.",
      image: "https://blog.ipleaders.in/wp-content/uploads/2021/05/online-course-blog-header.jpg",
    },
    {
      id: 4,
      category: "Events & Activities",
      title: "AI Innovation Workshop",
      date: "August 15, 2025",
      description: "Join Dr. Jane Smith for a workshop on AI advancements. Register by August 13.",
      image: "https://media.istockphoto.com/id/1588288383/photo/back-view-of-student-raising-his-hand-to-answer-teachers-question-during-education-training.jpg?s=612x612&w=0&k=20&c=ZSyPrLqe6WdE81WXiESD5AqIVw1a7hKv85UI5I-Vwco=",
    },
    {
      id: 5,
      category: "Events & Activities",
      title: "Annual Cultural Fest: Vibrance 2025",
      date: "August 20, 2025",
      description: "Celebrate with music, dance, and art. Open to all students!",
      image: "https://media.licdn.com/dms/image/v2/D5612AQGPXUBLeOloxQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1697206845236?e=2147483647&v=beta&t=eDcSu52WVSEgaXt_FeqU-e6m-jCSdU8ABziKByI3fqI",
    },
    {
      id: 6,
      category: "Achievements",
      title: "Student Wins National Coding Hackathon",
      date: "August 5, 2025",
      description: "Rahul Sharma secures 1st place in CodeFest 2025.",
      image: "https://source.unsplash.com/300x200/?coding,award",
    },
    {
      id: 7,
      category: "Achievements",
      title: "Faculty Publishes in Nature Journal",
      date: "August 1, 2025",
      description: "Dr. Anjali Rao's research on sustainable energy published.",
      image: "https://source.unsplash.com/300x200/?research,science",
    },
    {
      id: 8,
      category: "Campus Life Updates",
      title: "New Robotics Lab Inaugurated",
      date: "August 12, 2025",
      description: "State-of-the-art robotics lab now open for student projects.",
      image: "https://source.unsplash.com/300x200/?robotics,lab",
    },
    {
      id: 9,
      category: "Campus Life Updates",
      title: "Updated Campus Safety Guidelines",
      date: "August 10, 2025",
      description: "New health protocols effective from August 15, 2025.",
      image: "https://source.unsplash.com/300x200/?safety,health",
    },
    {
      id: 10,
      category: "Partnerships & Collaborations",
      title: "MoU Signed with MIT",
      date: "August 7, 2025",
      description: "New collaboration for student exchange and joint research programs.",
      image: "https://source.unsplash.com/300x200/?partnership,collaboration",
    },
    {
      id: 11,
      category: "Partnerships & Collaborations",
      title: "Internship Opportunities with TechCorp",
      date: "August 6, 2025",
      description: "Apply for internships in software development. Deadline: August 20, 2025.",
      image: "https://source.unsplash.com/300x200/?internship,work",
    },
  ];

  
  const groupedNews = news.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

 
  const handleEdit = (id) => {
    alert(`Edit news item with ID: ${id} (placeholder)`);
  };

  const handleDelete = (id) => {
    alert(`Delete news item with ID: ${id} (placeholder)`);
  };

  return (
    <section className="ud-news">
      <h3>Latest News / Posts</h3>
      {Object.keys(groupedNews).map((category) => (
        <div key={category} className="ud-news-section">
          <h4 className="ud-news-category-title">{category}</h4>
          <div className="ud-news-grid">
            {groupedNews[category].map((n) => (
              <div key={n.id} className="ud-news-card">
                <div className="ud-news-image-wrap">
                  <img src={n.image} alt={n.title} className="ud-news-image" />
                </div>
                <div className="ud-news-content">
                  <span className="ud-news-title">{n.title}</span>
                  <p className="ud-news-description">{n.description}</p>
                </div>
                <div className="ud-news-footer">
                  <span className="ud-news-date">{n.date}</span>
                  <div className="ud-news-actions">
                    <button
                      className="ud-btn ud-btn-edit"
                      onClick={() => handleEdit(n.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="ud-btn ud-btn-delete"
                      onClick={() => handleDelete(n.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}