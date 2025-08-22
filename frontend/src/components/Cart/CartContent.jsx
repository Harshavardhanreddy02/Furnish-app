import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";

function CartContent() {
  const cartProducts = [
    {
      productId: 1,
      name: "Sofa",
      size: 'Two Seater', // ✅ Sofa type
      dimension: '200x100x80 cm', // ✅ Dimension
      color: 'grey',
      quantity: 1,
      price: 499.99,
      image: 'https://picsum.photos/200?random=1'
    },
    {
      productId: 2,
      name: "Chair",
      size: 'Single Seater',
      dimension: '100x100x80 cm',
      color: 'black',
      quantity: 2,
      price: 199.99,
      image: 'https://picsum.photos/200?random=2'
    },
    {
      productId: 3,
      name: "Table",
      size: 'Standard',
      dimension: '150x90x75 cm',
      color: 'brown',
      quantity: 1,
      price: 299.99,
      image: 'https://picsum.photos/200?random=3'
    }
  ];

  return (
    <>
      {cartProducts.map((product) => (
        <div key={product.productId} className='flex items-start justify-between py-4 border-b'>
          {/* Product Image and Info */}
          <div className='flex items-start'>
            <img 
              src={product.image} 
              alt={product.name} 
              className='w-20 h-24 object-cover mr-4 rounded' 
            />
            <div>
              <h3 className='font-medium text-gray-800'>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                Size: {product.size} | Dimension: {product.dimension} | Color: {product.color}
              </p>
              {/* Quantity Controls */}
              <div className='flex items-center mt-2'>
                <button className='border rounded px-2 py-1 text-lg font-medium'>-</button>
                <span className='mx-4'>{product.quantity}</span>
                <button className='border rounded px-2 py-1 text-lg font-medium'>+</button>
              </div>
            </div>
          </div>

          {/* Price and Delete */}
          <div className='flex flex-col items-end'>
            <p className='font-semibold'>${product.price.toLocaleString()}</p>
            <button className='mt-2'>
              <RiDeleteBin6Line className='h-6 w-6 text-red-500 hover:text-red-600 transition' />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CartContent;
