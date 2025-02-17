import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function AdmineProtection() {
  const {isAdmineAuth,admineData} = useSelector((state) => state.admine)
 
   
   const navigate = useNavigate();
 
   // useEffect(() => {
   if (!isUserAuth) {
       navigate("/admine/login");
       return;
   }
   // }, []);
 
   return <Outlet />;
}

export default AdmineProtection
