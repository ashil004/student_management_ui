import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminWelcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('dashboard'); // redirect to /admin/dashboard
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup if component unmounts early
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">Welcome to the Admin Panel!</h1>
      <p className="text-gray-600 text-lg">
        You will be redirected to the dashboard in <span className="font-semibold">5 seconds</span>...
      </p>
    </div>
  );
}
