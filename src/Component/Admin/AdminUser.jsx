import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  const [noticeText, setNoticeText] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();  // <-- Added useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to post a notice');
      return;
    }

    const formData = new FormData();
    formData.append('notice', noticeText);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/student-notices', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setNoticeText('');
        setFile(null);
        setTimeout(() => setSuccess(false), 3000);

        // Navigate to /admin/student-post after successful submission
        navigate('/admin/student-post');
      } else {
        alert('❌ Failed to submit student notice');
      }
    } catch (error) {
      console.error('🚨 Error submitting student notice:', error);
      alert('❌ Error submitting student notice');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only JPG, PNG, PDF, DOC, or DOCX files are allowed.');
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Student Notice</h2>

      <form onSubmit={handleSubmit}>
        {/* Notice Text */}
        <div className="mb-4">
          <label htmlFor="noticeText" className="block text-gray-700 font-medium mb-2">
            Notice Message
          </label>
          <textarea
            id="noticeText"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Write your notice here..."
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            required
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
            Attach File (Image / PDF / DOC)
          </label>
          <input
            type="file"
            id="file"
            className="w-full border border-gray-300 p-2 rounded-md"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>

        {/* Image Preview */}
        {file && file.type.startsWith('image/') && (
          <div className="mb-4">
            <p className="text-gray-600 mb-2">📷 Image Preview:</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-h-48 rounded-md border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Notice
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          ✅ Notice sent successfully!
        </div>
      )}
    </div>
  );
}
