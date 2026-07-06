import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherRestion() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !department) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          department
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess(true);
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setDepartment('');

      setTimeout(() => {
        setSuccess(false);
        navigate('/teacher/sir-login');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">👨‍🏫 Teacher Registration</h2>

        {error && <p className="text-red-600 bg-red-100 p-2 mb-4 rounded text-sm">{error}</p>}
        {success && <p className="text-green-600 bg-green-100 p-2 mb-4 rounded text-sm">✅ Teacher registered successfully!</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@example.com"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Department */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              required
            >
              <option value="">-- Select Department --</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="BBA">BBA</option>
              <option value="ENG">English</option>
              <option value="LAW">Law</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
