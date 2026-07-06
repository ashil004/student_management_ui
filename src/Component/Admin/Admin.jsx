import { useEffect, useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
  BriefcaseIcon,
  AcademicCapIcon, 
  PresentationChartBarIcon 
} from '@heroicons/react/24/outline';

import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Admin() {
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    if (token && role === 'admin') {
      setIsLoggedIn(true);
      setAdminEmail(email);
      setAdminName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setAdminEmail('');
    setAdminName('');
    navigate('/admin/log-in');
  };

  const menus = [
  { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" />, path: 'dashboard' },
  { name: 'Student Notice', icon: <UserGroupIcon className="h-6 w-6" />, path: 'students' },
  { name: 'Official Notice', icon: <BriefcaseIcon className="h-6 w-6" />, path: 'official' },
  { name: 'Student Panel', icon: <AcademicCapIcon className="h-6 w-6" />, path: 'student-post' },
  { name: 'Teacher Panel', icon: <PresentationChartBarIcon className="h-6 w-6" />, path: 'teacher-post' },
];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white p-5 pt-8 relative duration-300 flex flex-col justify-between ${open ? 'w-64' : 'w-20'}`}>
        
        {/* Top section */}
        <div>
          <button
            className="absolute -right-3 top-9 w-7 h-7 bg-white text-gray-900 rounded-full"
            onClick={() => setOpen(!open)}
          >
            {open ? '<' : '>'}
          </button>

          <h1 className={`text-2xl font-bold origin-left duration-300 ${!open && 'scale-0'}`}>
            Admin Panel
          </h1>

          <ul className="pt-8">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.path}
                  className="flex items-center gap-4 p-2 text-sm hover:bg-gray-700 rounded-md cursor-pointer mb-2"
                >
                  {menu.icon}
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom section */}
        <div className="mt-10">
          {isLoggedIn && open && (
            <div className="text-sm text-gray-300 mb-2 truncate px-2">
              Welcome,
              <div className="font-medium text-white">{adminName || adminEmail}</div>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 p-2 text-sm hover:bg-gray-700 rounded-md w-full"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
            </button>
          ) : (
            <Link
              to="log-in"
              className="flex items-center gap-4 p-2 text-sm hover:bg-gray-700 rounded-md w-full"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
