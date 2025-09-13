import React, { useEffect, useState } from "react";
import "./NewsArticles.css";

const NewsArticles = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNewsItems(data.news);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="news-container">
      <div className="news-header">
        <div>
          <h1>Latest News</h1>
          <p>Stay updated with latest stories</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {newsItems.map((item) => (
          <div
            key={item._id}
            className="news-card"
            style={{ maxWidth: "320px", height: "280px" }}
          >
            <img src={item.image} alt={item.title} />
            <div
              style={{
                padding: "0.75rem",
                display: "flex",
                flexDirection: "column",
                height: "calc(100% - 128px)",
              }}
            >
              <h2 className="news-title">{item.title}</h2>
              <p className="news-date">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="news-content">
                {item.description}
                <a href="#"> Read more</a>
              </p>
              <div className="news-meta">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i className="fa fa-share" title="Share"></i>
                  <i className="fa fa-bookmark" title="Save"></i>
                  <span>2 min</span>
                </div>
                <span>{item.views || "0 views"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;
