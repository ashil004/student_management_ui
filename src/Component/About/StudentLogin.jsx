import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // ✅ Correct context usage

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login instead of setUser

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/login/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      if (data.role !== 'student') {
        throw new Error('Unauthorized: Not a student account');
      }

      // ✅ Use context login
      login({
        name: data.name || 'Student',
        email: data.email,
        role: data.role,
        token: data.token,
      });

      // ✅ Navigate to student home page
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">🎓 Student Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="student@example.com"
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
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
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
          <Link to="/registion" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
