import React from 'react';
import Navbar from '../components/Navbar';

const VotersList = () => {
  // Sample voter data (this could be fetched from a secure database)
  const voters = [
    { id: 1, name: "Amit Sharma", age: 30, location: "New Delhi" },
    { id: 2, name: "Priya Verma", age: 26, location: "Mumbai" },
    { id: 3, name: "Rahul Singh", age: 34, location: "Bangalore" },
    // Add more sample or actual data
  ];

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 py-10 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Registered Voters List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Age</th>
                <th className="py-3 px-6">Location</th>
              </tr>
            </thead>
            <tbody>
              {voters.map(voter => (
                <tr key={voter.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{voter.name}</td>
                  <td className="py-3 px-6">{voter.age}</td>
                  <td className="py-3 px-6">{voter.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VotersList;