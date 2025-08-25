import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Newarrivals() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals,setnewArrivals] = useState([])

  useEffect(()=>
  {
    const fetchnewarrivals = async () =>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
        setnewArrivals(response.data)
      }catch(error)
      { 
        console.log(error)

      }
    }
    fetchnewarrivals()
  },[])


  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
    }
    return () => container?.removeEventListener('scroll', updateScrollButtons);
  }, [newArrivals]);

  const scroll = (direction) => {
    const amount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollWidth > container.scrollLeft + container.clientWidth);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  return (
    <section className="py-6 px-4 lg:px-0 bg-gray-50">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-4xl font-semibold mb-2 text-gray-800">Explore New Arrivals</h2>
        <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
          Discover the latest additions to our collection.
        </p>
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border shadow-md hover:bg-gray-100 transition ${canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border shadow-md hover:bg-gray-100 transition ${canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              className="w-full h-[400px] object-cover"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="mt-1 text-sm opacity-90">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Newarrivals;
