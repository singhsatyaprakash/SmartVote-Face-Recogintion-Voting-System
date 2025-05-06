// src/routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import UserTypeSelection from '../pages/UserTypeSelection';
import AdminLogin from '../pages/AdminLogin';
import ScanRegisterFace from '../pages/ScanRegisterFace';
import VoterPage from '../pages/VoterPage';
import VoterLogin from '../pages/VoterLogin';
import VoterRegistration from '../pages/VoterRegistration';
import Result from '../pages/Result';
import AddCandidate from '../pages/AddCandidate';
import AdminResult from '../pages/AdminResult';
import About from '../pages/About';
import Contact from '../pages/Contact';
import VotersList from '../pages/VoterList';
import AdminDashboard from '../pages/AdminDashboard';
// import FaceScanner from '../components/FaceScanner';
import CandidateList from '../pages/CandidateList';
import ManageComplain from '../pages/ManageComplain';
import VoterDashBoard from '../pages/VoterDashBoard';
import CreateElection from '../pages/CreateElection';
import ChooseStartElection from '../pages/ChooseStartElection';
import ChooseAddElection from '../pages/ChooseAddElection';
import ElectionHappening from '../pages/ElectionHappening';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/voter" element={<VoterPage />} />
      <Route path='/result' element={<Result/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/user-type' element={<UserTypeSelection/>}/>

      {/* admin */}
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/admin/create-election" element={<CreateElection/>} />
      <Route path='/admin/choose-add-election' element={<ChooseAddElection/>}/>
      <Route path="/admin/addcandidate/:electionId" element={<AddCandidate />} />
      <Route path='/admin/choose-start-election' element={<ChooseStartElection/>}/>
      <Route path='/admin/start-election/:electionId' element={<ElectionHappening/>}/>
      <Route path='/admin/result' element={<AdminResult/>}/>
      <Route path='/admin/voter-list' element={<VotersList/>}/>
      <Route path='/admin/candidate-list' element={<CandidateList/>}/>
      <Route path='/admin/manage-complaints' element={<ManageComplain/>}/>

      {/* voter */}
      <Route path="/voter/login" element={<VoterLogin />} />
      <Route path="/voter/register" element={<VoterRegistration />} />
      <Route path="/voter/register/register-scan-face" element={<ScanRegisterFace/>}/>
      <Route path='voter/dashboard' element={<VoterDashBoard/>}/>

    </Routes>
  </Router>
);

export default AppRoutes;
