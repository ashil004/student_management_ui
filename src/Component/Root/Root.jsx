// Root.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';


export default function Root() {
  const [darkMode, setDarkMode] = useState(false);

  // On first load, check localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem('darkMode', mode);
  };

  return (
     <div className={darkMode ? 'bg-black text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <main className="p-4">
      <Outlet />
    </main>
  </div>
  );
}
