import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalStudents: 0, totalNotices: 0, pendingApprovals: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h2>
      <p className="text-gray-600 text-base mb-6">
        Welcome to the admin dashboard. Monitor activities, publish notices, and manage users here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h4 className="text-lg font-semibold text-blue-900">Total Students</h4>
          <p className="text-3xl font-bold mt-2 text-blue-800">{stats.totalStudents}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h4 className="text-lg font-semibold text-green-900">Notices Published</h4>
          <p className="text-3xl font-bold mt-2 text-green-800">{stats.totalNotices}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h4 className="text-lg font-semibold text-yellow-900">Pending Approvals</h4>
          <p className="text-3xl font-bold mt-2 text-yellow-800">{stats.pendingApprovals}</p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        This layout adjusts automatically on mobile, tablet, and desktop screens.
      </div>
    </div>
  );
}
