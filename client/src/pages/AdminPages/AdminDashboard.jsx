import React from 'react';
import BallotIcon from '@mui/icons-material/Ballot';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BugReportIcon from '@mui/icons-material/BugReport';
import PreviewIcon from '@mui/icons-material/Preview';

import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl mt-12 font-bold text-blue-700 dark:text-white mb-10">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Create Election*/}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <BallotIcon className="text-lime-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Create Election</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Create a specific election to cast voting by this election. <br></br><b>(Right to vote)</b>
            </p>
            <Link to='/admin/create-election'>
              <button className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600 transition">
                Create Election
              </button>
            </Link>
          </div>
        </div>
        {/* Show Election*/}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <PreviewIcon className="text-pink-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Show Election</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              List of connection which will happens next.<b><br></br>(Terminate/ Stop /View)</b>
            </p>
            <Link to='/admin/show-election'>
              <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
                Show Election
              </button>
            </Link>
          </div>
        </div>

        {/* Start Election */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <HowToVoteIcon className="text-yellow-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Start Election</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Launch the election process to allow eligible voters to cast their votes.
            </p>
            <Link to='/admin/choose-start-election'>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                Start Election
              </button>
            </Link>
          </div>
        </div>

        {/* Add Candidate */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <PlaylistAddIcon className="text-blue-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Add Candidate</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Register new candidates for the upcoming election cycle with complete details and photo.
            </p>
            <Link to='/admin/choose-add-election'>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                Add Candidate
              </button>
            </Link>
          </div>
        </div>



    {/* Candidate List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <EmojiPeopleIcon className="text-purple-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Candidates List</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              View and manage the list of registered candidates for the election.<br></br><b>(Update/Remove/Delete)</b>
            </p>
            <Link to='/admin/candidate-list'>
              <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition">
                Candidate List
              </button>
            </Link>
          </div>
        </div>
        
        {/* Voter List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <ReceiptLongIcon className="text-pink-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Voters List</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              View and manage the list of registered voters for the election.
            </p>
            <Link to='/admin/voter-list'>
              <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
                Voter List
              </button>
            </Link>
          </div>
        </div>
    

        {/* Declare Results */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <EmojiEventsIcon className="text-green-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Declare Results</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Publish the results securely once voting is complete and validated.
            </p>
            <Link to='/admin/result'>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                Declare Results
              </button>
            </Link>
          </div>
        </div>

        {/* Manage Complaints
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <BugReportIcon className="text-red-500 mb-4" style={{ fontSize: 60 }} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Manage Complaints</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Review and address complaints or issues raised by voters during the election process.
            </p>
            <Link to='/admin/manage-complaints'>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
                Manage Complaints
              </button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
