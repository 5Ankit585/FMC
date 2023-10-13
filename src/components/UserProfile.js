import React from "react";
import profileimg from '../Images/btech-cp.png'
const UserProfile = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md w-64">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            <img src={profileimg} alt="profile" className=" overflow-hidden"/>
          </div>
          <div>
            <h1>Tribhuwan</h1>
          </div>
        </div>
    
        <hr className="my-4" />
        <div className="text-left">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Email:</span> john.doe@example.com
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Location:</span> New York
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Phone:</span> (123) 456-7890
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
