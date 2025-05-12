import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    symbolUrl: '',
    aadhaarNumber: '',
    isVoter: false
  });
  const { electionId } = useParams();
  // console.log(electionId);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isVoter) {
      setMessage('❌ Please confirm voter status.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/addCandidate/${electionId}`, formData);
      if (response.status === 201) {
        setMessage('✅ Candidate registered successfully!');
        setFormData({ name: '', party: '', symbolUrl: '', aadhaarNumber: '', isVoter: false });
      }
    } catch (error) {
      setMessage('❌ Error registering candidate.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-8">
        <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">Register Candidate</h2>

          {message && (
            <div className={`text-center text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Candidate Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Aadhaar Number</label>
              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                required
                maxLength={12}
                pattern="\d{12}"
                title="Enter 12-digit Aadhaar number"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Party Name</label>
              <input
                type="text"
                name="party"
                value={formData.party}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Symbol Image URL</label>
              <input
                type="url"
                name="symbolUrl"
                value={formData.symbolUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.symbolUrl && (
                <img src={formData.symbolUrl} alt="Symbol Preview" className="mt-3 w-16 h-16 object-contain" />
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isVoter"
                id="isVoter"
                checked={formData.isVoter}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="isVoter" className="text-gray-700 text-sm">Already a registered voter?</label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCandidate;
