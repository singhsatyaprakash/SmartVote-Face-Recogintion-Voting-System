import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ShowCandidate = () => {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);

  const getCandidateList = async () => {
    try {
      //console.log("Request sent");
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/voter/getcandidate/${id}`);
      //console.log(response);
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    getCandidateList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Candidate List</h2>

        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-xl"
            >
              <img
                src={candidate.symbolUrl}
                alt="Candidate Symbol"
                className="w-24 h-24 object-contain border border-gray-200 rounded-lg"
              />
              <div className="text-center sm:text-left">
                <p className="text-xl font-semibold text-gray-900"> Name: {candidate.name}</p>
                <p className="text-md text-gray-700 mt-1"> Election ID: <span className="font-mono text-blue-600">{candidate.electionId.electionId}</span></p>
                <p className="text-md text-gray-700 mt-1"> Party: <span className="font-medium">{candidate.party}</span></p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No candidates found for this election.</p>
        )}
      </div>
    </div>
  );
};

export default ShowCandidate;
