import React, { useEffect, useState } from 'react'
import Header from '../components/User/Header'
import Footer from '../components/User/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import BaseHeader from '../components/User/BaseHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from '../redux/features/userSlice'

function UserLayout() {

  const { isUserAuth, userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const checkUser = () => {
    axiosInstance.get("/api/user/check")
      .then(res => {
        dispatch(saveUser(res.data))

      })
      .catch(error => {
        console.log(error)


      })
  }

  useEffect(() => {
    checkUser()
  }, [location.pathname])

  return (
    <>
      {/* Header */}
      {
        isUserAuth ? <Header /> : <BaseHeader />
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
