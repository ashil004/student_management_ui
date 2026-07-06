// src/Component/Teacher_panal/TeacherWelcome.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherWelcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('sir-notices'); // redirect to /teacher/official-notice
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 animate-pulse">
        👋 Welcome to the Teacher Panel!
      </h1>
      <p className="text-gray-600 text-lg">
        Redirecting to the notice board in <span className="font-semibold">5 seconds</span>...
      </p>
    </div>
  );
}
