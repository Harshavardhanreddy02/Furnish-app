import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from './RazorpayButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/Slices/checkoutSlice';
import axios from 'axios';
import { toast } from 'sonner';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutid, setcheckoutid] = useState(null);
  const [shippingaddress, setshippingaddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handlecreatecheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      try {
        // Format checkout items to match backend model
        const checkoutitems = cart.products.map(item => ({
          productid: item.productid,
          name: item.name,
          images: item.images || item.image,
          price: Number(item.price),
          quantity: item.quantity,
          sizes: item.sizes || item.size || 'Standard',
          colors: item.colors || item.color || 'Standard'
        }));

        const res = await dispatch(createCheckout({
          checkoutitems,
          shippingaddress: {
            address: shippingaddress.address,
            city: shippingaddress.city,
            postalcode: shippingaddress.postalcode,
            country: shippingaddress.country,
          },
          paymentmethod: "Razorpay",
          totalprice: Number(cart.totalprice),
        })).unwrap();
        
        if (res && res._id) {
          setcheckoutid(res._id);
          toast.success('Checkout created successfully!');
        }
      } catch (err) {
        toast.error('Failed to create checkout');
        console.error(err);
      }
    }
  };

  const handlepaymentsuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/pay`,
        {
          paymentstatus: "paid",
          paymentdetails: details
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('usertoken')}`
          }
        }
      );
      
      if (response.status === 200) {
        await handlefinalizecheckout(checkoutid);
      } else {
        console.error('Payment update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment processing failed');
    }
  };

  const handlefinalizecheckout = async (checkoutid) => {
    try {
      console.log('Finalizing checkout with ID:', checkoutid);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('usertoken')}`
          }
        }
      );
      
      console.log('Finalize response:', response.data);
      
      if (response.status === 200 || response.status === 201) {
        // Persist latest order for refresh/redirects and pass via state
        localStorage.setItem('lastOrder', JSON.stringify(response.data));
        toast.success('Order placed successfully!');
        navigate('/order-confirmation', { state: { orderData: response.data } });
      } else {
        console.error('Order finalization failed with status:', response.status);
        toast.error('Failed to finalize order');
      }
    } catch (error) {
      console.error('Finalize checkout error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to finalize order');
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-600">Error: {error}</p>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p className="text-center py-8">Your cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-12 px-6 tracking-tight">
      {/* Shipping Form */}
      <div className="bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-3xl font-bold uppercase mb-8 tracking-wide">Checkout</h2>
        <form onSubmit={handlecreatecheckout}>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Details</h3>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={user ? user.email : ''}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <input 
              type="text" 
              required 
              placeholder="First Name" 
              value={shippingaddress.firstname} 
              onChange={(e) => setshippingaddress({ ...shippingaddress, firstname: e.target.value })} 
              className="w-full p-3 border rounded-lg" 
            />
            <input 
              type="text" 
              required 
              placeholder="Last Name" 
              value={shippingaddress.lastname} 
              onChange={(e) => setshippingaddress({ ...shippingaddress, lastname: e.target.value })} 
              className="w-full p-3 border rounded-lg" 
            />
          </div>
          <input 
            type="text" 
            required 
            placeholder="Address" 
            value={shippingaddress.address} 
            onChange={(e) => setshippingaddress({ ...shippingaddress, address: e.target.value })} 
            className="w-full mb-4 p-3 border rounded-lg" 
          />
          <div className="mb-4 grid grid-cols-2 gap-4">
            <input 
              type="text" 
              required 
              placeholder="City" 
              value={shippingaddress.city} 
              onChange={(e) => setshippingaddress({ ...shippingaddress, city: e.target.value })} 
              className="w-full p-3 border rounded-lg" 
            />
            <input 
              type="text" 
              required 
              placeholder="Postal Code" 
              value={shippingaddress.postalcode} 
              onChange={(e) => setshippingaddress({ ...shippingaddress, postalcode: e.target.value })} 
              className="w-full p-3 border rounded-lg" 
            />
          </div>
          <input 
            type="text" 
            required 
            placeholder="Country" 
            value={shippingaddress.country} 
            onChange={(e) => setshippingaddress({ ...shippingaddress, country: e.target.value })} 
            className="w-full mb-4 p-3 border rounded-lg" 
          />
          <input 
            type="tel" 
            required 
            placeholder="Phone" 
            value={shippingaddress.phone} 
            onChange={(e) => setshippingaddress({ ...shippingaddress, phone: e.target.value })} 
            className="w-full mb-6 p-3 border rounded-lg" 
          />

          {!checkoutid ? (
            <button type="submit" className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition">
              Continue to Payment
            </button>
          ) : (
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Pay with UPI</h3>
              <RazorpayButton
                amount={cart.totalprice}
                onSuccess={handlepaymentsuccess}
                onError={() => toast.error("Payment failed")}
              />
            </div>
          )}
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-10 h-fit">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

        <div className="space-y-6">
          {cart.products.map((item, i) => (
            <div key={i} className="flex items-center gap-4 border-b pb-4">
              <img
                src={item.images || item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  Size: {item.sizes} | Color: {item.colors}
                </p>
                <p className="text-base font-semibold mt-1 text-gray-800">
                  ₹{Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6" />

        {/* Pricing Breakdown */}
        <div className="space-y-3 text-gray-800">
          <div className="flex justify-between text-base">
            <span>Subtotal</span>
            <span>₹{Number(cart.totalprice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span>Shipping</span>
            <span className="text-green-700 font-medium">₹100.00</span>
          </div>
          <div className="flex justify-between text-base">
            <span>GST (18%)</span>
            <span>₹{(Number(cart.totalprice) * 0.18).toFixed(2)}</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold text-xl text-gray-900">
          <span>Total:</span>
          <span>₹{(Number(cart.totalprice) + 100 + (Number(cart.totalprice) * 0.18)).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

