// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 dark:bg-gray-800 text-white py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-lg font-semibold">
          © {new Date().getFullYear()} FaceVote. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
