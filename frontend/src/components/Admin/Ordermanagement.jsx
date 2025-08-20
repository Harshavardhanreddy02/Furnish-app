import React, { useState } from 'react';

function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      _id: 1234,
      user: { name: 'John Doe' },
      totalprice: 11000, // Furniture price in ₹
      status: 'processing',
    },
    {
      _id: 1235,
      user: { name: 'Jane Smith' },
      totalprice: 21000,
      status: 'shipped',
    },
  ]);

  // Update order status
  const handleStatusChange = (orderId, status) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    console.log({ id: orderId, status }); // Simulate API call
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Furniture Orders Management
      </h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">₹{order.totalprice}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, 'delivered')}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No furniture orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
