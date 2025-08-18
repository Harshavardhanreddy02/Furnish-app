import './App.css'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomeLayout from './components/Layout/HomeLayout'
import HomePage from './pages/HomePage'
import {Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collectionpage from './pages/Collectionpage'
import Productdetails from './components/Products/Productdetails'
import Checkout from './components/Cart/Checkout'


function App() {
  

  return (
    <>
    <Toaster position="top-right" />
     <Routes>
      <Route path="/" element={<HomeLayout />} >
       <Route index element={<HomePage />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collections/:collectionId" element={<Collectionpage />} />
        <Route path="/product/:id" element={<Productdetails />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>
      <Route>
        {/* Admin Layout */}

      </Route>
     </Routes>
    </>
  )
}

export default App
