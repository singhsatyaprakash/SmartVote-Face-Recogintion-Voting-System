import React from 'react';
import { Link } from 'react-router-dom';

const Result = () => {
  // Sample data (replace with props or API data in real use)
  const candidates = [
    { name: 'Satya Prakash Singh', votes: 230 },
    { name: 'Deepak', votes: 180 },
    { name: 'Anjali Bhatt', votes: 120 },
    { name: 'NOTA', votes: 25 }
  ];

  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  const winner = sortedCandidates[0];
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  const notaVotes = candidates.find(c => c.name === 'NOTA')?.votes || 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6">
        🎉 Congratulations {winner.name}! 🎉
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
        {winner.name} has won the election with <b>{winner.votes}</b> votes!
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center text-blue-600 dark:text-white mb-4">Election Results</h2>
        
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {sortedCandidates.map((candidate, index) => (
            <li key={index} className="py-3 flex justify-between text-lg text-gray-800 dark:text-gray-200">
              <span>{candidate.name}</span>
              <span>{candidate.votes} votes</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-gray-700 dark:text-gray-300">
          <p><b>Total Votes Cast:</b> {totalVotes}</p>
          <p><b>Total NOTA Votes:</b> {notaVotes}</p>
        </div>
      </div>
      <div className='text-white text-m p-12 underline'>
        <Link to='/'>Go to Home</Link>
      </div>
    </div>
  );
};

export default Result;
