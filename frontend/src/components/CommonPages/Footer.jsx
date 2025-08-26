import React, { useState } from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi"
import axios from 'axios'
import { toast } from 'sonner'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleSubscribe = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      toast.error('Please enter your email')
      return
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!isValid) {
      toast.error('Please enter a valid email')
      return
    }
    try {
      setSubscribing(true)
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, { email: trimmed })
      toast.success('Subscribed successfully!')
      setEmail('')
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Subscription failed'
      toast.error(message)
    } finally {
      setSubscribing(false)
    }
  }

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
            <form className='flex' onSubmit={handleSubscribe}>
              <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
              <input 
                id='newsletter-email'
                type="email" 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
                required 
              />
              <button 
                type="submit" 
                disabled={subscribing}
                className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Shop by Room */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Shop by Room</h3>
            <ul className='space-y-2 text-gray-600'>
              <li><Link to="/collections/all?collections=livingroom" className='hover:text-gray-800'>Living Room</Link></li>
              <li><Link to="/collections/all?collections=Bedroom" className='hover:text-gray-800'>Bedroom</Link></li>
              <li><Link to="/collections/all?collections=Diningroom" className='hover:text-gray-800'>Dining Room</Link></li>
              <li><Link to="/collections/all?collection=Office" className='hover:text-gray-800'>Office</Link></li>
              <li><Link to="/collections/all?collection=Wooden" className='hover:text-gray-800'>Wooden</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
            <ul className='space-y-2 text-gray-600 mb-4'>
              <li><a href="mailto:support@furnishstore.com" className='hover:text-gray-800'>Email Support</a></li>
              <li><Link to="/about" className='hover:text-gray-800'>About Us</Link></li>
              <li><Link to="/faqs" className='hover:text-gray-800'>FAQs</Link></li>
              <li><Link to="/features" className='hover:text-gray-800'>Features</Link></li>
            </ul>
            <div className='mt-4 space-y-1 text-sm text-gray-600'>
              <p>Support Hours: Mon–Sat, 9:00 AM – 6:00 PM</p>
              <p>
                WhatsApp: <a href='https://wa.me/916305277699' target='_blank' rel='noopener noreferrer' className='hover:underline'>+91 63052 77699</a>
              </p>
            </div>
          </div>

          {/* Social + Contact */}
          <div>
            <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
            <div className='flex items-center space-x-4 mb-6'>
              <a href="https://www.facebook.com" aria-label='Facebook' target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <TbBrandMeta className='h-5 w-5' />
              </a>
              <a href="https://www.instagram.com" aria-label='Instagram' target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <IoLogoInstagram className='h-5 w-5' />
              </a>
              <a href="https://www.twitter.com" aria-label='Twitter/X' target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <RiTwitterXLine className='h-4 w-4' />
              </a>
            </div>
            <p className='text-gray-500'>Call us</p>
            <p>
              <FiPhoneCall className='inline-block mr-2' />
              <a href='tel:+916305277699' className='hover:underline'>+91 63052 77699</a>
            </p>
          </div>
        </div>

        {/* Bottom Copy */}
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
          <p className='text-gray-500 text-sm tracking-tighter text-center'>
            &copy; {currentYear} Furnish Store. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
