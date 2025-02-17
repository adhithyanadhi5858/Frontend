import React from 'react'
import Header from '../components/Admine/Header'
import Footer from '../components/Admine/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import BaseHeader from '../components/Admine/BaseHeader'
import { useSelector, useDispatch } from 'react-redux'
import { saveAdmine } from '../redux/features/admineSlice'
import { useEffect } from 'react'
import { axiosInstance } from '../config/axiosInstance'

function AdmineLayout() {

  const { isAdmineAuth, admineData } = useSelector((state) => state.admine)
  const location = useLocation()
  const dispatch = useDispatch()

  const checkAdmine = () => {
    axiosInstance.get("/api/admine/check")
      .then(res => {
        dispatch(saveAdmine(res.data))

      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    checkAdmine()
  }, [location.pathname])

  return (
    <>
      {/* Header */}
      {
        isAdmineAuth ? <Header /> : <BaseHeader />
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

export default AdmineLayout