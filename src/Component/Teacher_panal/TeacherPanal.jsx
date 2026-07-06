// src/Component/Teacher_panal/TeacherPanal.jsx

import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../Context/AuthContext'; // ✅ use context

export default function TeacherPanal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ grab user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/log-in'); // ✅ redirect to login after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-2xl font-bold text-blue-700">👨‍🏫 Teacher Panel</h1>
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Right: Nav Links + User Info */}
          <div className="flex items-center justify-end gap-4 w-full md:w-auto">
            <div className="hidden md:flex gap-4 text-gray-700">
              <Link to="/teacher" className="hover:text-blue-600 font-medium">Home</Link>
              <Link to="sir-notices" className="hover:text-blue-600 font-medium">Official Notice</Link>
            
            </div>

            {/* 👤 User info */}
            <div className="flex items-center gap-2">
              <UserCircleIcon className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-sm">{user?.name || 'Guest'}</span>
            </div>

            {/* Login/Logout Button */}
            {user ? (
              <button onClick={handleLogout} className="text-sm font-semibold text-red-500 hover:underline">
                Logout
              </button>
            ) : (
              <Link to="sir-login" className="text-sm font-semibold text-blue-600 hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold text-blue-600">Teacher Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-4 text-gray-700">
          <Link to="/teacher" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</Link>
          <Link to="sir-notices" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Official Notice</Link>
          <Link to="sir-login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Login</Link>
          {user ? (
            <button onClick={handleLogout} className="text-left text-red-500 hover:underline">Logout</button>
          ) : (
            <Link to="sir-login" onClick={() => setMenuOpen(false)} className="text-blue-600 hover:underline">Login</Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
