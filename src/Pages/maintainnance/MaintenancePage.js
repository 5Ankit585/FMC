import React from 'react';
import maintainGif from '../../Images/00-41-53-965_512.webp'
const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-red-600 font-semibold mb-4">Maintenance</h1>
        <p className="text-lg text-gray-600 mb-8">We're performing some maintenance. Please check back later.</p>
        <img src={maintainGif} alt="Maintenance" className="mx-auto" />
      </div>
    </div>
  );
};

export default MaintenancePage;