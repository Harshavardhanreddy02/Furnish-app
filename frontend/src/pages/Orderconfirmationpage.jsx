import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearcart } from '../redux/Slices/cartSlice';
import { toast } from 'sonner';

function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  
  // const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get order data from location state or try to fetch from localStorage
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Try to get from localStorage as fallback
      const storedOrder = localStorage.getItem('lastOrder');
      if (storedOrder) {
        setOrderData(JSON.parse(storedOrder));
      } else {
        // No order data, redirect to home
        toast.error('No order data found');
        navigate('/');
        return;
      }
    }
  }, [dispatch, navigate, location.state]);

  useEffect(() => {
    // Clear cart after successful order (only when orderData changes)
    if (orderData) {
      dispatch(clearcart());
      localStorage.removeItem('cart');
      toast.success('Order placed successfully!');
    }
  }, [orderData, dispatch]);

  const calculateEstimatedDelivery = (createdAt) => {
    if (!createdAt) return 'Calculating...';
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  if (!orderData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center py-8">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You for Your Order!
      </h1>

      <div className='p-6 rounded-lg border shadow'>
        <div className='flex justify-between mb-10'>
          <div>
            <h2 className='text-xl font-semibold'>
              Order Id: #{orderData._id?.slice(-8) || 'N/A'}
            </h2>
            <p className='text-gray-500'>
              Order Date: {new Date(orderData.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
          <div className='text-emerald-700 text-sm font-medium'>
            Estimated Delivery: {calculateEstimatedDelivery(orderData.createdAt)}
          </div>
        </div>

        <div className='mb-10 space-y-4'>
          {orderData.orderitems?.map((item, index) => (
            <div key={index} className='flex items-center border-b pb-4'>
              <img 
                src={item.images || item.image} 
                alt={item.name} 
                className='w-16 h-16 object-cover rounded-md mr-4' 
              />
              <div>
                <h4 className='text-md font-semibold'>
                  {item.name}
                </h4>
                <p className='text-sm text-gray-500'>
                  {item.colors || item.color} | {item.sizes || item.size}
                </p>
              </div>
              <div className='ml-auto text-right'>
                <p className='text-md'>
                  ₹{Number(item.price).toFixed(2)}
                </p>
                <p className='text-sm text-gray-500'>
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-8 border-t pt-6'>
          <div>
            <h4 className='text-lg font-semibold mb-2'>
              Payment
            </h4>
            <p className='text-gray-700'>
              {orderData.paymentmethod || 'Razorpay'}
            </p>
            <p className='text-sm text-green-600'>
              Status: {orderData.paymentstatus || 'Paid'}
            </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-2'>
              Delivery Address
            </h4>
            {orderData.shippingaddress ? (
              <>
                <p className='text-gray-700'>
                  {orderData.shippingaddress.address}
                </p>
                <p className='text-gray-700'>
                  {orderData.shippingaddress.city}, {orderData.shippingaddress.postalcode}
                </p>
                <p className='text-gray-700'>
                  {orderData.shippingaddress.country}
                </p>
              </>
            ) : (
              <p className='text-gray-500'>Address not available</p>
            )}
          </div>
        </div>

        <div className='mt-8 pt-6 border-t'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold'>Total Amount</h3>
            <span className='text-2xl font-bold text-emerald-700'>
              ₹{Number(orderData.totalprice).toFixed(2)}
            </span>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <button
            onClick={() => navigate('/')}
            className='bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
