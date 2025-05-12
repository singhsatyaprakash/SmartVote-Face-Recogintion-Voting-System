import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ElectionOngoingList = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  const fetchOngoingElections = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/voter/ongoingElection`);
      //console.log(response);
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching ongoing elections:', error);
    }
  };

  useEffect(() => {
    fetchOngoingElections();
  }, []);

  const handleVoteClick = (electionId) => {
    //console.log('ready to vote now scan for election id:');
   // console.log(electionId);
    navigate(`/voter/voting-face-verification/${electionId}`);
    // navigate(`/voter/show-candidate/${electionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
           Ongoing Elections
        </h2>

        {elections.length > 0 ? (
          elections.map((election) => (
            <div
              key={election._id}
              className="bg-white rounded-2xl shadow-md p-6 mb-6 transition hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">{election.electionName}</h3>
              <p className="text-red-700">{election.electionId}</p>
              <p className="text-gray-700">
                <span className="font-medium">Start:</span>{' '}
                {new Date(election.startDate).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">End:</span>{' '}
                {new Date(election.endDate).toLocaleString()}
              </p>
              <button
                onClick={() => handleVoteClick(election._id)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Choose Election To Vote
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No ongoing elections right now.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionOngoingList;
