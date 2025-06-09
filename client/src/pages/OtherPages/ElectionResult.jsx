import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ElectionResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/result`);
        setResults(response.data.results || []);
      } catch (error) {
        console.error('Error fetching election results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading election results...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-28 pb-10 px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          🗳️ Election Results
        </h1>

        {selectedResult ? (
          <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedResult(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to All Results
            </button>
            <h2 className="text-2xl font-semibold mb-2">Election Name: {selectedResult.electionName}</h2>
            <h3 className="text-lg text-gray-600 mb-6">Election ID: {selectedResult.ID}</h3>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <img
                src={selectedResult.winner.symbolUrl}
                alt="Winner Symbol"
                className="w-20 h-20 object-contain border rounded"
              />
              <div className="text-center sm:text-left">
                <p className="text-xl font-bold text-yellow-600">🏆 {selectedResult.winner.name}</p>
                <p className="text-sm text-gray-700">{selectedResult.winner.party}</p>
                <p className="text-sm">Votes: {selectedResult.winner.votes}</p>
                <p className="text-sm">Winning Difference: {selectedResult.winner.voteDiff}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-purple-700">📊 Full Candidate Rankings</h3>
            <ul className="space-y-4">
              {selectedResult.rankings.map((c) => (
                <li
                  key={c.candidateId}
                  className="border-b pb-3 flex items-center gap-4"
                >
                  <img
                    src={c.symbolUrl}
                    alt="Symbol"
                    className="w-10 h-10 object-contain rounded"
                  />
                  <div>
                    <p className="font-semibold">
                      #{c.rank} - {c.name}
                    </p>
                    <p className="text-sm text-gray-600">{c.party}</p>
                    <p className="text-sm">Votes: {c.votes}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-bold mb-2">Election Name: {result.electionName}</h2>
                <h3 className="text-gray-600 mb-4">Election ID: {result.ID}</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={result.winner.symbolUrl}
                    alt="Winner Symbol"
                    className="w-14 h-14 object-contain rounded border"
                  />
                  <div>
                    <p className="font-bold text-yellow-600">Winner: {result.winner.name}</p>
                    <p className="text-sm text-gray-600">{result.winner.party}</p>
                    <p className="text-sm">Votes: {result.winner.votes}</p>
                    <p className="text-sm">Winning Difference: {result.winner.voteDiff}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResult(result)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                  View Full Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ElectionResult;
