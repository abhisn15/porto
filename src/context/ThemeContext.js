// src/context/ThemeContext.js
"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false;

  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme) return savedTheme === 'dark';

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Listen for system preference changes only when no stored preference exists.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = event => {
      const savedTheme = window.localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDarkMode(event.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Save theme preference and update body class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleDarkMode,
    colors: {
      // Dynamic colors based on mode
      background: isDarkMode ? '#0a0a0a' : '#ffffff',
      text: isDarkMode ? '#ededed' : '#1D2028',
      textSecondary: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
      // Brand colors (consistent)
      yellow: '#FFC107',
      pink: '#FF69B4',
      teal: '#26C6DA',
      cyan: '#99F4FF',
      blue: '#4F91C9'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be digunakan di dalam ThemeProvider');
  }
  return context;
};