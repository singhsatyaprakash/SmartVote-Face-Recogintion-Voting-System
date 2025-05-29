import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';

const ElectionHappening = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { electionId } = useParams();

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getCandidate/${electionId}`);
      if (response.status === 200) {
        setCandidates(response.data.candidates);
        setLoading(false);
      } else {
        setLoading(true);
        alert('Data is not available. Please wait or retry.');
      }
    } catch (err) {
      console.error('Error fetching candidates:', err);
      alert('Failed to fetch candidates.');
    }
  };

  const handleResetVotes = async () => {
    if (candidates.length === 0) return;

    try {
      const confirmReset = window.confirm('Do you want to reset vote count?');
      if (!confirmReset) return;
      // console.log(electionId);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/reset-votes`, { electionId });
      if (response.status === 200) {
        alert('Votes have been reset successfully.');
        fetchCandidates();
      } else {
        alert('Failed to reset votes.');
      }
    } catch (err) {
      console.error('Error resetting votes:', err);
      alert('Failed to reset votes.');
    }
  };

  const startElection = async () => {
    if (candidates.length === 0) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/start-election`, { electionId });
      if (response.status === 200) {
        alert("Election has been started! Voters can now vote.");
      } else {
        alert("Failed to start the election.");
      }
    } catch (err) {
      console.error('Error starting election:', err);
      alert("Failed to start the election.");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading)
    return (
      <>
        <Navbar/>
        <div className="text-xl pt-24 text-center text-red-700">Loading candidates...</div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 mt-16 text-center">Election Candidates</h2>

        {candidates.length === 0 ? (
          <div className="text-center text-red-600 font-semibold mt-4">
            No candidates are registered for this election.
          </div>
        ) : (
          candidates.map(candidate => (
            <div key={candidate._id} className="border rounded-xl shadow p-4 mb-4 flex flex-col items-center">
              <img src={candidate.symbolUrl} alt="symbol" className="w-16 h-16 mb-2" />
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.party}</p>
            </div>
          ))
        )}

        <button
          onClick={handleResetVotes}
          disabled={candidates.length === 0}
          className={`w-full text-white py-2 rounded transition mt-4 ${
            candidates.length === 0
              ? 'bg-red-500 opacity-50 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Reset All Votes to Zero
        </button>

        <button
          onClick={startElection}
          disabled={candidates.length === 0}
          className={`w-full text-white py-2 rounded transition mt-4 ${
            candidates.length === 0
              ? 'bg-green-500 opacity-50 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Start Election
        </button>
      </div>
    </>
  );
};

export default ElectionHappening;
