"use client";

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    const savedColor = localStorage.getItem('theme-primary-color');
    if (savedColor) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', savedColor);
      root.style.setProperty('--primary-light', `${savedColor}11`);
      root.style.setProperty('--primary-shadow', `${savedColor}33`);
    }
  }, []);

  return null;
}
