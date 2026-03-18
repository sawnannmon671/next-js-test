"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState('#007D9C');

  // Load from local storage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('app-primary-color');
    if (savedColor) {
      setPrimaryColor(savedColor);
    }
  }, []);

  const handleSetColor = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem('app-primary-color', color);
  };

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor: handleSetColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}
