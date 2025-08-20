import React from 'react';
import { Link } from 'react-router-dom';

function ProductGrid({ products }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id} className='block'>
          <div className='bg-white p-4 rounded-lg shadow hover:shadow-md transition'>
            <div className='w-full h-96 mb-4 overflow-hidden rounded-md'>
              <img
                src={product.image[0].url}
                alt={product.name}
                className='w-full h-full object-cover rounded-md transform hover:scale-105 transition duration-300'
              />
            </div>
            <h3 className='text-sm font-semibold mb-1'>{product.name}</h3>
            <p className='text-gray-600 font-medium text-sm tracking-tight'>₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
