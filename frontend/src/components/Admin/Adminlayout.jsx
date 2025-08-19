import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Adminsidebar from './Adminsidebar';
import { Outlet } from 'react-router-dom';

function Adminlayout() {
  const [issidebaropen, setissidebaropen] = useState(false);

  const togglesidebar = () => {
    setissidebaropen(!issidebaropen);
  };

  // Optional: Disable scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = issidebaropen ? 'hidden' : 'auto';
  }, [issidebaropen]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Topbar */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20 items-center">
        <button onClick={togglesidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-2xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* Mobile overlay when sidebar is open */}
      {issidebaropen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={togglesidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
          issidebaropen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block z-20`}
      >
        <Adminsidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default Adminlayout;
