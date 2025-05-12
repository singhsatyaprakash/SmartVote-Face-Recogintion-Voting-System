import React, { useState } from 'react';
import FaceScanner from '../../components/FaceScanner';
import { VoterContext } from '../../context/VoterContext';
import VerifyFaceScanner from '../../components/VerifyFaceScanner';
import { useParams } from 'react-router-dom';

const ScanVerificationFace = () => {
  const [showModal, setShowModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isFaceMatched, setIsFaceMatched]=useState(true);
  const electionId=useParams();
  //console.log(electionId);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Face Scan Verification</h1>
        {verifying === true ? (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please wait while we verify your face. This may take a few seconds.
            </p>
            {!isFaceMatched &&( 
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Not Recongnised. Retry?
              </button>
            )}

          </>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We will now scan your face to verify that you are a real human and not a bot.As well as to verify your identity.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Ready to Scan?
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-2xl text-center relative">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Face Scan Page</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Camera access will be requested for scanning.</p>
            
            {/* Verify FaceScanner Component */}
            
            <VerifyFaceScanner setShowModal={setShowModal} setVerifying={setVerifying} setIsFaceMatched={setIsFaceMatched} electionId={electionId}/> 

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

export default ScanVerificationFace;
