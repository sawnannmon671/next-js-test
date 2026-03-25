"use client";

import React from 'react';

const LocationPage = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Location Management</h1>
      </div>

      <div className="space-y-8">
        {/* Placeholder for location management content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-800">Locations</h2>
            <p className="mt-2 text-gray-600">Manage your location data here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;