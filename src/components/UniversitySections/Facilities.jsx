import React, { useState } from 'react';
import { FaBook, FaMicroscope, FaLaptop, FaChalkboardTeacher, FaBus, FaUtensils, FaDumbbell, FaClinicMedical, FaHospital, FaFutbol, FaFlask, FaBolt, FaUsers, FaTemperatureHigh, FaBuilding, FaGraduationCap, FaMoneyBillWave, FaComments, FaStar } from 'react-icons/fa';
import { MdLibraryBooks, MdMeetingRoom, MdComputer, MdEmergency } from 'react-icons/md';
import { GiCricketBat, GiSoccerBall, GiTeacher } from 'react-icons/gi';
import { BiPlus } from 'react-icons/bi';
import './facilities.css';

const facilitiesData = [
  { id: 1, name: 'Library', icon: <FaBook style={{ color: '#007bff' }} />, description: 'Well-stocked central library with academic and reference materials.', reviews: ['Quiet place to study.', 'Huge collection of books.'] },
  { id: 2, name: 'Digital Library', icon: <MdLibraryBooks style={{ color: '#007bff' }} />, description: 'Access to e-books, journals, and research databases.', reviews: ['Easy to use and modern.', 'Great for last-minute references.'] },
  { id: 3, name: 'Computer Lab', icon: <MdComputer style={{ color: '#007bff' }} />, description: 'High-speed systems with all major software installed.', reviews: ['Well maintained PCs.', 'Good internet speed.'] },
  { id: 4, name: 'Mechanical Lab', icon: <FaFlask style={{ color: '#007bff' }} />, description: 'Equipped with tools and machines for practical mechanical learning.', reviews: [] },
  { id: 5, name: 'Civil Lab', icon: <FaBuilding style={{ color: '#007bff' }} />, description: 'Advanced tools and models for structural and civil engineering studies.', reviews: [] },
  { id: 6, name: 'Electrical Lab', icon: <FaBolt style={{ color: '#007bff' }} />, description: 'Practical exposure to circuits, power systems, and measurements.', reviews: [] },
  { id: 7, name: 'Digital Classroom', icon: <FaChalkboardTeacher style={{ color: '#007bff' }} />, description: 'Smart boards, digital content, and interactive teaching setup.', reviews: [] },
  { id: 8, name: 'AC Classroom', icon: <FaTemperatureHigh style={{ color: '#007bff' }} />, description: 'Air-conditioned classrooms for comfortable learning environment.', reviews: [] },
  { id: 9, name: 'Auditorium', icon: <MdMeetingRoom style={{ color: '#007bff' }} />, description: 'Large auditorium for events, seminars, and presentations.', reviews: [] },
  { id: 10, name: 'Transport', icon: <FaBus style={{ color: '#007bff' }} />, description: 'Safe and reliable transportation facility for students and staff.', reviews: [] },
  { id: 11, name: 'Canteen', icon: <FaUtensils style={{ color: '#007bff' }} />, description: 'Affordable and hygienic food available on campus.', reviews: [] },
  { id: 12, name: 'Gym', icon: <FaDumbbell style={{ color: '#007bff' }} />, description: 'Fully equipped gym for students’ fitness and health.', reviews: [] },
  { id: 13, name: 'Clinic', icon: <FaClinicMedical style={{ color: '#007bff' }} />, description: 'Campus clinic with basic medical support and nurse.', reviews: [] },
  { id: 14, name: 'Hospital', icon: <FaHospital style={{ color: '#007bff' }} />, description: 'Nearby hospital access for advanced treatments.', reviews: [] },
  { id: 15, name: 'Emergency Medical', icon: <MdEmergency style={{ color: '#007bff' }} />, description: '24x7 emergency medical service available on campus.', reviews: [] },
  { id: 16, name: 'Cricket Ground', icon: <GiCricketBat style={{ color: '#007bff' }} />, description: 'Well-maintained ground for regular matches and practice.', reviews: [] },
  { id: 17, name: 'Football Ground', icon: <GiSoccerBall style={{ color: '#007bff' }} />, description: 'Full-size football field with proper turf.', reviews: [] },
  { id: 18, name: 'R&D Cell', icon: <FaGraduationCap style={{ color: '#007bff' }} />, description: 'Support for student research, innovation, and project funding.', reviews: [] },
  { id: 19, name: 'Cafeteria', icon: <FaUtensils style={{ color: '#007bff' }} />, description: 'Relaxed space for meals and group discussions.', reviews: [] },
  { id: 20, name: 'Boys Hostel', icon: <FaUsers style={{ color: '#007bff' }} />, description: 'Comfortable accommodation with mess and security.', reviews: [] },
  { id: 21, name: 'ATM', icon: <FaMoneyBillWave style={{ color: '#007bff' }} />, description: 'On-campus ATM for quick financial access.', reviews: [] },
];

const Facilities = ({ darkMode }) => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [reviewInput, setReviewInput] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddReview = () => {
    if (reviewInput.trim() && rating > 0) {
      const updatedFacilities = facilitiesData.map((facility) => {
        if (facility.id === selectedFacility.id) {
          return {
            ...facility,
            reviews: [
              ...facility.reviews,
              { text: reviewInput, rating, timestamp: new Date().toLocaleString() },
            ],
          };
        }
        return facility;
      });
      setSelectedFacility({
        ...selectedFacility,
        reviews: [
          ...selectedFacility.reviews,
          { text: reviewInput, rating, timestamp: new Date().toLocaleString() },
        ],
      });
      setReviewInput('');
      setRating(0);
    }
  };

  return (
    <div className={`facilities-container ${darkMode ? 'dark' : ''}`}>
      <h2 className="facilities-title" style={{ color: '#007bff' }}>Campus Facilities</h2>
      <div className="facilities-grid">
        {facilitiesData.map((facility) => (
          <div
            key={facility.id}
            className="facility-card"
            onMouseEnter={(e) => { e.currentTarget.querySelector('.facility-icon').firstChild.style.color = '#ffcc00'; }}
            onMouseLeave={(e) => { e.currentTarget.querySelector('.facility-icon').firstChild.style.color = '#007bff'; }}
          >
            <div className="facility-header">
              <span className="facility-icon">{facility.icon}</span>
              <h3 className="facility-title">{facility.name}</h3>
            </div>
            <p className="facility-description">{facility.description}</p>
            <div className="reviews">
              {facility.reviews.length > 0 ? (
                <ul>
                  {facility.reviews.map((review, index) => (
                    <li key={index}>{typeof review === 'object' ? review.text : review}</li>
                  ))}
                </ul>
              ) : (
                <span>No reviews yet.</span>
              )}
            </div>
            <button
              onClick={() => setSelectedFacility(facility)}
              className="review-button"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffcc00'; e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--button-primary)'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              <BiPlus className="mr-1" /> Review
            </button>
          </div>
        ))}
      </div>

      {/* All Reviews Section */}
      <div className="reviews-section">
        <h3 className="reviews-title">All Reviews</h3>
        {facilitiesData
          .flatMap((facility) => facility.reviews)
          .map((review, index) => (
            <div key={index} className="review-item">
              <p className="review-text">{typeof review === 'object' ? review.text : review}</p>
              {typeof review === 'object' && (
                <p className="review-meta">Rating: {review.rating} / 5 | Posted: {review.timestamp}</p>
              )}
            </div>
          ))}
        {facilitiesData.every((facility) => facility.reviews.length === 0) && (
          <p className="no-reviews">No reviews available yet.</p>
        )}
      </div>

      {/* Review Popup */}
      {selectedFacility && (
        <div className="modal-overlay" onClick={() => setSelectedFacility(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Review for {selectedFacility.name}</h3>
            <div className="mb-3">
              <label className="modal-label">Rating:</label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`star ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <textarea
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              rows={3}
              placeholder="Write your review..."
              className="textarea"
            />
            <div className="modal-buttons">
              <button
                onClick={() => setSelectedFacility(null)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="submit-button"
                disabled={!reviewInput.trim() || rating === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Facilities;