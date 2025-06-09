// src/components/Navbar.js
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('adminId') || localStorage.getItem('voterId');
    setUserId(id);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);
    setShowProfilePopup(false);
    navigate('/');
  };

  const handleProfile = () => {
    setShowProfilePopup(false);
    navigate(`/profile`);
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(prev => !prev);
  };

  const navLinks = useMemo(() => {
    const voterId = localStorage.getItem('voterId');
    const dashboardPath = voterId ? '/voter/dashboard' : '/admin/dashboard';

    return [
      { name: 'Home', path: '/' },
      { name: 'Dashboard', path: dashboardPath },
      { name: 'Get Started', path: '/user-type' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Result', path: '/result' },
    ];
  }, [userId]);

  return (
    <nav className="w-full px-6 py-4 bg-blue-600 fixed z-50 shadow-md flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold tracking-wide">
        FaceVote
      </Link>

      {/* Desktop Links + Profile */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            {name}
          </Link>
        ))}

        {userId && (
          <div className="relative ml-4">
            <div
              onClick={toggleProfilePopup}
              className="cursor-pointer text-white flex items-center space-x-1"
            >
              <AccountCircleIcon sx={{ fontSize: 36 }} />
            </div>
            {showProfilePopup && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={toggleProfilePopup}
                  aria-label="Close profile popup"
                >
                  <CloseIcon fontSize="small" />
                </button>
                <button
                  className="px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left"
                  onClick={handleProfile}
                >
                  Profile
                </button>
                <button
                  className="px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-white flex flex-col items-center space-y-4 py-6 shadow-lg md:hidden">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className="text-xl hover:text-gray-200 transition-colors"
            >
              {name}
            </Link>
          ))}

          {userId && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-xl hover:text-gray-200 transition-colors focus:outline-none"
                onClick={toggleProfilePopup}
              >
                <AccountCircleIcon sx={{ fontSize: 36 }} />
                <span>Profile</span>
              </button>
              {showProfilePopup && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
                    onClick={toggleProfilePopup}
                    aria-label="Close profile popup"
                  >
                    <CloseIcon fontSize="small" />
                  </button>
                  <button
                    className="px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left"
                    onClick={handleProfile}
                  >
                    Profile
                  </button>
                  <button
                    className="px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
