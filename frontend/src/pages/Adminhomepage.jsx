import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchadminproducts } from '../redux/Slices/adminproductSlice';
import { fetchallorders } from '../redux/Slices/adminorderSlice';
import { useEffect } from 'react';

function AdminHomepage() {

  const dispatch = useDispatch()
  const {products,loading,productsloading,productserror} = useSelector((state) => state.adminproducts) 
  const {orders,totalorder,totalsales,loading:ordersloading,error:orderserror} = useSelector((state) => state.adminorders)

  useEffect(() => {
      dispatch(fetchadminproducts())
      dispatch(fetchallorders())
  },[dispatch])

  const isLoading = productsloading || ordersloading || loading
  const hasError = productserror || orderserror

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Furnish Store Admin Dashboard</h1>

      {isLoading && (<p>Loading...</p>)}
      {!isLoading && hasError && (
        <div className='space-y-2'>
          {productserror && <p className='text-red-500'>Error fetching products: {String(productserror)}</p>}
          {orderserror && <p className='text-red-500'>Error fetching orders: {String(orderserror)}</p>}
        </div>
      )}

      {!isLoading && !hasError && (
      <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 shadow-md rounded-lg bg-white">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Revenue</h2>
          <p className="text-2xl text-gray-900">₹{Number(totalsales || 0).toLocaleString()}</p>
        </div>

        <div className="p-6 shadow-md rounded-lg bg-white">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Orders</h2>
          <p className="text-2xl text-gray-900">{Number(totalorder || orders?.length || 0)}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            Manage Orders
          </Link>
        </div>

        <div className="p-6 shadow-md rounded-lg bg-white">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Products</h2>
          <p className="text-2xl text-gray-900">{products?.length || 0}</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Furniture Orders</h2>
        <div className="overflow-x-auto rounded shadow-sm">
          <table className="min-w-full text-left text-sm text-gray-600 bg-white">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="p-4">{order.user?.name || 'N/A'}</td>
                    <td className="p-4">₹{Number(order.totalprice || order.totalPrice || 0).toLocaleString()}</td>
                    <td className="p-4 capitalize">{order.status || (order.ispaid ? 'paid' : 'pending')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No recent furniture orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default AdminHomepage;
