import React, { useRef, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Filtersidebar from '../components/Products/Filtersidebar';
import Sortoption from '../components/Products/Sortoption';
import Productgrid from '../components/Products/Produtgrid';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproductbyfilters } from '../redux/Slices/productSlice';

function Collectionpage() {
  const [searchparams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const queryparams = Object.fromEntries([...searchparams]);
  const collections = queryparams.collections || 'all';

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchproductbyfilters({ collections, ...queryparams }));
  }, [dispatch, collections, searchparams]);

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

  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        <button
          className='lg:hidden border p-2 flex justify-center items-center'
          onClick={toggleSidebar}
        >
          <FaFilter className='mr-2' />
          Filters
        </button>

        <div
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <Filtersidebar />
        </div>

        <div className='flex-grow p-4'>
          <h2 className='text-2xl uppercase mb-4'>{collections} Collection</h2>
          <Sortoption />
          <Productgrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </>
  );
}

export default Collectionpage;
