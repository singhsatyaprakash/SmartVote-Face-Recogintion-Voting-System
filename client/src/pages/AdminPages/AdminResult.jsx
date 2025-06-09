import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function AdminResult() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/electionlist`);
        if (res.status === 200 && res.data.elections) {
          const completedElections = res.data.elections.filter(e => e.status === 'completed');
          setElections(completedElections);
        } else {
          setElections([]);
        }
      } catch (err) {
        setElections([]);
        console.error('Error fetching elections:', err);
      }
    };
    fetchElections();
  }, []);

  const handleDeclareResult = (id, name) => {
    navigate(`/admin/announceResult/${id}`);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <>
      <Navbar />
      <div className="p-4 pt-24 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Result Declaration</h2>

        {elections.length === 0 ? (
          <div className="text-center text-red-600 font-semibold mt-4">
            No completed elections found.
          </div>
        ) : (
          elections.map(election => (
            <div
              key={election._id}
              className="border p-6 mb-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white"
            >
              <div className="mb-2 sm:mb-0">
                <h3 className="text-lg font-semibold">{election.electionName}</h3>
                <p><strong>ID:</strong> {election.electionId}</p>
                <p><strong>Start:</strong> {formatDate(election.startDate)}</p>
                <p><strong>End:</strong> {formatDate(election.endDate)}</p>
                <p className="mt-1">
                  Status: <span className="text-green-600 font-medium">{election.status}</span>
                </p>
              </div>
              <button
                className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                onClick={() => handleDeclareResult(election._id)}
              >
                Declare Result
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AdminResult;
