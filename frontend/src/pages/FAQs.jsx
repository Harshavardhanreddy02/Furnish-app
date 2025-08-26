import React from 'react'

function FAQs() {
  const faqs = [
    { q: 'What is the delivery time?', a: 'Orders are delivered within 5–10 working days depending on your location.' },
    { q: 'Do you offer installation?', a: 'Yes, professional installation is available in most cities.' },
    { q: 'What is your return policy?', a: 'Unused items in original packaging can be returned within 7 days of delivery.' },
    { q: 'How do I track my order?', a: 'Use the Order ID on the Track Order section or visit My Orders.' },
  ]
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4 text-gray-800'>FAQs</h1>
      <div className='space-y-4'>
        {faqs.map((item, idx) => (
          <div key={idx} className='bg-white p-4 rounded shadow'>
            <h3 className='font-semibold text-gray-800'>{item.q}</h3>
            <p className='text-gray-600 mt-1'>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQs
