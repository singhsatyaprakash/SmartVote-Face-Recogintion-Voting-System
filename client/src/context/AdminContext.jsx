import React, { createContext, useState } from 'react'
const AdminDataContext=createContext();
const AdminContext = () => {
  const [admin,setAdmin]=useState();
  return (
    <div>AdminContext</div>
  )
}

export default AdminContext