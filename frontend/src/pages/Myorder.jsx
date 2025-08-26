import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchuserorders } from '../redux/Slices/orderSlice';

function Myorder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchuserorders());
  }, [dispatch]);

  const handlerowclick = (orderid) => {
    navigate(`/order/${orderid}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="text-center py-8">
          <p className="text-lg text-red-600">Error: {error}</p>
          <button 
            onClick={() => dispatch(fetchuserorders())}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
      <div className="relative shadow-lg sm:rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-600 text-sm sm:text-base">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Shipping Address</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => {
                const firstItem = order.orderitems?.[0];
                const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
                
                return (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                    onClick={() => handlerowclick(order._id)}
                  >
                    <td className="px-6 py-4">
                      {firstItem?.images ? (
                        <img
                          src={firstItem.images}
                          alt={firstItem.name || 'Product'}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order._id ? `#${order._id.slice(-8)}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {orderDate.toLocaleDateString()}{' '}
                      {orderDate.toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      {order.shippingaddress
                        ? `${order.shippingaddress.city || 'N/A'}, ${order.shippingaddress.country || 'N/A'}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {order.orderitems ? order.orderitems.length : 0}
                    </td>
                    <td className="px-6 py-4">
                      ₹{order.totalprice ? Number(order.totalprice).toLocaleString() : '0'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${
                          order.ispaid 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        } py-1 px-3 rounded-full text-xs font-semibold`}
                      >
                        {order.ispaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-6 text-center text-gray-500 text-base">
                  <div className="py-8">
                    <p className="text-lg mb-4">You have no orders yet.</p>
                    <button 
                      onClick={() => navigate('/')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Start Shopping
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myorder;
