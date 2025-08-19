// File: src/components/RazorpayButton.js
import React from 'react';

function RazorpayButton({ amount, onSuccess, onError }) {
  const loadRazorpay = () => {
    // Check if Razorpay script already exists
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      launchRazorpay();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = onError;
    script.onload = launchRazorpay;
    document.body.appendChild(script);
  };

  const launchRazorpay = () => {
    const options = {
      key: "rzp_test_R7BRUCypYOHKZv", // ✅ Using .env variable
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "UrbanWood Furniture",
      description: "Purchase from UrbanWood",
      image: "https://yourdomain.com/logo.png", // Replace with actual logo if needed
      handler: onSuccess,
      prefill: {
        email: "user@example.com",
        contact: "6305277699",
      },
      theme: {
        color: "#000000",
      },
      method: {
        upi: true,
        netbanking: false,
        card: false,
        wallet: false,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={loadRazorpay}
      className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition duration-300"
    >
      Pay via UPI
    </button>
  );
}

export default RazorpayButton;
