import { useState } from 'react';
import './App.css'
import Routes from './routes/Routes';
import { VoterContext } from './context/VoterContext';
// import StateDistrictSelector from './pages/StateDistrictSelector';
function App() {
  return (
    <>
    <VoterContext>
      <Routes></Routes>
    </VoterContext>
    </>
  )
}

export default App;
