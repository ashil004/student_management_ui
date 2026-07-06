import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/login/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      if (data.role !== 'teacher') {
        throw new Error('Unauthorized: Not a teacher account');
      }

      // ✅ Update Auth Context
      login({
        name: data.name || 'Teacher',
        email: data.email,
        role: data.role,
        token: data.token,
      });

      // ✅ Redirect to teacher dashboard
      navigate('/teacher');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">👨‍🏫 Teacher Login</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="teacher@example.com"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-1 text-gray-600">
              <input type="checkbox" className="accent-blue-500" /> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/teacher/sir-registion" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
