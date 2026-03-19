"use client";

import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [primaryColor, setPrimaryColor] = useState('#15aabf');

  // Load saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('theme-primary-color');
    if (savedColor) {
      setPrimaryColor(savedColor);
    }
  }, []);

  // Update CSS variables whenever primaryColor changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', primaryColor);
      
      // Calculate derived colors (simplified version for now)
      root.style.setProperty('--primary-light', `${primaryColor}11`);
      root.style.setProperty('--primary-shadow', `${primaryColor}33`);
      
      // Save to localStorage
      localStorage.setItem('theme-primary-color', primaryColor);
    }
  }, [primaryColor]);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Appearance & Theme Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Appearance & Theme</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-gray-700">Primary Theme Color</p>
                <p className="text-sm text-gray-500 italic">Automatically sets the UI accent color</p>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 w-52 relative group">
                <div 
                  className="w-10 h-10 rounded-full shadow-inner cursor-pointer border-2 border-white transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  <input 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </div>
                <div className="flex flex-col">
                   <span className="text-sm font-mono text-gray-600 font-bold">{primaryColor.toUpperCase()}</span>
                   <span className="text-[10px] text-gray-400 font-medium">Click to change</span>
                </div>
                <div className="ml-auto w-8 h-8 flex items-center justify-center text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-3.91.4-3.53 3.5-3.53 3.5-.3 2.1 1.1 3.4 1.1 3.4s1.4 1.5 3.5 1.2c0 0 3.1.3 3.5-3.53"/><path d="m2 22 5.5-5.5"/><path d="m13.5 12 1.3 1.3"/></svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer group">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all group-hover:scale-110"></div>
                   </div>
                   <p className="font-medium text-gray-700">Dark Mode</p>
                </div>
                <p className="text-sm text-gray-400">Automatically switch theme based on system preference</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Security Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Notifications & Security</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">Enable Notifications</span>
                  <span className="text-sm text-gray-400 italic">Receive daily email summaries</span>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-70 cursor-not-allowed">
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">Two-Factor Authentication</span>
                  <span className="text-sm text-gray-400 italic">Require a second verification step</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
