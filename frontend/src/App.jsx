import './App.css'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomeLayout from './components/Layout/HomeLayout'
import HomePage from './pages/HomePage'


function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<HomeLayout />} >
       <Route index element={<HomePage />} />
      </Route>
      <Route>
        {/* Admin Layout */}

      </Route>
     </Routes>
    </>
  )
}

export default App
