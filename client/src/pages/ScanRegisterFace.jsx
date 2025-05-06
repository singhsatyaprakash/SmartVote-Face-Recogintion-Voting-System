import React, { useState } from 'react';
import FaceScanner from '../components/FaceScanner';
import { VoterContext } from '../context/VoterContext';

const ScanRegisterFace = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Face Scan Verification</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We will now scan your face to store it securely in our database and verify that you are a real human and not a bot.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Ready to Scan?
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-2xl text-center relative">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Face Scan Page</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Camera access will be requested for scanning.</p>
            
            {/* FaceScanner Component */}
            
            <FaceScanner />

            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanRegisterFace;
