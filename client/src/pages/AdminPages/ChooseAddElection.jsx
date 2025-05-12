import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const ChooseAddElection = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  const getElectionList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/electionlist`);
      if (response.status === 200) {
        setElections(response.data.elections);
      }
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  useEffect(() => {
    getElectionList();
  }, []);

  const handleSelect = (electionId) => {
    navigate(`/admin/addcandidate/${electionId}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Election List</h2>

        {elections.length === 0 ? (
          <p className="text-center text-gray-500">No elections found.</p>
        ) : (
          elections.map((election) => (
            <div key={election._id} className="bg-white shadow-md rounded-xl p-6 mb-4 border border-gray-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{election.electionName}</h3>
              <p className="text-sm text-gray-600"><span className="font-medium">ID:</span> {election.electionId}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Status:</span> {election.status}</p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Start:</span> {election.startDate ? new Date(election.startDate).toLocaleString() : 'Not started'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">End:</span> {election.endDate ? new Date(election.endDate).toLocaleString() : 'Not ended'}
              </p>
              <button
                onClick={() => handleSelect(election._id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add Candidate
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ChooseAddElection;
