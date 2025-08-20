import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io5'
import { RiTwitterXLine } from 'react-icons/ri'

function Topbar() {
  return (
    <div className='bg-gray-800 text-white'>
      <div className='container mx-auto flex justify-between items-center py-3'>
        {/* Social Icons */}
        <div className='flex items-center space-x-4'>
          <a href="#" className='hover:text-gray-300' aria-label="Meta">
            <TbBrandMeta className='h-5 w-5' />
          </a>
          <a 
            href="https://www.instagram.com/harsha_vardhan_reddy.___?igsh=bGsyc2ozdWJobGp1" 
            className='hover:text-gray-300 cursor-pointer' 
            aria-label="Instagram"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <IoLogoInstagram className='h-5 w-5' />
          </a>
          <a 
            href="https://x.com/Harshav40896480?t=dHzrp1MhG0QD6EoLL_veJA&s=09" 
            className='hover:text-gray-300 cursor-pointer' 
            aria-label="Twitter/X"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <RiTwitterXLine className='h-5 w-5' />
          </a>
        </div>

        {/* Furniture Specific Tagline */}
        <div className='text-sm text-center'>
          <span>
            Premium Furniture — handcrafted comfort, delivered to your home.
          </span>
        </div>

        {/* Contact Number */}
        <div className='text-sm'>
          <a href="tel:+916305277699" className='hover:text-gray-300'>
            +91 63052 77699
          </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar
