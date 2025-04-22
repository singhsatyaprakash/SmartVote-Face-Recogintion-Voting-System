// src/pages/UserTypeSelection.js
import React from 'react';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserTypeSelection = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='User flex flex-col md:flex-row justify-center items-center p-6 md:p-16 w-screen min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500'>
      
      <Link to='/login/admin' className='w-full md:w-1/2 max-w-md m-4'>
        <div className="border border-gray-300 dark:border-gray-700 rounded-[40px] bg-[#8484e7] text-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center animate-fade-in">
          <div className="admin-logo mb-4">
            <AdminPanelSettingsIcon style={{ fontSize: 120 }} />
          </div>
          <div className="admin-about text-center">
            <h1 className='text-3xl font-bold mb-2'>Admin</h1>
            <h2 className='text-xl font-semibold mb-4'>Admin Access Management</h2>
            <p className='text-sm'>
              Admin users have the ability to manage, modify, and control content on the platform.
              With secure authentication and role-based authorization, we ensure that sensitive
              admin functions are restricted to trusted individuals, providing full control while
              maintaining system integrity and security.
            </p>
          </div>
        </div>
      </Link>

      <Link to='/login/voter' className='w-full md:w-1/2 max-w-md m-4'>
        <div className="border border-gray-300 dark:border-gray-700 rounded-[40px] bg-[#8484e7] text-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center animate-fade-in">
          <div className="voter-logo mb-4">
            <SupervisorAccountIcon style={{ fontSize: 120 }} />
          </div>
          <div className="voter-about text-center">
            <h1 className='text-3xl font-bold mb-2'>Voter</h1>
            <h2 className='text-xl font-semibold mb-4'>Voting Access Management</h2>
            <p className='text-sm'>
              Each voter is verified to ensure that their identity is accurate and their vote
              remains confidential. By leveraging advanced access control mechanisms, we eliminate
              the possibility of voter impersonation and ensure that every eligible voter can cast
              their vote seamlessly, contributing to a fair and trusted election.
            </p>
          </div>
        </div>
      </Link>
    </div>
    <Footer></Footer>
    </>
  );
};

export default UserTypeSelection;
