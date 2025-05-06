import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const VotersList = () => {
  // Sample voter data (this could be fetched from a secure database)
  const [voters, setVoters] = useState([]);
  const getVoterList=async()=>{
    try{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/voterlist`);
      if(response.status===200){
        setVoters(response.data.voters);
      }
    }catch(err){
      console.log(err);
    }

  }
  useEffect(() => {
    getVoterList();
  }, []);

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
                <th className="py-3 px-16 text-start">Name</th>
                <th className="py-3 px-6">Age</th>
                <th className="py-3 px-6">Location</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((voter,idx) => (
                <tr key={idx+1} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-start">{idx+1}.{' '}<b>{voter.username}</b></td>
                  <td className="py-3 px-6 text-center">{voter.age}</td>
                  {/* <td className="py-3 px-6 text-center">{voter.location}</td> */}
                  <td className="py-3 px-6 text-center">Dehradun</td>
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