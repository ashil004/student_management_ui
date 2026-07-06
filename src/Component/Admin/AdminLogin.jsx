import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // use login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/login/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      // Save token and user info in localStorage (optional but good for persistence)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);
      localStorage.setItem('name', data.name || 'Admin');

      // Update auth context state
      login({
        name: data.name || 'Admin',
        email: data.email,
        role: data.role,
        token: data.token,
      });

      // Navigate based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else if (data.role === 'teacher') {
        navigate('/teacher');
      } else if (data.role === 'student') {
        navigate('/home');
      } else {
        navigate('/unauthorized');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Forgot password?{' '}
          <Link to="/admin/restion" className="text-blue-600 hover:underline cursor-pointer">
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
}
