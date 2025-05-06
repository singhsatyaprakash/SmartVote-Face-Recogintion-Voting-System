import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { X } from 'lucide-react'; // Optional: Small cross icon for remove

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const getCandidateList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getCandidate`);
      console.log(response);
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    getCandidateList();
  }, []);

  const removeCandidate = async (id, name) => {
    const confirmDelete = window.confirm(`Do you want to delete the candidate "${name}"?`);
    if (!confirmDelete) return;
  
    try {
      // await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteCandidate/${id}`);
      setCandidates(candidates.filter(candidate => candidate._id !== id));
    } catch (error) {
      console.error('Error removing candidate:', error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 py-10 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Registered Candidate List
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map(candidate => (
            <div
              key={candidate._id}
              onClick={() => setSelectedId(candidate._id)}
              className={`relative p-5 rounded-2xl border bg-white shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 ${
                selectedId === candidate._id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
              }`}
            >
              <img
                src={candidate.symbolUrl}
                alt={`${candidate.party} symbol`}
                className="w-20 h-20 object-contain rounded-xl border mb-4"
              />
              <h2 className="text-lg font-semibold">{candidate.name}</h2>
              <p className="text-sm text-gray-600">{candidate.party}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card selection
                  removeCandidate(candidate._id, candidate.name);
                }}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition"
                title="Remove"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
