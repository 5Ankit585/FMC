import React from 'react';
import './NewsArticles.css';

const NewsArticles = () => {
  const newsItems = [
    {
      id: 1,
      title: 'NEET (UG) 2025: Top 10 List',
      date: '14 June 2025',
      content: 'Mahesh Kumar tops with 99 percentile...',
      views: '212 views',
      readTime: '2 min',
      image: 'https://picsum.photos/400/200?random=1'
    },
    {
      id: 2,
      title: 'NEET UG 2025: Results Out',
      date: '14 June 2025',
      content: 'NTA releases NEET UG results...',
      views: '141 views',
      readTime: '2 min',
      image: 'https://picsum.photos/400/200?random=2'
    },
    {
      id: 3,
      title: 'JEE Main 2025 Results',
      date: '18 April 2025',
      content: 'NTA to release JEE results soon...',
      views: '963 views',
      readTime: '2 min',
      image: 'https://picsum.photos/400/200?random=3'
    },
    {
      id: 4,
      title: 'JEE Main 2025 Slip Out',
      date: '21 March 2025',
      content: 'NTA issues JEE Session 2 slip...',
      views: '1006 views',
      readTime: '2 min',
      image: 'https://picsum.photos/400/200?random=4'
    },
    {
      id: 5,
      title: 'NEET PG 2025 Date',
      date: '10 July 2025',
      content: 'NBE sets NEET PG exam date...',
      views: '305 views',
      readTime: '3 min',
      image: 'https://picsum.photos/400/200?random=5'
    },
    {
      id: 6,
      title: 'JEE Advanced 2025 Open',
      date: '25 May 2025',
      content: 'JEE Advanced registration started...',
      views: '450 views',
      readTime: '2 min',
      image: 'https://picsum.photos/400/200?random=6'
    },
    {
      id: 7,
      title: 'CBSE 2025 Schedule',
      date: '15 August 2025',
      content: 'CBSE issues 2025 exam schedule...',
      views: '789 views',
      readTime: '3 min',
      image: 'https://picsum.photos/400/200?random=7'
    },
    {
      id: 8,
      title: 'GATE 2025 Admit Card',
      date: '05 January 2025',
      content: 'GATE admit card now available...',
      views: '620 views',
      readTime: '2 min',
      image: 'https://picsum.photos/400/200?random=8'
    },
  ];

  return (
    <div className="news-container">
      <div className="news-header">
        <div>
          <h1>Latest News</h1>
          <p>Stay updated with latest stories</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {newsItems.map((item) => (
          <div key={item.id} className="news-card" style={{ maxWidth: '320px', height: '280px' }}>
            <img src={item.image} alt={item.title} />
            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', height: 'calc(100% - 128px)' }}>
              <h2 className="news-title">{item.title}</h2>
              <p className="news-date">{item.date}</p>
              <p className="news-content">
                {item.content}
                <a href="#">Read more</a>
              </p>
              <div className="news-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa fa-share" title="Share"></i>
                  <i className="fa fa-bookmark" title="Save"></i>
                  <span>{item.readTime}</span>
                </div>
                <span>{item.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;
