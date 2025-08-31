import React, { useState } from 'react';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const maxCharacters = 500;

  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setReviewText(e.target.value);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="max-w-xl w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Review</h2>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={handleReviewChange}
          />
          <div className="flex items-center mb-4">
            <label className="mr-2 text-gray-600">Give rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">characters: {reviewText.length} / {maxCharacters}</span>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50" disabled>
              Login to Submit
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Reviews</h2>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-gray-600 mb-2">1 Reviews:</p>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-2xl">
              ★★★★★★★★☆☆
            </div>
            <span className="ml-2 text-gray-600">8 / 10</span>
            <span className="ml-auto text-gray-500">Anurag 22 March 2025</span>
          </div>
          <p className="text-gray-700">
            The campus is equipped with modern infrastructure, state-of-the-art laboratories, and sports facilities, creating a holistic environment for students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;