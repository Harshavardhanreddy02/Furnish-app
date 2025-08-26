import React from 'react'
import { FiTruck, FiShield, FiRefreshCw, FiAward } from 'react-icons/fi'

function Features() {
  const features = [
    { icon: <FiTruck />, title: 'Fast Delivery', desc: 'Quick, reliable shipping right to your home.' },
    { icon: <FiShield />, title: 'Secure Payments', desc: 'Multiple safe payment options with encryption.' },
    { icon: <FiRefreshCw />, title: 'Easy Returns', desc: 'Hassle-free returns within 7 days of delivery.' },
    { icon: <FiAward />, title: 'Quality Guaranteed', desc: 'Premium materials and craftsmanship.' },
  ]
  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Features</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {features.map((f, idx) => (
          <div key={idx} className='bg-white p-6 rounded shadow flex items-start space-x-3'>
            <div className='text-xl text-gray-700'>{f.icon}</div>
            <div>
              <h3 className='font-semibold text-gray-800'>{f.title}</h3>
              <p className='text-gray-600'>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
