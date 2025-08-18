import React from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineUser,HiOutlineShoppingCart,HiBars3BottomRight} from 'react-icons/hi2'
import Searchbar from './Searchbar'
import Cartdrawer from '../Layout/Cartdrawer'
import { useState } from 'react'

function Navbar() {

     const [drawOpen,setdrawOpen] = useState(false)
     
          const toggleCartDrawer = () =>
          {
               setdrawOpen(!drawOpen)
          }
  return (
    <>
    <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
     <div>
          <Link to="/" className='text-2xl font-medium'>Furnish Store</Link>
     </div>
     <div className='hidden md:flex space-x-6'>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Living room </Link>
          <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Bedroom </Link>
          <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Dining room </Link>
          <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Office room </Link>

     </div>
     <div className='flex items-center space-x-4'>
          <Link to="/profile" className='hover:text-black'>
          <HiOutlineUser  className='h-6 w-6  text-gray-700'/>
          </Link>
          <button  onClick={toggleCartDrawer} className='relative hover:text-black'>
               <HiOutlineShoppingCart  className='h-6 w-6 text-gray-700 cursor-pointer'/>
               <span className='absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5 '>
                    4

               </span>

          </button>
          <div className="overflow-hidden">
               <Searchbar/>
          </div>
          
          <button className='md:hidden'>
               <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
          </button>


     </div>
    </nav>

    <Cartdrawer  drawOpen={drawOpen} toggleCartDrawer={toggleCartDrawer}/>
    </>
  )
}

export default Navbar