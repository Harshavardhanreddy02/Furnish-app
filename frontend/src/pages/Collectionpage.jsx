import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import {FaFilter} from 'react-icons/fa'
import Filtersidebar from '../components/Products/Filtersidebar'
import Sortoption from '../components/Products/Sortoption'
import Productgrid from '../components/Products/Produtgrid'
function Collectionpage() {

     const [products, setProducts] = useState([])
     const sidebarref = useRef(null)
     const [issidebaropen, setissidebaropen] = useState(false)

     const toggleSidebar = () => {
          setissidebaropen(!issidebaropen)
     }
     useEffect(() => {
  const handleClickOutside = (e) => {
    if (sidebarref.current && !sidebarref.current.contains(e.target)) {
      setissidebaropen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


     useEffect(() =>{
          setTimeout(() => {
               const fetchproducts = [
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

          setProducts(fetchproducts)
     }, 1000)
  }, [])

  return (
    <>
     <div className='flex flex-col lg:flex-row '>
          <button className='lg:hidden border p-2 flex justify-center items-center ' onClick={toggleSidebar}>
               <FaFilter  className='mr-2 '/>Filters
          </button>
          <div  ref={sidebarref} className={`${issidebaropen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
               <Filtersidebar />

          </div>
          <div className='flex-grow p-4 '>
               <h2 className='text-2xl uppercase mb-4'>
                   All collections
               </h2>
               <Sortoption />

               <Productgrid products={products} />

          </div>

     </div>
    </>
  )
}

export default Collectionpage