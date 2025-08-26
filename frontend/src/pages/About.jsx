import React from 'react'

function About() {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4 text-gray-800'>About Us</h1>
      <p className='text-gray-600 mb-6'>Furnish Store brings high-quality, thoughtfully designed furniture to your home. We believe great design should be accessible, durable, and sustainable.</p>
      <h2 className='text-xl font-semibold mb-2'>Our Mission</h2>
      <p className='text-gray-600 mb-6'>To create modern furniture that blends comfort, functionality, and style—crafted to last, priced fairly.</p>
      <h2 className='text-xl font-semibold mb-2'>Why Choose Us</h2>
      <ul className='list-disc pl-6 text-gray-600 space-y-2'>
        <li>Premium materials and craftsmanship</li>
        <li>Honest pricing and regular offers</li>
        <li>Fast, reliable shipping and setup</li>
        <li>Dedicated customer support</li>
      </ul>
    </div>
  )
}

export default About
