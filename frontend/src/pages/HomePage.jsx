import React from 'react'
import Hero from '../components/Layout/Hero'
import Collection from '../components/Products/Collection'
import Newarrivals from '../components/Products/Newarrivals'
import Productdetails from '../components/Products/Productdetails'
import Produtgrid from '../components/Products/Produtgrid'
import Feauturecollection from '../components/Products/Feauturecollection'
import Feauturesection from '../components/Products/Feauturesection'

const placeholderproducts = [
  {
      _id: 9,
      name: 'Similar Product 9',
      price: 80,
      image: [{url:'https://picsum.photos/500/500?random=9'}],
    },
    {
      _id: 10,
      name: 'Similar Product 10',
      price: 90,
      image: [{url:'https://picsum.photos/500/500?random=10'}],
    },
    {
      _id: 11,
      name: 'Similar Product 11',
      price: 70,
      image: [{url:'https://picsum.photos/500/500?random=11'}],
    },
     {
       _id: 12,
       name: 'Similar Product 4',
       price: 85,
       image: [{url:'https://picsum.photos/500/500?random=12'}],
     },
     {
      _id: 13,
      name: 'Similar Product 13',
      price: 80,
      image: [{url:'https://picsum.photos/500/500?random=13'}],
    },
    {
      _id: 14,
      name: 'Similar Product 14',
      price: 90,
      image: [{url:'https://picsum.photos/500/500?random=14'}],
    },
    {
      _id: 15,
      name: 'Similar Product 15',
      price: 70,
      image: [{url:'https://picsum.photos/500/500?random=15'}],
    },
     {
       _id: 16,
       name: 'Similar Product 16',
       price: 85,
       image: [{url:'https://picsum.photos/500/500?random=16'}],
     }
]

function HomePage() {
  return (
    <div>

     <Hero />

     <Collection />

     <Newarrivals />

     <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
     </h2>
     <Productdetails />
     <div className="container mx-auto">
      <h2 className='text-3xl text-center font-bold mb-4'>
        Top Rated Products from our customers
      </h2>
      <Produtgrid products={placeholderproducts} />
     </div>
     <Feauturecollection />
      <Feauturesection />
    </div>
  )
}

export default HomePage