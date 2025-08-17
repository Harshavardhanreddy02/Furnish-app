import React from 'react'
import {Link} from 'react-router-dom'

function Feauturecollection() {
  return (
    <section className='py-16 px-4 lg:px-0'>
     <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-3xl">
          <div className='lg:w-1/2 p-8 text-center lg:text-left '>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>
            Comfortable and Stylish
          </h2>
          <h2 className='text-4xl lg:text-5xl  font-bold mb-6 '>
            Apparel made for your everyday life
          </h2>
          <p className='text-lg text-gray-600 mb-6'>
            Discover the perfect blend of comfort and style with our latest collection.
          </p>
          <Link to="/collection/all" className=' bg-black text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-800'>
            Shop Now
          </Link>

          </div>

          <div className="lg:w-1/2 p-8">
            <img src="https://picsum.photos/500/500?random=15" alt="Featured Collection" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
          </div>
     </div>

    </section>
  )
}

export default Feauturecollection