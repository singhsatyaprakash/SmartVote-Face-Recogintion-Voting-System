import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { X, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminCandidateList = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedElectionId, setSelectedElectionId] = useState(null);
  const [selectedElectionName, setSelectedElectionName] = useState('');
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

  const fetchCandidates = async (electionId) => {
    setSelectedElectionId(electionId);
    const election = elections.find((e) => e._id === electionId);
    setSelectedElectionName(election?.electionName || '');

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getCandidate/${electionId}`);
      if (response.status === 200) {
        setCandidates(response.data.candidates);
      } else {
        alert('Data is not available. Please wait or retry.');
      }
    } catch (err) {
      console.error('Error fetching candidates:', err);
      alert('Failed to fetch candidates.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (candidateId) => {
    navigate(`/admin/edit-candidate/${candidateId}`);
  };

  const handleDelete = async (candidateId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteCandidate/${candidateId}`);
      if (response.status === 200) {
        alert("Candidate deleted successfully.");
        fetchCandidates(selectedElectionId);
      } else {
        alert("Failed to delete candidate.");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Error deleting candidate.");
    }
  };

  const handleBackToElections = () => {
    setSelectedElectionId(null);
    setSelectedElectionName('');
    setCandidates([]);
  };

  useEffect(() => {
    getElectionList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto pt-28 px-4 pb-8">
        {!selectedElectionId ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">Election List</h2>
            {elections.length === 0 ? (
              <p className="text-center text-gray-500">No elections found.</p>
            ) : (
              elections.map((election) => (
                <div key={election._id} className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{election.electionName}</h3>
                  <p className="text-sm text-gray-600"><strong>ID:</strong> {election.electionId}</p>
                  <p className="text-sm text-gray-600"><strong>Status:</strong> {election.status}</p>
                  <p className="text-sm text-gray-600"><strong>Start:</strong> {election.startDate ? new Date(election.startDate).toLocaleString() : 'Not started'}</p>
                  <p className="text-sm text-gray-600"><strong>End:</strong> {election.endDate ? new Date(election.endDate).toLocaleString() : 'Not ended'}</p>

                  <button
                    onClick={() => fetchCandidates(election._id)}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Show Candidates
                  </button>
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Candidate List</h3>
                <p className="text-gray-600 text-sm">Election: <strong>{selectedElectionName}</strong></p>
              </div>
              <button
                onClick={handleBackToElections}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Back to Elections
              </button>
            </div>

            {loading && <p className="text-center text-blue-600">Loading candidates...</p>}

            <div className="flex flex-col gap-6 px-2 sm:px-4">
              {candidates.map((candidate) => (
                <div key={candidate._id} className="bg-gray-100 rounded-lg p-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {candidate.symbolUrl?.startsWith("http") || candidate.symbolUrl?.includes("base64") ? (
                      <img
                        src={candidate.symbolUrl}
                        alt="Symbol"
                        className="h-16 w-16 object-cover rounded-full border border-gray-300"
                      />
                    ) : (
                      <div className="h-16 w-16 flex items-center justify-center bg-gray-200 rounded-full text-xs text-gray-500">
                        N/A
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">Party: {candidate.party}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleEdit(candidate._id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center transition"
                    >
                      <Pencil size={18} className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(candidate._id)}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md flex items-center transition"
                    >
                      <X size={18} className="mr-2" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminCandidateList;
