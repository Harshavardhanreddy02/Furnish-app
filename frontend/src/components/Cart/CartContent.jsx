import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removefromcart, updatecartitemquantity, fetchcart } from '../../redux/Slices/cartSlice';

function CartContent({ cart, userid, guestid }) {
  const dispatch = useDispatch();

  const handleaddtocart = (productid, delta, quantity, sizes, colors, dimensions) => {
    const newquantity = quantity + delta;
    if (newquantity >= 1) {
      dispatch(updatecartitemquantity({
        productid,
        quantity: newquantity,
        guestid,
        userid,
        sizes,
        colors,
        dimensions
      })).then(() => {
        dispatch(fetchcart({ userid, guestid }))
      });
    }
  };

  const handleremovefromcart = (productid, sizes, colors, dimensions) => {
    dispatch(removefromcart({ productid, guestid, userid, sizes, colors, dimensions }))
      .then(() => {
        dispatch(fetchcart({ userid, guestid }))
      });
  };

  return (
    <>
      {cart.products.map((product) => (
        <div key={`${product.productid}-${product.sizes}-${product.colors}-${JSON.stringify(product.dimensions)}`} className='flex items-start justify-between py-4 border-b'>
          {/* Product Image and Info */}
          <div className='flex items-start'>
            <img 
              src={product.images} 
              alt={product.name} 
              className='w-20 h-24 object-cover mr-4 rounded' 
            />
            <div>
              <h3 className='font-medium text-gray-800'>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                Size: {product.sizes || 'N/A'} | Color: {product.colors || 'N/A'}
              </p>
              {/* Quantity Controls */}
              <div className='flex items-center mt-2'>
                <button 
                  onClick={() => handleaddtocart(product.productid, -1, product.quantity, product.sizes, product.colors, product.dimensions)} 
                  className='border rounded px-2 py-1 text-lg font-medium'
                >-</button>
                <span className='mx-4'>{product.quantity}</span>
                <button 
                  onClick={() => handleaddtocart(product.productid, 1, product.quantity, product.sizes, product.colors, product.dimensions)} 
                  className='border rounded px-2 py-1 text-lg font-medium'
                >+</button>
              </div>
            </div>
          </div>

          {/* Price and Delete */}
          <div className='flex flex-col items-end'>
            <p className='font-semibold'>${product.price.toLocaleString()}</p>
            <button 
              className='mt-2' 
              onClick={() => handleremovefromcart(product.productid, product.sizes, product.colors, product.dimensions)}
            >
              <RiDeleteBin6Line className='h-6 w-6 text-red-500 hover:text-red-600 transition' />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CartContent;