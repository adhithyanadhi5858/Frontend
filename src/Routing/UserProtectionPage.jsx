import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function UserProtectionPage() {

  const {isUserAuth,userData} = useSelector((state) => state.user)

  
  const navigate = useNavigate();

 
 useEffect(()=>{
  if (!isUserAuth) {
    navigate("/login");
    return;
}
 },[])


  return <Outlet />;
}

export default UserProtectionPage
