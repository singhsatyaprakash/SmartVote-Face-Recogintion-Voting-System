// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import axios from 'axios';

const Profile = () => {
  const [userId, setUserId] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  const getProfile = async (admin, id) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/${admin ? 'admin' : 'voter'}/profile/${id}`;
      let response = await axios.get(url);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate('/'); // Redirect to home page
  };

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    const voterId = localStorage.getItem('voterId');

    if (adminId) {
      setUserId(adminId);
      setAdmin(true);
      getProfile(true, adminId);
    } else if (voterId) {
      setUserId(voterId);
      setAdmin(false);
      getProfile(false, voterId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-100">
        <div className="flex justify-between items-center w-full max-w-2xl mb-4">
          <h1 className="text-3xl font-bold text-blue-600">Profile</h1>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-4 py-2"
          >
            Logout
          </Button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="flex flex-col items-center mb-4">
            <AccountCircleIcon className="text-blue-500" style={{ fontSize: '100px' }} />
            {isAdmin ? (
              <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold text-gray-700">Admin Profile</h2>
                <p className="text-lg text-gray-600"><strong>User ID:</strong> {profileData?.admin?.userID || 'N/A'}</p>
                <p className="text-lg text-gray-600"><strong>Username:</strong> {profileData?.admin?.username || 'N/A'}</p>
                <p className="text-lg text-gray-600"><strong>Email:</strong> {profileData?.admin?.email || 'N/A'}</p>
              </div>
            ) : (
              <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold text-gray-700">Voter Profile</h2>
                <p className="text-lg text-gray-600"><strong>Username:</strong> {profileData?.voter?.username || 'N/A'}</p>
                <p className="text-lg text-gray-600"><strong>Aadhaar Number:</strong> {profileData?.voter?.aadhaarNumber || 'N/A'}</p>
                <p className="text-lg text-gray-600"><strong>Date of Birth:</strong> {profileData?.voter?.dob || 'N/A'}</p>
                <p className="text-lg text-gray-600"><strong>Age:</strong> {profileData?.voter?.age || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
