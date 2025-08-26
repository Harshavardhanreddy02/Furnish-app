import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser, FaCouch } from 'react-icons/fa'
import {logout} from '../../redux/Slices/authSlice'
import {clearcart} from '../../redux/Slices/cartSlice'
import { useDispatch } from 'react-redux'

function Adminsidebar() {
  const navigate = useNavigate() 
  const dispatch = useDispatch()

  const handlelogout = () => {
    dispatch(logout())
    dispatch(clearcart())
    navigate("/")
  }

  return (
    <div className='p-6'>
      {/* Brand */}
      <div className='mb-6'>
        <Link to="/admin" className="text-2xl font-medium">Furnish Store</Link>
      </div>

      <h2 className='text-xl font-medium mb-6 text-center'>
        Admin Dashboard
      </h2>

      {/* Navigation */}
      <nav className='flex flex-col space-y-2'>
        <NavLink
          to='/admin/users'
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Customers</span>
        </NavLink>

        <NavLink
          to='/admin/products'
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaCouch />
          <span>Furniture</span>
        </NavLink>

        <NavLink
          to='/admin/orders'
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className='mt-6'>
        <button
          className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2'
          onClick={handlelogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Adminsidebar


