import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function UserProtectionPage() {

  const {isUserAuth,userData} = useSelector((state) => state.user)

  
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default UserProtectionPage
