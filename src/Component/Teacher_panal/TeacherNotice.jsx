import React, { useEffect, useState } from 'react';

export default function TeacherNotice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/official-notices');
        const data = await res.json();
        setNotices(data);
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-10 text-center tracking-wide">
        📢 Teacher Official Notices
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading notices...</p>
      ) : notices.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No official notices available.</p>
      ) : (
        <div className="space-y-8">
          {notices.map((notice) => (
            <article
              key={notice._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8"
            >
              <header className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {notice.title || 'Official Notice'}
                </h3>
                <time
                  dateTime={new Date(notice.date).toISOString()}
                  className="text-sm text-gray-400 font-mono"
                >
                  {new Date(notice.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </header>

              <p className="text-gray-700 leading-relaxed mb-5 whitespace-pre-line">{notice.content}</p>

              {notice.file?.url && notice.file.type.startsWith('image') && (
                <img
                  src={`http://localhost:5000${notice.file.url}`}
                  alt={notice.file.name}
                  className="rounded-lg max-h-64 w-full object-cover mb-5 border border-gray-200"
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

              <footer className="mt-6 text-sm text-gray-500 italic">
                Posted by: <span className="font-medium text-gray-700">Admin Office</span>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
