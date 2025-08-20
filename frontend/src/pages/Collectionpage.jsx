import React, { useRef, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Filtersidebar from '../components/Products/Filtersidebar';
import Sortoption from '../components/Products/Sortoption';
import Productgrid from '../components/Products/Produtgrid';

function Collectionpage() {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        { _id: 9, name: 'Modern Sofa', price: 80, image: [{ url: 'https://picsum.photos/500/500?random=9' }] },
        { _id: 10, name: 'Dining Table', price: 90, image: [{ url: 'https://picsum.photos/500/500?random=10' }] },
        { _id: 11, name: 'Office Chair', price: 70, image: [{ url: 'https://picsum.photos/500/500?random=11' }] },
        { _id: 12, name: 'Bed Frame', price: 85, image: [{ url: 'https://picsum.photos/500/500?random=12' }] },
        { _id: 13, name: 'Bookshelf', price: 80, image: [{ url: 'https://picsum.photos/500/500?random=13' }] },
        { _id: 14, name: 'Coffee Table', price: 90, image: [{ url: 'https://picsum.photos/500/500?random=14' }] },
        { _id: 15, name: 'Wardrobe', price: 70, image: [{ url: 'https://picsum.photos/500/500?random=15' }] },
        { _id: 16, name: 'TV Stand', price: 85, image: [{ url: 'https://picsum.photos/500/500?random=16' }] },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        <button className='lg:hidden border p-2 flex justify-center items-center' onClick={toggleSidebar}>
          <FaFilter className='mr-2' />Filters
        </button>

        <div ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
          <Filtersidebar />
        </div>

        <div className='flex-grow p-4'>
          <h2 className='text-2xl uppercase mb-4'>All Collections</h2>
          <Sortoption />
          <Productgrid products={products} />
        </div>
      </div>
    </>
  );
}

export default Collectionpage;
