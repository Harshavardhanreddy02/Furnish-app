import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingCart, HiBars3BottomRight } from 'react-icons/hi2';
import Searchbar from './Searchbar';
import Cartdrawer from '../Layout/Cartdrawer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchcart } from '../../redux/Slices/cartSlice'; // Import fetchcart

function Navbar() {
  const [drawOpen, setDrawOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user, guestid } = useSelector((state) => state.auth);
  const userid = user ? user._id : null;

  // Fetch cart when component mounts
  useEffect(() => {
    if (userid || guestid) {
      dispatch(fetchcart({ userid, guestid }));
    }
  }, [dispatch, userid, guestid]);

  const cartitemcount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleCartDrawer = () => setDrawOpen(!drawOpen);

  return (
      <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* Logo */}
        <div>
          <Link to='/' className='text-2xl font-semibold text-gray-800'>
            furnish store
          </Link>
        </div>

        {/* Navigation Links */}
        <div className='hidden md:flex space-x-6'>
          <Link to='/collections/all?collections=livingroom' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            living room
          </Link>
          <Link to='/collections/all?collections=Bedroom' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            bedroom
          </Link>
          <Link to='/collections/all?collections=Diningroom' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            dining room
          </Link>
          <Link to='/collections/all?collections=Office' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            office
          </Link>
          <Link to='/collections/all?collections=Wooden' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            outdoor
          </Link>
        </div>

        {/* Right-side Actions */}
        <div className='flex items-center space-x-4'>
          {/* Admin Link */}
          <Link to='/admin' className='block bg-black px-2 rounded text-sm text-white hover:bg-gray-900'>
            admin
          </Link>

          {/* User Profile */}
          <Link to='/profile' className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700' />
          </Link>

          {/* Cart Button */}
          <button onClick={toggleCartDrawer} className='relative hover:text-black'>
            <HiOutlineShoppingCart className='h-6 w-6 text-gray-700 cursor-pointer' />
            {cartitemcount > 0 && (
              <span className='absolute -top-1 -right-2 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5'>
                {cartitemcount}
              </span>
            )}
          </button>

          {/* Search Bar */}
          <div className='overflow-hidden'>
            <Searchbar />
          </div>

          {/* Mobile Menu Icon */}
          <button className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <Cartdrawer drawOpen={drawOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
    // ... rest of your Navbar code remains the same
  );
}

export default Navbar;
