import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io5'
import {RiTwitterXLine} from 'react-icons/ri'

function Topbar() {
  return (
    <div className='bg-blue-400 text-white '>
     <div className='container mx-auto flex justify-between items-center py-3'>
          <div className='flex items-center space-x-4'>
               <a href="#" className='hover:text-gray-300'> 
                      <TbBrandMeta className='h-5 w-5'/>
               </a>
               <a href="https://www.instagram.com/harsha_vardhan_reddy.___?igsh=bGsyc2ozdWJobGp1" className='hover:text-gray-300 cursor-pointer' >
                   <IoLogoInstagram className='h-5 w-5'/>
               </a>
               <a href="https://x.com/Harshav40896480?t=dHzrp1MhG0QD6EoLL_veJA&s=09" className='hover:text-gray-300 cursor-pointer'>
                   <RiTwitterXLine className='h-5 w-5'/>
               </a>

          </div>
          <div className='text-sm text-center'>
               <span>
                 Worldwide shipping — fast, reliable, and right to your doorstep.
               </span>

          </div>
          <div className='text-sm'>
               <a href="6305277699" className='hover:text-gray-300'>6305277699</a>

          </div>

     </div>
    </div>
  )
}

export default Topbar