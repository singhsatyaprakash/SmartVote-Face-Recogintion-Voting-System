import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom';

const VoterProtectWrapper = ({children}) => {
  const navigate=useNavigate();

  const checkVoterProfile=async(voterId)=>{
    if(voterId===null || voterId===undefined){
      navigate('/voter/login');
    }
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/voter/profile/${voterId}`);
    // console.log(response);
    if(response.status===200){
      const voter=response.data.voter;
    if(!voter){
      console.log('voter not found');
      navigate('/voter/login');
    }
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('adminId')){
      localStorage.removeItem('adminId');// if switching from admin to voter remove all admin key & data...
    }
    const voter=localStorage.getItem('voterId');
    const token=localStorage.getItem('token');
    if(!token || !voter){
      navigate('/voter/login')
    }
    const voterId=localStorage.getItem('voterId');
    checkVoterProfile(voterId);
  })
  return (
    <>
    {children }
    </>
  )
}

export default VoterProtectWrapper