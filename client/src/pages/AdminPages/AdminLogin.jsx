// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminLogin = () => {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    // handle login logic
    const Data={ userID, email, password };
    try{
      let response=await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`,Data);
      console.log(response);
      if(response.status===200){
        const token=response.data.token;
        localStorage.setItem('token',token);
        localStorage.setItem('adminId',response.data.admin._id);
        navigate('/admin/dashboard');
      }
      else{
        console.log("not verfied");
      }
    }catch(err){
        alert(err.response.data.message);
    }
  };

  return (
    <>    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <AdminPanelSettingsIcon fontSize="large" className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Admin Login</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Secure access for administrators</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* User ID Field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Admin ID"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password Field */}
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
          {/* <Link to='/admin/dashboard'> */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Login
            </button>
          {/* </Link> */}
        </form>
      </div>
    <Link to='/user-type' className='underline text-white m-8 text-xl'>Back</Link>
    </div>
    </>
  );
};

export default AdminLogin;
