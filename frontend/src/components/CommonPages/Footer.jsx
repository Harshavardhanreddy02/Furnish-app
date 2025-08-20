import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi"

function Footer() {
  return (
    <>
      <footer className='border-t py-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 lg:px-0 px-4 gap-8'>
          
          {/* Newsletter Section */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
            <p className='text-gray-500 mb-4'>
              Be the first to know about new collections, seasonal discounts, and exclusive offers.
            </p>
            <p className='font-medium text-sm text-gray-600 mb-6'>
              Subscribe now and get 10% off your first furniture order.
            </p>
            <form className='flex'>
              <input 
                type="email" 
                placeholder='Enter your email' 
                className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
                required 
              />
              <button 
                type="submit" 
                className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all cursor-pointer'
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop by Room */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Shop by Room</h3>
            <ul className='space-y-2 text-gray-600'>
              <li><Link to="/collections/living-room" className='hover:text-gray-800'>Living Room</Link></li>
              <li><Link to="/collections/bedroom" className='hover:text-gray-800'>Bedroom</Link></li>
              <li><Link to="/collections/dining-room" className='hover:text-gray-800'>Dining Room</Link></li>
              <li><Link to="/collections/kitchen" className='hover:text-gray-800'>Modular Kitchen</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
            <ul className='space-y-2 text-gray-600'>
              <li><Link to="/contact" className='hover:text-gray-800'>Contact Us</Link></li>
              <li><Link to="/about" className='hover:text-gray-800'>About Us</Link></li>
              <li><Link to="/faqs" className='hover:text-gray-800'>FAQs</Link></li>
              <li><Link to="/features" className='hover:text-gray-800'>Features</Link></li>
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
            <div className='flex items-center space-x-4 mb-6'>
              <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <TbBrandMeta className='h-5 w-5' />
              </a>
              <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <IoLogoInstagram className='h-5 w-5' />
              </a>
              <a href="https://www.twitter.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <RiTwitterXLine className='h-4 w-4' />
              </a>
            </div>
            <p className='text-gray-500'>Call us</p>
            <p><FiPhoneCall className='inline-block mr-2' />+91 63052 77699</p>
          </div>
        </div>

        {/* Bottom Copy */}
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
          <p className='text-gray-500 text-sm tracking-tighter text-center'>
            &copy; 2025 Furnish Store. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
