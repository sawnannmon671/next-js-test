"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const Header = () => {
  const [lang, setLang] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'US English', flag: '/flags/us.png' },
    { code: 'mm', name: 'Myanmar', flag: '/flags/myanmar.png' }
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 fixed left-64 right-0 top-0 z-20 shadow-sm backdrop-blur-md bg-white/80">
      <div className="relative">
        <button 
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-gray-100"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200 shadow-sm">
             <Image src={currentLang.flag} alt={currentLang.name} fill className="object-cover" />
          </div>
          <span className="text-sm font-semibold">{currentLang.name}</span>
          <svg className={`text-gray-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>

        {isLangOpen && (
          <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-50 p-2 animate-in fade-in zoom-in-95 duration-200 z-50">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsLangOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${lang === l.code ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                   <Image src={l.flag} alt={l.name} fill className="object-cover" />
                </div>
                <span className="text-sm font-bold">{l.name}</span>
                {lang === l.code && (
                  <svg className="ml-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-400">
          <button className="relative hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="relative hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="m19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Jennifer</p>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-shadow">
             <Image src="https://ui-avatars.com/api/?name=Jennifer&background=15aabf&color=fff" alt="User" fill className="object-cover" />
          </div>
          <svg className="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
