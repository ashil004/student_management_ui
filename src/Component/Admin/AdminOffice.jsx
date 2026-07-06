import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminOffice() {
  const [notice, setNotice] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to submit a notice');
      return;
    }

    const formData = new FormData();
    formData.append('notice', notice);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/official-notices', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setNotice('');
        setFile(null);
        // Navigate after 1 second (or instantly if you want)
        setTimeout(() => {
          setSuccess(false);
          navigate('/admin/teacher-post');
        }, 1000);
      } else {
        alert('Failed to submit notice');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error submitting notice');
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(uploadedFile.type)) {
        alert('Only JPG, PNG, PDF, DOC, or DOCX files are allowed.');
        return;
      }

      setFile(uploadedFile);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Official Notice</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Notice Message</label>
          <textarea
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your official notice here..."
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Attach File (optional)</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {file && file.type.startsWith('image') && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-h-48 rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Notice
        </button>
      </form>

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          ✅ Official notice submitted successfully!
        </div>
      )}
    </div>
  );
}
