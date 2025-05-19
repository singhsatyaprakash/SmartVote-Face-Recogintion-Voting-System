// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // On mount, check if user is signed in
  useEffect(() => {
    const id = localStorage.getItem('adminId') || localStorage.getItem('voterId');
    setUserId(id);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Get Started', path: '/user-type' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Result', path: '/result' },
  ];

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

        {/* Profile icon shown only when signed in */}
        {userId && (
          <Link to="/profile" className="ml-4">
            <Avatar
              alt="Profile"
              sx={{ width: 32, height: 32, bgcolor: 'white', color: 'blue' }}
            >
              {/* You could put initials here or a <AccountCircleIcon /> */}
              U
            </Avatar>
          </Link>
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

          {/* Mobile profile link */}
          {userId && (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-xl hover:text-gray-200 transition-colors"
            >
              <Avatar
                alt="Profile"
                sx={{ width: 28, height: 28, bgcolor: 'white', color: 'blue' }}
              >
                U
              </Avatar>
              <span>Profile</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
