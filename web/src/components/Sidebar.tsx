"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  
  // Track open state for dropdowns
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync open state with current path on mount or change
  useEffect(() => {
    if (pathname === '/' || pathname === '/application') {
      setIsDashboardOpen(true);
    }
    if (pathname === '/settings') {
      setIsSettingsOpen(true);
    }
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  // Premium active style with subtle glow and contrast
  const activeStyle = {
    backgroundColor: 'white',
    color: '#15aabf',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
    fontWeight: '900',
    transform: 'scale(1.02)',
    textDecoration: 'none'
  };

  const navItemClass = (path: string) => 
    `flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 no-underline ${isActive(path) ? 'z-20 text-[#15aabf]' : 'text-white/60 hover:text-white hover:bg-white/10'}`;

  return (
    <aside 
      className="w-64 text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto border-r border-white/5 transition-colors duration-500 shadow-2xl z-50"
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      
      <div className="relative z-10 p-8 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-white/20 border border-white/20 shadow-lg shadow-black/10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2.5" 
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-tight leading-none uppercase">Approval</h1>
          <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">System Admin</span>
        </div>
      </div>

      <nav className="relative z-10 flex-1 mt-4 px-5 space-y-2 flex flex-col">
        
        {/* Dashboard Group */}
        <div>
          <button 
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 no-underline ${isDashboardOpen ? 'text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 8.71V21h-7V16c0-1.1-.9-2-2-2s-2 .9-2 2v5H3V8.71L11 3l8 5.71z"/></svg>
              <span className="font-semibold text-sm tracking-tight">Dashboards</span>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" height="14" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 opacity-50 ${isDashboardOpen ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {isDashboardOpen && (
            <div className="mt-1 ml-6 pl-4 border-l-2 border-white/20 space-y-1 animate-in slide-in-from-left-2 duration-300">
              <Link 
                href="/" 
                className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-all no-underline ${isActive('/') ? '' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                style={isActive('/') ? activeStyle : {}}
              >
                Analytics Overview
              </Link>
            </div>
          )}
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-white/10 mx-auto my-2 rounded-full opacity-50"></div>

        {/* Application Link */}
        <div className="pt-2">
          <Link 
            href="/application" 
            className={navItemClass('/application')}
            style={isActive('/application') ? activeStyle : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M3 15h12"/><path d="m9 9 6 6-6 6"/></svg>
            <span className="font-semibold text-sm tracking-tight">Application</span>
          </Link>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-white/10 mx-auto my-2 rounded-full opacity-50"></div>
        {/* Settings Group */}
        <div>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 no-underline ${isSettingsOpen ? 'text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.72l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="font-semibold text-sm tracking-tight text-white">Settings</span>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" height="14" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 opacity-50 ${isSettingsOpen ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {isSettingsOpen && (
            <div className="mt-1 ml-6 pl-4 border-l-2 border-white/20 space-y-1 animate-in slide-in-from-left-2 duration-300">
              <Link 
                href="/settings" 
                className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-all no-underline ${isActive('/settings') ? '' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                style={isActive('/settings') ? activeStyle : {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.35-.31 1.55-.56.19-.23.28-.56.19-1a4.99 4.99 0 0 1 4.56-6.69A2.01 2.01 0 0 0 22 11.77V12c0-5.5-4.5-10-10-10z"/></svg>
                Theme Customization
              </Link>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Link 
            href="/users" 
            className={navItemClass('/users')}
            style={isActive('/users') ? activeStyle : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="font-semibold text-sm tracking-tight">User Management</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 p-6 mt-auto">
        <div className="bg-white/10 rounded-[2rem] p-5 text-center border border-white/10 shadow-xl shadow-black/20 overflow-hidden group/card relative">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 16v-4"/><path d="M12 8h.01"/><circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <p className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1 relative z-10">Documentation</p>
          <p className="text-xs text-white/80 font-medium mb-4 leading-relaxed relative z-10 px-2">Knowledge base for the approval system tasks.</p>
          <button className="bg-white text-gray-900 text-[11px] font-black py-2.5 px-4 rounded-xl w-full transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg relative z-10">
            Support Center
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
