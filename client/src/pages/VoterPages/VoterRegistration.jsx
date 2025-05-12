// src/pages/VoterRegistration.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {VoterDataContext} from '../../context/VoterContext';

// Function to calculate age
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  console.log(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
const VoterRegistration = () => {
  const navigate = useNavigate();
  const {voter,setVoter}=useContext(VoterDataContext);
  const [formData, setFormData] = useState({
    username: '',
    aadhaarNumber: '',
    dob: '',
    password:'',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(formData.dob);
    const updatedFormData = { ...formData, age }; // Make updated object
  
    setVoter(updatedFormData); // set in context
  
    // No console.log(voter) here because it's NOT updated yet.
  
    // Now navigate to scan face
    navigate('/voter/register/register-scan-face');
  };  
  useEffect(() => {
    console.log(voter);
    if (voter.username && voter.aadhaarNumber && voter.dob && voter.age) {
      navigate('/voter/register/register-scan-face');
    }
  }, [voter]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">Voter Registration</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please provide your details to register as a voter</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your full name"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Aadhar Number */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Enter your Aadhaar number"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/voter/login" className="font-semibold text-blue-600 hover:text-blue-800">
              Login Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoterRegistration;
