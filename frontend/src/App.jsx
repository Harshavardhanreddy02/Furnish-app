import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeLayout from './components/Layout/HomeLayout'
import HomePage from './pages/HomePage'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collectionpage from './pages/Collectionpage'
import Productdetails from './components/Products/Productdetails'
import Checkout from './components/Cart/Checkout'
import Orderconfirmationpage from './pages/Orderconfirmationpage'
import Orderdetailspage from './pages/Orderdetailspage'
import Myorder from './pages/Myorder'
import Adminlayout from './components/Admin/Adminlayout'
import Adminhomepage from './pages/Adminhomepage'
import Usermanagement from './components/Admin/Usermanagement'
import Productmanagement from './components/Admin/Productmanagement'
import Editproduct from './components/Admin/Editproduct'
import Ordermanagement from './components/Admin/Ordermanagement'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Home Layout */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collectionId" element={<Collectionpage />} />
          <Route path="product/:id" element={<Productdetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<Orderconfirmationpage />} />
          <Route path="order/:id" element={<Orderdetailspage />} />
          <Route path="my-orders" element={<Myorder />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<Adminlayout />}>
          <Route index element={<Adminhomepage />} />
          <Route path="users" element={<Usermanagement />} />
          <Route path='products' element={<Productmanagement />}/>
          <Route path='products/:id/edit' element={<Editproduct/>}/>
          <Route path='orders' element={<Ordermanagement />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
