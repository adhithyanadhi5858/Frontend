import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function UserProtectionPage() {

  const {isUserAuth,userData} = useSelector((state) => state.user)

  
  return isUserAuth ? <Outlet /> : <Navigate to="/login" />;
  



}

export default UserProtectionPage
