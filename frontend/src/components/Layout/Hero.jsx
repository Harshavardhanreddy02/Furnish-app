import React from 'react'
import img1 from '../../images/img1.jpg'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
    <section className='relative'>
     <img src={img1} alt="sofa" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />

     <div className='absolute inset-0 bg-black/20 flex items-center justify-end'>
          <div className='text-right text-white p-6 md:p-16'>
               <h1 className='text-5xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
                 Style your <br />Space
               </h1> 
               <p className='text-sm tracking-tighter md:text-lg mb-6'>
                    Discover the latest trends in furniture and home decor.
               </p>
               <Link to="/collections/all" className='bg-white text-gray-950 py-2 px-6 rounded-sm text-lg inline-block'>
                    Shop Now
               </Link>
          </div>
     </div>
    </section>
    </>
  )
}

export default Hero
