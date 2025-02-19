import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function AdmineProtection() {
  const {isAdmineAuth,admineData} = useSelector((state) => state.admine)
 
  console.log(isAdmineAuth)
   
   const navigate = useNavigate();
 
 useEffect(()=>{
  
  if (!isAdmineAuth) {
    navigate("/admine/login");
    return;
}
 },[])
  
 
   return <Outlet />;
}

export default AdmineProtection
