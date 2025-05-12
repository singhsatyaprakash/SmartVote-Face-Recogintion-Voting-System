import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BallotIcon from '@mui/icons-material/Ballot';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const CreateElection = () => {
  const [formData, setFormData] = useState({
    electionName: '',
    electionId: '',
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/create-election`, formData);
      console.log(response);
      if (response.status === 201) {
        alert('Election created successfully');
        navigate('/admin/dashboard')
        setFormData({ electionName: '', electionId: '' });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create election');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl hover:shadow-blue-300 dark:hover:shadow-blue-800 transition-shadow duration-300">
          <div className="flex flex-col items-center mb-6">
            <BallotIcon className="text-blue-600 dark:text-blue-400 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Election</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
              Please provide the name and unique ID to create your election.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Election Name</label>
              <input
                type="text"
                name="electionName"
                value={formData.electionName}
                onChange={handleChange}
                placeholder="Enter Election Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Election ID</label>
              <input
                type="text"
                name="electionId"
                value={formData.electionId}
                onChange={handleChange}
                placeholder="Enter Unique Election ID"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Create Election
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateElection;
