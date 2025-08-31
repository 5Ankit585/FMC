import React from 'react';

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
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-blue-800 text-white p-3 rounded-t-lg mb-3">
          <h1 className="text-xl font-bold mb-1">Latest News</h1>
          <p className="text-xs">Stay updated with latest stories</p>
        </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">

          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-lg w-full"
              style={{ maxWidth: '320px', height: '280px' }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-32 object-cover"
              />
              <div className="p-3 flex flex-col h-[calc(100%-128px)]">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-base font-semibold text-gray-800 line-clamp-2">{item.title}</h2>
                </div>
                <p className="text-gray-500 text-xs mb-2">{item.date}</p>
                <p className="text-gray-600 mb-2 line-clamp-2 text-sm flex-grow">
                  {item.content} 
                  <a href="#" className="text-blue-500 hover:underline ml-1">Read more</a>
                </p>
                <div className="flex justify-between items-center text-gray-500 text-xs">
                  <div className="flex items-center space-x-2">
                    <i className="fa fa-share text-blue-500 cursor-pointer" title="Share"></i>
                    <i className="fa fa-bookmark text-blue-500 cursor-pointer" title="Save"></i>
                    <span>{item.readTime}</span>
                  </div>
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsArticles;