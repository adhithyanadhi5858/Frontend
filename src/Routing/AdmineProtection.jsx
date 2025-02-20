import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function AdmineProtection() {
  const {isAdmineAuth,admineData} = useSelector((state) => state.admine)
 
  return isAdmineAuth ? <Outlet /> : <Navigate to="/login" />;
 
}

export default AdmineProtection
