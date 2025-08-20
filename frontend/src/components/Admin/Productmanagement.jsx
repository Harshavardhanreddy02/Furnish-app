import React from 'react';
import { Link } from 'react-router-dom';

function ProductManagement() {
  const products = [
    {
      _id: 101,
      name: "Modern Sofa",
      price: 499,
      sku: "SOF101",
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      _id: 102,
      name: "Dining Chair",
      price: 149,
      sku: "CHA102",
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      _id: 103,
      name: "Coffee Table",
      price: 249,
      sku: "TAB103",
      image: "https://picsum.photos/100/100?random=3",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleted:", id);
    }
  };

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
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className='border-b hover:bg-gray-50'>
                  <td className='p-4'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                  </td>
                  <td className='p-4 font-medium text-gray-900'>{product.name}</td>
                  <td className='p-4'>${product.price}</td>
                  <td className='p-4'>{product.sku}</td>
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
              ))
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
