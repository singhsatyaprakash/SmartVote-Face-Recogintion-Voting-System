import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ShowElection = () => {
  const [elections, setElections] = useState([]);

  const getElectionList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/electionlist`);
      setElections(response.data.elections);
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  useEffect(() => {
    getElectionList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🗳️ All Elections</h2>

        {elections.length > 0 ? (
          elections.map((election) => (
            <div
              key={election._id}
              className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-700">{election.electionName}</h3>
                <p className="text-gray-700 mt-1"><strong>ID:</strong> {election.electionId}</p>
                <p className="text-gray-600 mt-1"><strong>Start:</strong> {new Date(election.startDate).toLocaleString()}</p>
                <p className="text-gray-600"><strong>End:</strong> {new Date(election.endDate).toLocaleString()}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span
                  className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
                    election.status === 'ongoing'
                      ? 'bg-green-500'
                      : election.status === 'upcoming'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {election.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No elections found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowElection;
