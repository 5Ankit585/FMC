import React, { useState } from 'react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Welcome Back Event', content: 'Join us for the annual welcome back event on Sept 1, 2025.', date: '2025-08-10' },
    { id: 2, title: 'Exam Schedule', content: 'Midterm exams start on Oct 15, 2025.', date: '2025-08-12' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddAnnouncement = () => {
    if (newTitle && newContent) {
      const newAnnouncement = {
        id: announcements.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString().split('T')[0],
      };
      setAnnouncements([...announcements, newAnnouncement]);
      setNewTitle('');
      setNewContent('');
    }
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  return (
    <div className="announcements-container">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      <div className="add-announcement mb-6">
        <input
          type="text"
          placeholder="Announcement Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 mr-2 w-1/3"
        />
        <textarea
          placeholder="Announcement Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="border p-2 mr-2 w-1/3"
        ></textarea>
        <button
          onClick={handleAddAnnouncement}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Announcement
        </button>
      </div>
      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-card border p-4 mb-4 rounded">
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p className="text-sm text-gray-500">Posted on: {announcement.date}</p>
            <button
              onClick={() => handleDeleteAnnouncement(announcement.id)}
              className="bg-red-500 text-white p-1 mt-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;