// src/context/ThemeContext.js
"use client";
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme] = useState({
    background: '#FFF9E5',
    text: '#000000',
    yellow: '#FFC107',
    pink: '#FF69B4',
    teal: '#26C6DA'
  });

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