import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/log-in');
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <div className={`md:text-2xl font-bold text-lg ${darkMode ? 'text-yellow-400' : 'text-blue-600'}`}>
            📢 Digital Notice Board
          </div>

          {/* Right: Links and Avatar */}
          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Link to="/home" className="hover:text-blue-500 font-medium">Home</Link>
              <Link to="/teacher/sir-notices" className="hover:text-blue-500 font-medium">Official Notices</Link>

              {!user ? (
                <Link to="/log-in" className="hover:text-blue-500 font-medium">Login</Link>
              ) : (
                <>
                  <span className="font-semibold">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`px-2 py-1 rounded text-sm font-semibold flex items-center gap-2 ${darkMode ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'}`}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(true)} className="sm:hidden">
              <Bars3Icon className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'} shadow-lg transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className={`${darkMode ? 'text-yellow-400' : 'text-blue-600'} text-sm font-bold`}>
            📢 Digital Notice Board
          </div>
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-4">
          <Link to="/home" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">Home</Link>
          <Link to="/teacher/sir-notices" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">Official Notices</Link>

          {!user ? (
            <Link to="/log-in" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">Login</Link>
          ) : (
            <>
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
