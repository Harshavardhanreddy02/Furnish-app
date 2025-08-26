import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function Protectedroute({children,role}) {
     const {user} = useSelector((state) => state.auth)
     const location = useLocation()

     if(!user || (role && user.role !== role)){
          return <Navigate to='/login' replace state={{ from: location }} />
     }

  return children
}

export default Protectedroute