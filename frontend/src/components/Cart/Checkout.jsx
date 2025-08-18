import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paypalbutton from './Paypalbutton';

function Checkout() {
  const navigate = useNavigate();
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

  const cart = {
    products: [
      {
        name: "Stylish Jacket",
        size: "M",
        color: "black",
        price: 120,
        image: "https://picsum.photos/150?random=1",
      },
      {
        name: "Stylish Shirt",
        size: "F",
        color: "black",
        price: 12,
        image: "https://picsum.photos/150?random=2",
      }
    ],
    totalprice: 130,
  };

  const handlecreatecheckout = (e) => {
    e.preventDefault();
    setcheckoutid("dummy-checkout-id");
  };

  const handlepaymentsuccess = (details) => {
    navigate('/order-confirmation');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-12 px-6 tracking-tight">
      
      {/* Left: Shipping Form */}
      <div className="bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-3xl font-bold uppercase mb-8 tracking-wide">Checkout</h2>
        <form onSubmit={handlecreatecheckout}>
          
          {/* Contact */}
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Details</h3>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value="user@gmail.com"
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          {/* Delivery */}
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                required
                value={shippingaddress.firstname}
                onChange={(e) =>
                  setshippingaddress({ ...shippingaddress, firstname: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={shippingaddress.lastname}
                onChange={(e) =>
                  setshippingaddress({ ...shippingaddress, lastname: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Address</label>
            <input
              type="text"
              required
              value={shippingaddress.address}
              onChange={(e) =>
                setshippingaddress({ ...shippingaddress, address: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">City</label>
              <input
                type="text"
                required
                value={shippingaddress.city}
                onChange={(e) =>
                  setshippingaddress({ ...shippingaddress, city: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Postal Code</label>
              <input
                type="text"
                required
                value={shippingaddress.postalcode}
                onChange={(e) =>
                  setshippingaddress({ ...shippingaddress, postalcode: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Country</label>
            <input
              type="text"
              required
              value={shippingaddress.country}
              onChange={(e) =>
                setshippingaddress({ ...shippingaddress, country: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={shippingaddress.phone}
              onChange={(e) =>
                setshippingaddress({ ...shippingaddress, phone: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            {!checkoutid ? (
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition duration-300"
              >
                Continue to Payment
              </button>
            ) : (
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
                <Paypalbutton
                  amount={cart.totalprice}
                  onSuccess={handlepaymentsuccess}
                  onError={() => alert("Payment failed")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-10 h-fit">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
        <div className="space-y-6">
          {cart.products.map((item, i) => (
            <div key={i} className="flex items-center gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-base font-semibold mt-1 text-gray-800">₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <div className="flex justify-between font-semibold text-xl text-gray-900">
          <span>Total:</span>
          <span>₹{cart.totalprice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
