// File: src/components/RazorpayButton.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function RazorpayButton({ amount, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const loadRazorpay = () => {
    setLoading(true);
    
    // Check if Razorpay script already exists
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      launchRazorpay();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      setLoading(false);
      onError("Failed to load Razorpay");
    };
    script.onload = launchRazorpay;
    document.body.appendChild(script);
  };

  const launchRazorpay = () => {
    try {
      const options = {
        key:"rzp_test_R7BRUCypYOHKZv", // Use environment variable
        amount: Math.round(amount * 100), // Razorpay expects amount in paise, ensure it's an integer
        currency: "INR",
        name: "UrbanWood Furniture",
        description: "Purchase from UrbanWood",
        image: "https://via.placeholder.com/150x50/000000/FFFFFF?text=UrbanWood", // Placeholder logo
        handler: (response) => {
          setLoading(false);
          onSuccess(response);
        },
        prefill: {
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        },
        method: {
          upi: true,
          netbanking: true,
          card: true,
          wallet: true,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', (response) => {
        setLoading(false);
        onError(response.error.description || "Payment failed");
      });
      paymentObject.open();
    } catch (error) {
      setLoading(false);
      onError("Failed to initialize payment");
      console.error("Razorpay error:", error);
    }
  };

  return (
    <button
      onClick={loadRazorpay}
      disabled={loading}
      className={`w-full font-semibold py-3 rounded-xl transition duration-300 ${
        loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 text-white'
      }`}
    >
      {loading ? 'Loading...' : 'Pay via UPI'}
    </button>
  );
}

export default RazorpayButton;
