import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchorderdetails } from '../redux/Slices/orderSlice';

function Orderdetailspage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderdetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchorderdetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <div className='text-center py-8'>
          <p className='text-lg text-gray-600'>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <div className='text-center py-8'>
          <p className='text-lg text-red-600'>Error: {error}</p>
          <button 
            onClick={() => dispatch(fetchorderdetails(id))}
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!orderdetails) {
    return (
      <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <div className='text-center py-8'>
          <p className='text-lg text-gray-600'>No order details found.</p>
          <Link 
            to='/my-orders'
            className='mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!orderdetails?.orderitems) return 0;
    return orderdetails.orderitems.reduce(
      (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 0),
      0
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date',error;
    }
  };

  const status = (orderdetails.status || '').toLowerCase()
  const statusLabel = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Processing'
  const statusClasses = status === 'cancelled'
    ? 'bg-red-100 text-red-700'
    : status === 'delivered'
      ? 'bg-green-100 text-green-700'
      : status === 'shipped'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-yellow-100 text-yellow-700'

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>

      <div className='p-4 sm:p-6 rounded-lg border bg-white shadow-sm'>
        {/* Order Header */}
        <div className='flex flex-col sm:flex-row justify-between mb-8'>
          <div>
            <h3 className='text-lg md:text-xl font-semibold'>
              Order ID: #{orderdetails._id ? orderdetails._id.slice(-8) : 'N/A'}
            </h3>
            <p className='text-gray-600'>
              {formatDate(orderdetails.createdAt)}
            </p>
          </div>
          <div className='flex flex-col sm:items-end mt-4 sm:mt-0'>
            <span
              className={`${orderdetails.ispaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {orderdetails.ispaid ? 'Paid' : 'Pending Payment'}
            </span>
            <span
              className={`${orderdetails.isdelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {orderdetails.isdelivered ? 'Delivered' : 'Pending Delivery'}
            </span>
            <span
              className={`${statusClasses} px-3 py-1 rounded-full text-sm font-medium`}
            >
              Status: {statusLabel}
            </span>
          </div>
        </div>

        {/* Payment & Shipping Info */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
            <p>Payment Method: {orderdetails.paymentmethod || 'Not specified'}</p>
            <p>Status: {orderdetails.ispaid ? 'Paid' : 'Unpaid'}</p>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
            <p>Shipping Method: {orderdetails.shippingmethod || 'Standard'}</p>
            {orderdetails.shippingaddress ? (
              <p>
                Address: {`${orderdetails.shippingaddress.city || 'N/A'}, ${orderdetails.shippingaddress.country || 'N/A'}`}
              </p>
            ) : (
              <p>Address: Not available</p>
            )}
          </div>

          <div className='hidden md:block'>
            <h4 className='text-lg font-semibold mb-2'>Order Summary</h4>
            <p className='text-gray-700 font-medium'>
              Total Products: {orderdetails.orderitems ? orderdetails.orderitems.length : 0}
            </p>
            <p className='text-gray-900 font-bold mt-2'>
              Total Amount: ₹{calculateTotal().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Products Table */}
        {orderdetails.orderitems && orderdetails.orderitems.length > 0 ? (
          <div className='overflow-x-auto mb-6'>
            <h4 className='text-lg font-semibold mb-4'>Furniture Items</h4>
            <table className='min-w-full text-gray-600 border border-gray-200 rounded-lg overflow-hidden'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='py-3 px-4 text-left font-medium text-gray-700'>Item</th>
                  <th className='py-3 px-4 text-left font-medium text-gray-700'>Unit Price</th>
                  <th className='py-3 px-4 text-left font-medium text-gray-700'>Quantity</th>
                  <th className='py-3 px-4 text-left font-medium text-gray-700'>Total</th>
                  <th className='py-3 px-4 text-left font-medium text-gray-700'>Color / Size</th>
                </tr>
              </thead>
              <tbody>
                {orderdetails.orderitems.map((item, index) => (
                  <tr key={item.productid || index} className='border-b border-gray-100 hover:bg-gray-50'>
                    <td className='py-4 px-4'>
                      <div className='flex items-center'>
                        {item.images || item.image ? (
                          <img
                            src={item.images || item.image}
                            alt={item.name || 'Product'}
                            className='w-16 h-16 object-cover rounded-lg mr-4 border border-gray-200'
                          />
                        ) : (
                          <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4 border border-gray-200'>
                            <span className='text-gray-500 text-xs'>No Image</span>
                          </div>
                        )}
                        <Link
                          to={`/product/${item.productid}`}
                          className='text-blue-600 hover:text-blue-800 hover:underline font-medium'
                        >
                          {item.name || 'Product Name Not Available'}
                        </Link>
                      </div>
                    </td>
                    <td className='py-4 px-4 font-medium'>
                      ₹{Number(item.price || 0).toLocaleString()}
                    </td>
                    <td className='py-4 px-4'>{item.quantity || 0}</td>
                    <td className='py-4 px-4 font-semibold'>
                      ₹{(Number(item.price || 0) * (item.quantity || 0)).toLocaleString()}
                    </td>
                    <td className='py-4 px-4 text-gray-700'>
                      {item.colors || item.color || 'N/A'} | {item.sizes || item.size || 'N/A'}
                    </td>
                  </tr>
                ))}
                
                {/* Summary Row */}
                <tr className='bg-gray-50 border-t-2 border-gray-200'>
                  <td colSpan={4} className='py-3 px-4 text-right font-medium text-gray-700'>
                    Subtotal:
                  </td>
                  <td className='py-3 px-4 font-semibold text-gray-900'>
                    ₹{calculateTotal().toLocaleString()}
                  </td>
                </tr>
                
                {/* Shipping Row */}
                <tr className='bg-gray-50'>
                  <td colSpan={4} className='py-3 px-4 text-right font-medium text-gray-700'>
                    Shipping:
                  </td>
                  <td className='py-3 px-4 font-semibold text-gray-900'>
                    ₹100.0
                  </td>
                </tr>
                
                {/* Tax Row */}
                <tr className='bg-gray-50'>
                  <td colSpan={4} className='py-3 px-4 text-right font-medium text-gray-700'>
                    Tax (GST):
                  </td>
                  <td className='py-3 px-4 font-semibold text-gray-900'>
                    ₹{(calculateTotal() * 0.18).toFixed(2)}
                  </td>
                </tr>
                
                {/* Total Row */}
                <tr className='bg-blue-50 border-t-2 border-blue-200'>
                  <td colSpan={4} className='py-4 px-4 text-right font-bold text-lg text-blue-900'>
                    Total Amount:
                  </td>
                  <td className='py-4 px-4 font-bold text-lg text-blue-900'>
                    ₹{(calculateTotal() * 1.18 + 100).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
            <p className='text-gray-600 text-center'>No items found in this order.</p>
          </div>
        )}

        {/* Total for Mobile */}
        <div className='md:hidden text-right font-semibold text-lg mb-4'>
          Total: ₹{calculateTotal().toLocaleString()}
        </div>

        <Link
          to='/my-orders'
          className='text-blue-500 hover:underline font-medium'
        >
          &larr; Back to orders
        </Link>
      </div>
    </div>
  );
}

export default Orderdetailspage;
