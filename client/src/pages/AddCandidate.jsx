import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const AddCandidate = () => {
  const [candidate, setCandidate] = useState({
    name: '',
    partySymbol: '',
    party: '',
    city: '',
    isApproved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would submit the form data to the backend
    // For now, just log the data for demonstration
    console.log(candidate);
  };

  return (
    <>
    <Navbar/>
    <div className="pt-24 px-6 py-10 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
        Add Candidate (Admin Only)
      </h2>

      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-gray-700 text-lg mb-4">
          Only the admin can add and approve candidates for the election. Please fill in the necessary details below to register a new candidate.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">Candidate's Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={candidate.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="partySymbol">Party Symbol:</label>
            <input
              type="text"
              id="partySymbol"
              name="partySymbol"
              value={candidate.partySymbol}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="party">Party:</label>
            <input
              type="text"
              id="party"
              name="party"
              value={candidate.party}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={candidate.city}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="isApproved">
              Approval by Admin:
            </label>
            <select
              id="isApproved"
              name="isApproved"
              value={candidate.isApproved}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={false}>Pending</option>
              <option value={true}>Approved</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register Candidate
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddCandidate;
