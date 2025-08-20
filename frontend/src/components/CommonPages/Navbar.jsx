import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingCart, HiBars3BottomRight } from 'react-icons/hi2'
import Searchbar from './Searchbar'
import Cartdrawer from '../Layout/Cartdrawer'

function Navbar() {
  const [drawOpen, setdrawOpen] = useState(false)

  const toggleCartDrawer = () => {
    setdrawOpen(!drawOpen)
  }

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* Logo */}
        <div>
          <Link to="/" className='text-2xl font-semibold text-gray-800'>
            Furnish Store
          </Link>
        </div>

        {/* Navigation Links */}
        <div className='hidden md:flex space-x-6'>
          <Link to="/collections/living-room" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Living Room</Link>
          <Link to="/collections/bedroom" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Bedroom</Link>
          <Link to="/collections/dining-room" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Dining Room</Link>
          <Link to="/collections/office" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Office</Link>
          <Link to="/collections/outdoor" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Outdoor</Link>
        </div>

        {/* Right-side Actions */}
        <div className='flex items-center space-x-4'>
          {/* Admin Link */}
          <Link to='/admin' className='block bg-black px-2 rounded text-sm text-white hover:bg-gray-900'>
            Admin
          </Link>

          {/* User Profile */}
          <Link to="/profile" className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700' />
          </Link>

          {/* Cart Button */}
          <button onClick={toggleCartDrawer} className='relative hover:text-black'>
            <HiOutlineShoppingCart className='h-6 w-6 text-gray-700 cursor-pointer' />
            <span className='absolute -top-1 -right-2 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5'>
              4
            </span>
          </button>

          {/* Search Bar */}
          <div className="overflow-hidden">
            <Searchbar />
          </div>

          {/* Mobile Menu Icon */}
          <button className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <Cartdrawer drawOpen={drawOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  )
}

export default Navbar
