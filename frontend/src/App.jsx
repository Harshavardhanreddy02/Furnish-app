import './App.css'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomeLayout from './components/Layout/HomeLayout'


function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route>
        {/* Admin Layout */}

      </Route>
     </Routes>
    </>
  )
}

export default App
