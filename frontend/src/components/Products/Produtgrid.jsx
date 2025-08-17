import React from 'react'
import { Link } from 'react-router-dom'

function Produtgrid({products}) {
  return (
    <div className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
     {products.map((product,index) =>
     (
             <Link to={`/product/${product._id}`} key={index} className='block'>
               <div className='bg-white p-4 rounded-lg'>
                 <div className='w-full h-96 mb-4'>
                   <img src={product.image[0].url} alt={product.name} className='w-full h-full object-cover rounded-md' />
                 </div>

                 <h3 className='text-sm  mb-2 font-semibold'>{product.name}</h3>
                   <p className='text-gray-600 font-medium text-sm tracking-tighter'>₹{product.price}</p>
               </div>
             </Link>
     ))}

    </div>
  )
}

export default Produtgrid