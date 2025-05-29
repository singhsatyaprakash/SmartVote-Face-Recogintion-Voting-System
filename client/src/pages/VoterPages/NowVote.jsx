import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const NowVote = () => {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [voted, setVoted] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        //get candidate of that particular election...
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/voter/getcandidate/${id}`);
       // console.log(response);
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [id]);

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const confirmVote = async () => {
    try {
      let response=await axios.post(`${import.meta.env.VITE_BASE_URL}/voter/store-vote`, {
        voterId: localStorage.getItem('voterId'),
        candidateId: selectedCandidate._id,
        electionId:id,
      });
      console.log(response);
      if(response.status===200){
        setShowModal(false);
        setVoted(true);
        //redirect to give voter dashboard
        navigate('/voter/dashboard');
      }
    } catch (error) {
      alert("Voter had been already voted.You are not allowed to vote for election.");
      navigate('/voter/dashboard');
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cast Your Vote</h1>

      {!voted ? (
        <div className="space-y-4 max-w-3xl mx-auto">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={candidate.symbolUrl}
                  alt="symbol"
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <p className="text-gray-600">{candidate.party}</p>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleVoteClick(candidate)}
              >
                Vote Here<PanToolAltIcon></PanToolAltIcon>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto mt-10">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
          <p>Your vote has been successfully recorded.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Your Vote</h2>
            <p className="mb-4">
              Are you sure you want to vote for{' '}
              <strong>{selectedCandidate.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={confirmVote}
              >
                Yes, Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NowVote;
