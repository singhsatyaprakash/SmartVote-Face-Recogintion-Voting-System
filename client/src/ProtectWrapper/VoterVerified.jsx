import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const VoterVerified = ({children}) => {
    const navigate=useNavigate();
    useEffect(()=>{
        const verfied=localStorage.getItem('verified');
        if(verfied==='false'){
            navigate(`/voter/voting-face-verification/${electionId}`);
        }
    })
  return (
    <>
    {children}
    </>
  )
}

export default VoterVerified