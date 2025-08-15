import React from 'react'
import Header from '../CommonPages/Header'
import Footer from '../CommonPages/Footer'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default HomeLayout