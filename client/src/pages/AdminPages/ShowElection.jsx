import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ShowElection = () => {
  const [elections, setElections] = useState([]);

  // Fetch the list of elections from the server
  const getElectionList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/electionlist`);
      setElections(response.data.elections);
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  // Handle the termination of an election
  const terminateElection = async (electionId) => {
    if (window.confirm('Are you sure you want to terminate this election?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/electionlist/${electionId}`);
        setElections((prevElections) => prevElections.filter((election) => election.electionId !== electionId));
        alert('Election terminated successfully.');
      } catch (error) {
        console.error('Error terminating election:', error);
        alert('Failed to terminate the election.');
      }
    }
  };

  // Handle stopping an ongoing election
  const stopElection = async (electionId) => {
    if (window.confirm('Are you sure you want to stop this election?')) {
      try {
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/admin/electionlist/${electionId}/stop`);
        setElections((prevElections) =>
          prevElections.map((election) =>
            election.electionId === electionId ? { ...election, status: 'completed' } : election
          )
        );
        alert('Election stopped successfully.');
      } catch (error) {
        console.error('Error stopping election:', error);
        alert('Failed to stop the election.');
      }
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
              className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-blue-700">{election.electionName}</h3>
                <p className="text-gray-700"><strong>ID:</strong> {election.electionId}</p>
                <p className="text-gray-600"><strong>Start:</strong> {new Date(election.startDate).toLocaleString()}</p>
                <p className="text-gray-600"><strong>End:</strong> {new Date(election.endDate).toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => terminateElection(election.electionId)}
                    className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-md px-3 py-1 transition"
                  >
                    Terminate
                  </button>
                  <button
                    onClick={() => stopElection(election.electionId)}
                    className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-md px-3 py-1 transition"
                  >
                    Stop
                  </button>
                </div>
              </div>
              <div className="flex items-center">
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
