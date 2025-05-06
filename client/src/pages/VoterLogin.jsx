// src/pages/VoterLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Link, useNavigate } from 'react-router-dom';

const VoterLogin = () => {
  const navigate=useNavigate();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const voterData={aadhaarNumber,dob,password};
    console.log(voterData);
    let response=await axios.post(`${import.meta.env.VITE_BASE_URL}/voter/login`,voterData);
    if(response.status===200){
      navigate('/voter/dashboard');
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <SupervisorAccountIcon fontSize="large" className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Voter Login</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Secure your vote with authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Aadhaar Number */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Aadhaar Number</label>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Aadhar number"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Not a Voter?{' '}
            <Link to="/voter/register" className="font-semibold text-blue-600 hover:text-blue-800">
              Register Yourself
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoterLogin;
