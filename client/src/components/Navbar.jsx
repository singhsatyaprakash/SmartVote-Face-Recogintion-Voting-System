// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            {name}
          </Link>
        ))}
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
