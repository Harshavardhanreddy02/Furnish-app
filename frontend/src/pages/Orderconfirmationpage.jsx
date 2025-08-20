import React from 'react';

function OrderConfirmationPage() {
  const checkout = [
    {
      productId: 1,
      name: "Modern Sofa",
      color: "Beige",
      size: "3-Seater",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: 2,
      name: "Dining Table",
      color: "Walnut",
      size: "6-Seater",
      price: 100,
      quantity: 2,
      image: "https://picsum.photos/150?random=2",
    }
  ];

  const shippingAddress = {
    address: "123, kerala",
    city: "New York",
    country: "USA",
  };

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You for Your Order!
      </h1>

      <div className='p-6 rounded-lg border shadow'>
        <div className='flex justify-between mb-10'>
          <div>
            <h2 className='text-xl font-semibold'>
              Order Id: #123456
            </h2>
            <p className='text-gray-500'>
              Order Date: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className='text-emerald-700 text-sm font-medium'>
            Estimated Delivery: {calculateEstimatedDelivery(new Date())}
          </div>
        </div>

        <div className='mb-10 space-y-4'>
          {checkout.map((item) => (
            <div key={item.productId} className='flex items-center border-b pb-4'>
              <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4' />
              <div>
                <h4 className='text-md font-semibold'>
                  {item.name}
                </h4>
                <p className='text-sm text-gray-500'>
                  {item.color} | {item.size}
                </p>
              </div>
              <div className='ml-auto text-right'>
                <p className='text-md'>
                  ₹{item.price}
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
              Pay by Razorpay
            </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-2'>
              Delivery
            </h4>
            <p className='text-gray-700'>
              {shippingAddress.address}
            </p>
            <p className='text-gray-700'>
              {shippingAddress.city}, {shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
