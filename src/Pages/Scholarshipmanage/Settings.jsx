import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Settings() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex">
      {/* Sidebar */}
      <Sidebar location={location} />

      {/* Main Content */}
      <div className="flex-1 ml-64 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Settings
              </h1>
              <p className="text-gray-600">Configure your application settings.</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Application Settings
              </h2>
              <p className="text-gray-600">
                This page will allow you to configure application settings such as notifications, themes, and more. (Placeholder for settings functionality)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}