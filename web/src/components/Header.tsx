"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [lang, setLang] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const languages = [
    { code: 'en', name: 'US English', flag: '/flags/us.png' },
    { code: 'mm', name: 'Myanmar', flag: '/flags/myanmar.png' }
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 fixed left-64 right-0 top-0 z-20 shadow-sm backdrop-blur-md bg-white/80">
      {/* Language Switcher */}
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
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${lang === l.code ? 'bg-[#15aabf]/10 text-[#15aabf]' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                   <Image src={l.flag} alt={l.name} fill className="object-cover" />
                </div>
                <span className="text-sm font-bold">{l.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Profile Section */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-6 border-l border-gray-200 group hover:opacity-80 transition-all cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-900 leading-tight">{user?.email?.split('@')[0] || "Guest"}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{Number(user?.user_type) === 0 ? 'Admin Host' : 'External Identity'}</p>
            </div>
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-[#15aabf]/30 transition-all">
               <Image src={`https://ui-avatars.com/api/?name=${user?.email || 'G'}&background=15aabf&color=fff&bold=true`} alt="User" fill className="object-cover" />
            </div>
            <svg className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          {isProfileOpen && (
            <div className="absolute top-full mt-4 right-0 w-64 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-3 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
               <div className="p-4 border-b border-gray-50 mb-2">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Session Identity</p>
                  <p className="text-sm font-black text-gray-900 truncate">{user?.email || "anonymous@org.root"}</p>
               </div>
               
               <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 text-gray-600 transition-all group">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <span className="text-sm font-bold">Profile Settings</span>
               </button>

               <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-rose-50 text-rose-600 transition-all group"
               >
                  <div className="p-2 bg-rose-50 rounded-xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  </div>
                  <span className="text-sm font-bold">Sign Out</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
