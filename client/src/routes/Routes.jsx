// src/routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import UserTypeSelection from '../pages/UserTypeSelection';
import AdminLogin from '../pages/AdminLogin';
import AdminPage from '../pages/AdminPage';
import ScanRegisterFace from '../pages/ScanRegisterFace';

import VoterPage from '../pages/VoterPage';
import VoterLogin from '../pages/VoterLogin';
import VoterRegistration from '../pages/VoterRegistration';
import Result from '../pages/Result';
import AddCandidate from '../pages/AddCandidate';
import ElectionHappening from '../pages/ElectionHappening';
import AdminResult from '../pages/AdminResult';
import About from '../pages/About';
import Contact from '../pages/Contact';
import VotersList from '../pages/VoterList';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/user-type' element={<UserTypeSelection/>}/>
      <Route path='/login/admin' element={<AdminLogin/>}/>
      <Route path="/login/voter" element={<VoterLogin />} />
      <Route path="/register" element={<VoterRegistration />} />
      <Route path="/register-scan-face" element={<ScanRegisterFace/>}/>
      <Route path="/admin" element={<AdminPage />} />
      <Route path='/admin/add-candidate' element={<AddCandidate/>}/>
      <Route path='/admin/start-election' element={<ElectionHappening/>}/>
      <Route path='/admin/result' element={<AdminResult/>}/>
      <Route path='/admin/voter-list' element={<VotersList/>}/>
      <Route path='/admin/candidate-list' element={<CandidateList/>}/>
      <Route path="/voter" element={<VoterPage />} />
      <Route path='/result' element={<Result/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
  </Router>
);

export default AppRoutes;
