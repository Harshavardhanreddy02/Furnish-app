import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {deleteproduct, fetchadminproducts} from '../../redux/Slices/adminproductSlice'

function ProductManagement() {
 
  const dispatch = useDispatch()
  const {products,loading,error} = useSelector((state) => state.adminproducts)

  useEffect(() =>
  {
      dispatch(fetchadminproducts())
  },[dispatch])
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
     dispatch(deleteproduct(id))
    }
  };
  if(loading)
  {
    return <p>Loading ..</p>

  }
  if(error)
  {
    return <p>Error:{String(error)}</p>
  }

  const getImageSrc = (images) => {
    if (!images) return ''
    // images could be array of objects [{url, altText}], array of strings, or a single string
    if (Array.isArray(images)) {
      if (images.length === 0) return ''
      const first = images[0]
      if (first && typeof first === 'object' && first.url) return first.url
      if (typeof first === 'string') return first
      return ''
    }
    if (typeof images === 'object' && images.url) return images.url
    if (typeof images === 'string') return images
    return ''
  }

  const placeholder = 'https://via.placeholder.com/64?text=Img'

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>
        Furniture Product Management
      </h2>

      <div className='overflow-x-auto bg-white shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-sm text-gray-700'>
          <thead className='bg-gray-100 text-xs uppercase'>
            <tr>
              <th className='py-3 px-4'>Image</th>
              <th className='py-3 px-4'>Name</th>
              <th className='py-3 px-4'>Price</th>
              <th className='py-3 px-4'>SKU</th>
              <th className='py-3 px-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => {
                const src = getImageSrc(product.images) || placeholder
                return (
                <tr key={product._id} className='border-b hover:bg-gray-50'>
                  <td className='p-4'>
                    <img
                      src={src}
                      alt={product.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                  </td>
                  <td className='p-4 font-medium text-gray-900'>{product.name}</td>
                  <td className='p-4'>₹{Number(product.price || 0).toLocaleString()}</td>
                  <td className='p-4'>{product.sku || '-'}</td>
                  <td className='p-4 flex gap-2'>
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )})
            ) : (
              <tr>
                <td colSpan={5} className='p-4 text-center text-gray-500'>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
