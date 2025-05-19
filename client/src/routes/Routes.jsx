// src/routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/OtherPages/HomePage'
import UserTypeSelection from '../pages/OtherPages/UserTypeSelection';
import AdminLogin from '../pages/AdminPages/AdminLogin';
import ScanRegisterFace from '../pages/VoterPages/ScanRegisterFace';
import VoterLogin from '../pages/VoterPages/VoterLogin';
import VoterRegistration from '../pages/VoterPages/VoterRegistration';
import AddCandidate from '../pages/AdminPages/AddCandidate';
import AdminResult from '../pages/AdminPages/AdminResult';
import About from '../pages/OtherPages/About';
import Contact from '../pages/OtherPages/Contact';
import VotersList from '../pages/VoterPages/VoterList';
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import AdminCandidateList from '../pages/OtherPages/AdminCandidateList';
import ManageComplain from '../pages/AdminPages/ManageComplain';
import VoterDashBoard from '../pages/VoterPages/VoterDashBoard';
import CreateElection from '../pages/AdminPages/CreateElection';
import ChooseStartElection from '../pages/AdminPages/ChooseStartElection';
import ChooseAddElection from '../pages/AdminPages/ChooseAddElection';
import ElectionHappening from '../pages/AdminPages/ElectionHappening';
import AdminProtectWrapper from '../ProtectWrapper/AdminProtectWrapper';
import VoterProtectWrapper from '../ProtectWrapper/VoterProtectWrapper';
import ChooseElection from '../pages/VoterPages/ChooseElection';
import ElectionResult from '../pages/OtherPages/ElectionResult';
import VoterCandidateList from '../pages/VoterPages/VoterCandidateList';
import ShowCandidate from '../pages/VoterPages/ShowCandidate';
import ElectionOngoingList from '../pages/VoterPages/ElectionOngoingList';
import ShowElection from '../pages/AdminPages/ShowElection';
import VoterComplain from '../pages/VoterPages/VoterComplain';
import VoterVerification from '../components/VoterVerification';
import ScanVerificationFace from '../pages/VoterPages/ScanVerificationFace';
import NowVote from '../pages/VoterPages/NowVote';
import PageNotFound from '../pages/OtherPages/PageNotFound';
import VoterVerified from '../ProtectWrapper/VoterVerified';
import Profile from '../pages/OtherPages/Profile';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/result' element={<ElectionResult/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/user-type' element={<UserTypeSelection/>}/>

      {/* admin */}
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={
        <AdminProtectWrapper>
          <AdminDashboard/>
        </AdminProtectWrapper>
        } 
      />
      <Route path="/admin/create-election" element={
        <AdminProtectWrapper>
          <CreateElection/>
        </AdminProtectWrapper>
        } />
      <Route path='/admin/show-election' element={
        <AdminProtectWrapper>
          <ShowElection/>
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/choose-add-election' element={
        <AdminProtectWrapper>
          <ChooseAddElection/>
        </AdminProtectWrapper>
        }
        />
      <Route path="/admin/addcandidate/:electionId" element={
        <AdminProtectWrapper>
          <AddCandidate />
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/choose-start-election' element={
        <AdminProtectWrapper>
          <ChooseStartElection/>
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/start-election/:electionId' element={
        <AdminProtectWrapper>
          <ElectionHappening/>
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/result' element={
        <AdminProtectWrapper>
          <AdminResult/>
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/voter-list' element={
        <AdminProtectWrapper>
          <VotersList/>
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/candidate-list' element={
        <AdminProtectWrapper>
          <AdminCandidateList/>
        </AdminProtectWrapper>
        }
      />
      <Route path='/admin/manage-complaints' element={
        <AdminProtectWrapper>
          <ManageComplain/>
        </AdminProtectWrapper>
        }
      />

      {/* voter */}
      <Route path="/voter/login" element={<VoterLogin/>} />
      <Route path="/voter/register" element={<VoterRegistration />} />
      <Route path="/voter/register/register-scan-face" element={<ScanRegisterFace/>}/>
      <Route path='/voter/dashboard' element={
        <VoterProtectWrapper>
          <VoterDashBoard/>
        </VoterProtectWrapper>
        }
      />
      <Route path='/voter/choose-election' element={
        <VoterProtectWrapper>
          <ChooseElection/>
        </VoterProtectWrapper>
        }
      />
      <Route path='/voter/show-candidate/:id' element={
        <VoterProtectWrapper>
          <ShowCandidate/>
        </VoterProtectWrapper>
      }
      />
      <Route path='/voter/voter-list' element={
        <VoterProtectWrapper>
          <VotersList/>
        </VoterProtectWrapper>
      }
      />
      <Route path='/voter/election-result' element={
        <VoterProtectWrapper>
          <ElectionResult/>
        </VoterProtectWrapper>
        }
      />
      <Route path='/voter/candidate-list' element={
        <VoterProtectWrapper>
          <VoterCandidateList/>
        </VoterProtectWrapper>
      }
      />
      <Route path='/voter/election-HappeningList' element={
        <VoterProtectWrapper>
          <ElectionOngoingList/>
        </VoterProtectWrapper>
      }
      />
      <Route path='/voter/complaint' element={
        <VoterProtectWrapper>
          <VoterComplain/>
        </VoterProtectWrapper>
      }
      />
      <Route path='/voter/voting-face-verification/:id' element={
        <VoterProtectWrapper>
          <ScanVerificationFace/>
        </VoterProtectWrapper>
      }
      />
      <Route path='/voter/voting/:id' element={
        <VoterProtectWrapper>
          {/* protect this page also that it come to this page after verfication the voter face */}
          <VoterVerified>
            <NowVote/>
          </VoterVerified>
        </VoterProtectWrapper>
      }
      />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  </Router>
);

export default AppRoutes;
