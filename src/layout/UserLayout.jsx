import React, { useEffect, useState } from 'react'
import Header from '../components/User/Header'
import Footer from '../components/User/Footer'
import { Outlet } from 'react-router-dom'
import BaseHeader from '../components/User/BaseHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from '../redux/features/userSlice'

function UserLayout() {

  const {isUserAuth,userData} = useSelector((state) => state.user)
 
  const dispatch = useDispatch()

  const checkUser = ()=>{
    axiosInstance.get("/api/user/check")
    .then(res=>{
      dispatch(saveUser(res.data))
      
    })
    .catch(error=>{
      console.log(error)
      

    })
  }

  useEffect(()=>{
     checkUser()
  },[])

  return (
    <>
      {/* Header */}
       {
        isUserAuth?<Header/>:<BaseHeader/>
       }
      

      {/* Page Details */}
      <div className='min-h-96'>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default UserLayout
