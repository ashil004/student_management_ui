// src/Component/Student/StudentWelcome.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentWelcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // redirect to /student/notice
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4 animate-pulse">
        🎓 Welcome, Dear Student!
      </h1>
      <p className="text-gray-600 text-lg">
        You will be redirected to your notice board in{' '}
        <span className="font-semibold">5 seconds</span>...
      </p>
    </div>
  );
}
