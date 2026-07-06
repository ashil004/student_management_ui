import React, { useEffect, useState } from 'react';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/student-notices');
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch student notices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl text-center font-semibold text-gray-700 mb-6">Latest Student Notices</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-center text-gray-500">No student notices available.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice._id} className="bg-white shadow-md rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Student Notice</h2>
                <span className="text-sm text-gray-500">
                  {new Date(notice.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <p className="text-gray-800 mb-4 whitespace-pre-line">{notice.content}</p>

              {notice.file?.url && notice.file.type.startsWith('image') && (
                <img
                  src={`http://localhost:5000${notice.file.url}`}
                  alt={notice.file.name}
                  className="rounded-lg w-full max-h-[400px] object-cover mb-4"
                />
              )}

              {notice.file?.url && !notice.file.type.startsWith('image') && (
                <a
                  href={`http://localhost:5000${notice.file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 underline text-sm font-medium hover:text-blue-800"
                >
                  📎 Download Attachment: {notice.file.name}
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
