import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Myorder() {
  const [orders, setorders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      const mockorder = [
        {
          _id: '123',
          createdAt: new Date(),
          shippingaddress: { city: 'newYork', country: 'USA' },
          orderitems: [
            {
              name: 'Product 1',
              image: 'https://picsum.photos/500/500?random=17',
            },
          ],
          totalprice: 100,
          ispaid: true,
        },
        {
          _id: '1234',
          createdAt: new Date(),
          shippingaddress: { city: 'Delhi', country: 'india' },
          orderitems: [
            {
              name: 'Product 2',
              image: 'https://picsum.photos/500/500?random=18',
            },
          ],
          totalprice: 130,
          ispaid: true,
        },
        {
          _id: '122',
          createdAt: new Date(),
          shippingaddress: { city: 'sunny', country: 'moent' },
          orderitems: [
            {
              name: 'Product 3',
              image: 'https://picsum.photos/500/500?random=19',
            },
          ],
          totalprice: 190,
          ispaid: true,
        },
        {
          _id: '1239',
          createdAt: new Date(),
          shippingaddress: { city: 'pick', country: 'rak' },
          orderitems: [
            {
              name: 'Product 4',
              image: 'https://picsum.photos/500/500?random=20',
            },
          ],
          totalprice: 130,
          ispaid: true,
        },
        {
          _id: '12389',
          createdAt: new Date(),
          shippingaddress: { city: 'dei', country: 'india' },
          orderitems: [
            {
              name: 'Product 1',
              image: 'https://picsum.photos/500/500?random=21',
            },
          ],
          totalprice: 130,
          ispaid: true,
        },
      ];
      setorders(mockorder);
    }, 1000);
  }, []);

  const handlerowclick = (orderid) =>
  {
        navigate(`/order/${orderid}`)
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition duration-150 cursor-pointer" onClick={() => handlerowclick(order._id) }
                >
                  <td className="px-6 py-4">
                    <img
                      src={order.orderitems[0].image}
                      alt={order.orderitems[0].name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4">
                    {order.createdAt.toLocaleDateString()}{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    {order.shippingaddress
                      ? `${order.shippingaddress.city}, ${order.shippingaddress.country}`
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">{order.orderitems.length}</td>
                  <td className="px-6 py-4">${order.totalprice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        order.ispaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      } py-1 px-3 rounded-full text-xs font-semibold`}
                    >
                      {order.ispaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-6 text-center text-gray-500 text-base"
                >
                  You have no orders.
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
