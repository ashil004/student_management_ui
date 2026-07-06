import React, { useEffect, useState } from 'react';

export default function TeacherPost() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');

  const fetchTeacherNotices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/official-notices');
      const data = await res.json();
      setNotices(data);
      setFilteredNotices(data);
    } catch (error) {
      console.error('Error fetching teacher notices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherNotices();
  }, []);

  // Search filter effect
  useEffect(() => {
    if (!searchTerm) {
      setFilteredNotices(notices);
    } else {
      const filtered = notices.filter((notice) =>
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(filtered);
    }
  }, [searchTerm, notices]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/official-notices/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setNotices((prev) => prev.filter((n) => n._id !== id));
        setFilteredNotices((prev) => prev.filter((n) => n._id !== id));
      } else {
        const errorText = await res.text();
        console.error('Delete failed:', errorText);
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/official-notices/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notice: editText }),
      });

      if (res.ok) {
        fetchTeacherNotices();
        setShowModal(false);
      } else {
        const errorText = await res.text();
        console.error('Update failed:', errorText);
      }
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  const openEditModal = (id, content) => {
    setEditId(id);
    setEditText(content);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Teacher Posts (Admin View)
      </h1>

      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filteredNotices.length === 0 ? (
        <p className="text-center text-gray-500">No teacher posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Table for medium+ screens */}
          <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow hidden sm:table">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                <th className="border px-4 py-2 text-left font-semibold text-gray-700">Content</th>
                <th className="border px-4 py-2 text-left font-semibold text-gray-700">Attachment</th>
                <th className="border px-4 py-2 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice) => (
                <tr key={notice._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 align-top whitespace-nowrap">
                    {new Date(notice.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 whitespace-pre-line max-w-xl">{notice.content}</td>
                  <td className="border px-4 py-2 align-top">
                    {notice.file?.url ? (
                      notice.file.type.startsWith('image') ? (
                        <img
                          src={`http://localhost:5000${notice.file.url}`}
                          alt={notice.file.name}
                          className="max-h-20 rounded-md"
                        />
                      ) : (
                        <a
                          href={`http://localhost:5000${notice.file.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          📎 {notice.file.name}
                        </a>
                      )
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(notice._id, notice.content)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cards for small screens */}
          <div className="space-y-6 sm:hidden">
            {filteredNotices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
              >
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Date: </span>
                  <span>{new Date(notice.date).toLocaleDateString()}</span>
                </div>
                <div className="mb-2 whitespace-pre-line">
                  <span className="font-semibold text-gray-700">Content: </span>
                  <p>{notice.content}</p>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Attachment: </span>
                  {notice.file?.url ? (
                    notice.file.type.startsWith('image') ? (
                      <img
                        src={`http://localhost:5000${notice.file.url}`}
                        alt={notice.file.name}
                        className="max-h-32 rounded-md mt-1"
                      />
                    ) : (
                      <a
                        href={`http://localhost:5000${notice.file.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        📎 {notice.file.name}
                      </a>
                    )
                  ) : (
                    '—'
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => openEditModal(notice._id, notice.content)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Notice</h2>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
