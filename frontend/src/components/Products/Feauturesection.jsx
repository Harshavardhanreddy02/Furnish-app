import React from 'react'
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi'
import { HiArrowPathRoundedSquare } from 'react-icons/hi2'

function FeatureSection() {
  return (
    <section className='py-16 px-4 bg-white'>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Free Shipping */}
        <div className="flex flex-col items-center">
          <div className='p-4 rounded-full mb-4'>
            <HiShoppingBag className='text-xl' />
          </div>
          <h4 className='tracking-tighter mb-2'>
            Free International Shipping
          </h4>
          <p className='text-gray-600 text-sm tracking-tighter'>
            Enjoy free international shipping on all furniture orders over ₹5000.
          </p>
        </div>

        {/* Free Returns */}
        <div className="flex flex-col items-center">
          <div className='p-4 rounded-full mb-4'>
            <HiArrowPathRoundedSquare className='text-xl' />
          </div>
          <h4 className='tracking-tighter mb-2'>
            Easy Returns
          </h4>
          <p className='text-gray-600 text-sm tracking-tighter'>
            Hassle-free furniture returns within 7 days.
          </p>
        </div>

        {/* Secure Payment */}
        <div className="flex flex-col items-center">
          <div className='p-4 rounded-full mb-4'>
            <HiOutlineCreditCard className='text-xl' />
          </div>
          <h4 className='tracking-tighter mb-2'>
            Secure Payment Options
          </h4>
          <p className='text-gray-600 text-sm tracking-tighter'>
            We accept all major credit cards, UPI, and Rozopay.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection;
