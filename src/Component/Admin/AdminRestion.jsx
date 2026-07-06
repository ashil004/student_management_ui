import React, { useState } from 'react';

export default function AdminRestion() {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { name, email, password } = adminData;
    if (!name || !email || !password) {
      setError('⚠️ Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...adminData }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setAdminData({ name: '', email: '', password: '' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Something went wrong!');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('❌ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">🛡️ Admin Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? 'Registering...' : 'Register Admin'}
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center text-sm">
          ✅ Admin registered successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-center text-sm">
          {error}
        </div>
      )}
    </div>
  );
}