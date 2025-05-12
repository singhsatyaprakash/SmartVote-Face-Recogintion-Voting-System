import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ChooseElection = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/voter/electionlist`);
       // console.log(response);
        if (response.status === 200) {
          setElections(response.data.elections);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching election list:', error);
      }
    };

    fetchElections();
  }, []);

  const handleShowCandidates = (id) => {
    //console.log(`Show candidates for election: ${id}`);
    navigate(`/voter/show-candidate/${id}`);
    // Add navigation or modal logic here
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Election List</h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading elections...</p>
        ) : elections.length === 0 ? (
          <p className="text-center text-red-500 text-lg">No elections available.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {elections.map((election) => (
              <div
                key={election._id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-transform hover:scale-[1.01]"
              >
                <div className="flex flex-col mb-4 sm:mb-0">
                  <h3 className="text-lg font-bold text-blue-700">{election.electionName}</h3>
                  <p className="text-sm text-gray-500">ID: {election.electionId}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Start:</span> {formatDate(election.startDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">End:</span> {formatDate(election.endDate)}
                  </p>
                  <p className={`mt-1 text-sm font-semibold ${election.status === 'ongoing' ? 'text-green-600' : 'text-red-500'}`}>
                    Status: {election.status}
                  </p>
                </div>

                <button
                  onClick={() => handleShowCandidates(election._id)}
                  className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                >
                  Show Candidates
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChooseElection;
