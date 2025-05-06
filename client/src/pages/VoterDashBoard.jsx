import React from 'react';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BugReportIcon from '@mui/icons-material/BugReport';
import BarChartIcon from '@mui/icons-material/BarChart';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const VoterDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6 flex flex-col items-center">
        <h1 className="text-4xl mt-12 font-bold text-blue-700 dark:text-white mb-10">Voter Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* View Candidates */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="flex flex-col items-center">
              <HowToVoteIcon className="text-blue-500 mb-4" style={{ fontSize: 60 }} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">View Candidates</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                Explore the list of all candidates before you vote.
              </p>
              <Link to="/voter/candidates">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                  Candidate List
                </button>
              </Link>
            </div>
          </div>

          {/* Voters List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="flex flex-col items-center">
              <ReceiptLongIcon className="text-pink-500 mb-4" style={{ fontSize: 60 }} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Voter List</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                View the list of all registered voters.
              </p>
              <Link to="/voter/voter-list">
                <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
                  Voter List
                </button>
              </Link>
            </div>
          </div>

          {/* View Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="flex flex-col items-center">
              <BarChartIcon className="text-green-500 mb-4" style={{ fontSize: 60 }} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">View Results</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                Check the latest election results after voting ends.
              </p>
              <Link to="/voter/results">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                  See Results
                </button>
              </Link>
            </div>
          </div>

          {/* Make a Complaint */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="flex flex-col items-center">
              <BugReportIcon className="text-red-500 mb-4" style={{ fontSize: 60 }} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Make a Complaint</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                Report any issues or complaints regarding the voting process.
              </p>
              <Link to="/voter/complaint">
                <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
                  Report Issue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoterDashboard;
