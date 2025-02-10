import React from 'react'
import Header from '../components/Admine/Header'
import Footer from '../components/Admine/Footer'
import { Outlet } from 'react-router-dom'
import BaseHeader from '../components/Admine/BaseHeader'

function AdmineLayout() {
  const userAuth = true
  return (
    <>
      {/* Header */}
       {
        userAuth?<Header/>:<BaseHeader/>
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