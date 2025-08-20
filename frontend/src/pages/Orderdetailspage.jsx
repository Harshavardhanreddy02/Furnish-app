import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Orderdetailspage() {
  const { id } = useParams();
  const [orderdetails, setorderdetails] = useState(null);

  useEffect(() => {
    // Mock furniture order data
    const mockdetails = {
      _id: id,
      createdAt: new Date(),
      ispaid: true,
      isdelivered: true,
      paymentmethod: 'Razorpay',
      shippingmethod: 'Standard',
      shippingaddress: { city: 'New York', country: 'USA' },
      orderitems: [
        {
          productid: '1',
          name: 'Modern Sofa',
          price: '499.99',
          quantity: 1,
          color: 'Grey',
          dimension: '200x90x80 cm',
          image: 'https://picsum.photos/150?random=1',
        },
        {
          productid: '2',
          name: 'Dining Chair Set (2 pcs)',
          price: '199.99',
          quantity: 1,
          color: 'Black',
          dimension: '50x50x90 cm',
          image: 'https://picsum.photos/150?random=2',
        },
        {
          productid: '3',
          name: 'Wooden Coffee Table',
          price: '299.99',
          quantity: 1,
          color: 'Brown',
          dimension: '120x60x45 cm',
          image: 'https://picsum.photos/150?random=3',
        },
      ],
    };
    setorderdetails(mockdetails);
  }, [id]);

  const calculateTotal = () =>
    orderdetails?.orderitems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>

      {!orderdetails ? (
        <p>Loading order details...</p>
      ) : (
        <div className='p-4 sm:p-6 rounded-lg border bg-white shadow-sm'>
          {/* Order Header */}
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div>
              <h3 className='text-lg md:text-xl font-semibold'>
                Order ID: #{orderdetails._id}
              </h3>
              <p className='text-gray-600'>
                {new Date(orderdetails.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className='flex flex-col sm:items-end mt-4 sm:mt-0'>
              <span
                className={`${
                  orderdetails.ispaid
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderdetails.ispaid ? 'Paid' : 'Pending'}
              </span>
              <span
                className={`${
                  orderdetails.isdelivered
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderdetails.isdelivered ? 'Delivered' : 'Pending Delivery'}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
              <p>Payment Method: {orderdetails.paymentmethod}</p>
              <p>Status: {orderdetails.ispaid ? 'Paid' : 'Unpaid'}</p>
            </div>

            <div>
              <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
              <p>Shipping Method: {orderdetails.shippingmethod}</p>
              <p>
                Address: {`${orderdetails.shippingaddress.city}, ${orderdetails.shippingaddress.country}`}
              </p>
            </div>

            <div className='hidden md:block'>
              <h4 className='text-lg font-semibold mb-2'>Order Summary</h4>
              <p className='text-gray-700 font-medium'>
                Total Products: {orderdetails.orderitems.length}
              </p>
              <p className='text-gray-900 font-bold mt-2'>
                Total Amount: ${calculateTotal().toLocaleString()}
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className='overflow-x-auto mb-6'>
            <h4 className='text-lg font-semibold mb-4'>Furniture Items</h4>
            <table className='min-w-full text-gray-600 border'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='py-2 px-4 text-left'>Item</th>
                  <th className='py-2 px-4'>Unit Price</th>
                  <th className='py-2 px-4'>Quantity</th>
                  <th className='py-2 px-4'>Total</th>
                  <th className='py-2 px-4'>Color / Dimension</th>
                </tr>
              </thead>
              <tbody>
                {orderdetails.orderitems.map((item) => (
                  <tr key={item.productid} className='border-b'>
                    <td className='py-2 px-4 flex items-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-12 h-12 object-cover rounded-lg mr-4'
                      />
                      <Link
                        to={`/product/${item.productid}`}
                        className='text-blue-500 hover:underline'
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className='py-2 px-4'>
                      ${parseFloat(item.price).toLocaleString()}
                    </td>
                    <td className='py-2 px-4'>{item.quantity}</td>
                    <td className='py-2 px-4'>
                      ${(parseFloat(item.price) * item.quantity).toLocaleString()}
                    </td>
                    <td className='py-2 px-4'>
                      {item.color} | {item.dimension}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total for Mobile */}
          <div className='md:hidden text-right font-semibold text-lg mb-4'>
            Total: ${calculateTotal().toLocaleString()}
          </div>

          <Link
            to='/my-orders'
            className='text-blue-500 hover:underline font-medium'
          >
            &larr; Back to orders
          </Link>
        </div>
      )}
    </div>
  );
}

export default Orderdetailspage;
