import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminProtectWrapper = ({children}) => {
  const navigate=useNavigate();
  const checkAdminProfile=async(adminId)=>{
    if(adminId===null || adminId===undefined){
      navigate('/admin/login');
    }
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/profile/${adminId}`);
    // console.log(response);
    if(response.status===200){
      const admin=response.data.admin;
      if(!admin){
        navigate('/admin/login');
      }
    }
  }
    useEffect(()=>{
      if(localStorage.getItem('voterId')){
        localStorage.removeItem('voterId');// if  switching from admin to voter remove all admin key & data...
      }
        const token=localStorage.getItem('token');
        const admin=localStorage.getItem('adminId');
        if(!token || !admin){
          navigate('/admin/login');
        }
        //check for voter and admin clash...
        const adminId=localStorage.getItem('adminId');
        checkAdminProfile(adminId);
    })
  return (
    <>
    {children}
    </>
  )
}

export default AdminProtectWrapper;