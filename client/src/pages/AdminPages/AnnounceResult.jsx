import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AnnounceResult = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election,setElection]= useState({});
  const [candidates, setCandidates] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [announcing, setAnnouncing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ID, setID] = useState('');
  const [electionName, setElectionName] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        //fetching election details
        const electionRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/electionDetails/${electionId}`);
        if (electionRes.status === 200) {
          setID(electionRes.data.election.electionId);
          setElectionName(electionRes.data.election.electionName);
        } else {
          console.error('Failed to fetch election details');
          return;
        }
        //fetching candidates for the election
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getCandidate/${electionId}`);
        const fetchedCandidates = res.data.candidates || [];
        setCandidates(fetchedCandidates);


        if (fetchedCandidates.length > 0) {
          const sorted = [...fetchedCandidates].sort((a, b) => b.votes - a.votes);
          const rankings = sorted.map((c, i) => ({
            candidateId: c._id,
            name: c.name,
            party: c.party,
            symbolUrl: c.symbolUrl,
            votes: c.votes,
            rank: i + 1,
          }));

          const voteDiff = sorted.length > 1 ? sorted[0].votes - sorted[1].votes : sorted[0].votes;

          const winner = {
            candidateId: sorted[0]._id,
            name: sorted[0].name,
            party: sorted[0].party,
            symbolUrl: sorted[0].symbolUrl,
            votes: sorted[0].votes,
            voteDiff,
          };
          setResult({ electionId, ID: electionRes.data.election.electionId, electionName: electionRes.data.election.electionName, winner, rankings });
        }
      } catch (err) {
        console.error('Error fetching candidates:', err);
      }
    };

    fetchCandidates();
  }, [electionId]);

  const announceResult = async () => {
    if (!result) return;
    setAnnouncing(true);

    try {
      console.log('Announcing result:', result);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/result`, result);
      if (response.status === 201) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/admin/result');
        }, 3000);
      }
    } catch (err) {
      console.error('Error saving result:', err);
    }

    setAnnouncing(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <div className="pt-24 px-6 max-w-3xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center">Announce Election Result</h2>

        {candidates.length === 0 && !loading && (
          <div className="text-red-600 text-center mt-10">
            ⚠️ No candidates found for this election.
          </div>
        )}

        {result && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center space-x-2">
              <EmojiEventsIcon style={{ color: '#FFD700' }} />
              <span>Winner</span>
            </h3>
            <div className="flex items-center space-x-4 mb-6">
              <img src={result.winner.symbolUrl} alt="Winner Symbol" className="w-20 h-20 object-contain rounded-full  border-yellow-500" />
              <div>
                <p className="text-xl font-bold">{result.winner.name}</p>
                <p className="text-md text-gray-600">{result.winner.party}</p>
                <p className="text-md font-semibold">Votes: {result.winner.votes}</p>
                <p className="text-sm text-green-700 mt-1">Winning Margin: {result.winner.voteDiff} vote(s)</p>
              </div>
            </div>

            <h4 className="text-xl font-semibold mb-3 flex items-center space-x-2">
              <LeaderboardIcon style={{ color: '#4A90E2' }} />
              <span>Full Rankings</span>
            </h4>
            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {result.rankings.map((r) => (
                <li key={r.candidateId} className="flex items-center space-x-4 border-b pb-3">
                  <img src={r.symbolUrl} alt="Candidate Symbol" className="w-12 h-12 object-contain rounded-full" />
                  <div>
                    <p className="font-medium text-lg">#{r.rank} - {r.name}</p>
                    <p className="text-sm text-gray-600">{r.party}</p>
                    <p className="text-sm">Votes: {r.votes}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <button
                onClick={announceResult}
                disabled={announcing}
                className={`bg-green-600 hover:bg-green-700 transition duration-300 text-white px-10 py-3 rounded-md font-semibold shadow-lg ${
                  announcing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {announcing ? 'Announcing...' : 'Announce Result'}
              </button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg flex items-center space-x-2 z-50">
            <CheckCircleIcon />
            <span>Result Announced Successfully!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default AnnounceResult;
