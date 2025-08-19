import React from 'react'
import { Link } from 'react-router-dom'

function Adminhomepage() {
  const orders = [
    {
      _id: 123,
      user: {
        name: 'John Doe',
      },
      totalPrice: 110,
      status: "processing",
    }
  ]

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        <div className='p-6 shadow-md rounded-lg bg-white'>
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>Revenue</h2>
          <p className='text-2xl text-gray-900'>$10,000</p>
        </div>

        <div className='p-6 shadow-md rounded-lg bg-white'>
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>Total Orders</h2>
          <p className='text-2xl text-gray-900'>200</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            Manage Orders
          </Link>
        </div>

        <div className='p-6 shadow-md rounded-lg bg-white'>
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>Total Products</h2>
          <p className='text-2xl text-gray-900'>100</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            Manage Products
          </Link>
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Recent Orders</h2>
        <div className='overflow-x-auto rounded shadow-sm'>
          <table className='min-w-full text-left text-sm text-gray-600 bg-white'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-600'>
              <tr>
                <th className='py-3 px-4'>User</th>
                <th className='py-3 px-4'>Total Price</th>
                <th className='py-3 px-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                    <td className='p-4'>{order.user.name}</td>
                    <td className='p-4'>${order.totalPrice}</td>
                    <td className='p-4 capitalize'>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className='p-4 text-center text-gray-500'>
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Adminhomepage
