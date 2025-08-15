import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'

function Newarrivals() {
     const scrollRef = useRef(null)
     const [isdragging,setisdragging] = useState(false)
     const [startx,setstartx] = useState(0)
     const [scrollleft,setscrollleft] = useState(false)
     const [canscrollleft,setcanscrollleft] = useState(false)
     const [canscrollright,setcanscrollright] = useState(true)

     useEffect(() =>
     {
          const container = scrollRef.current;
          if(container)
          {
               container.addEventListener("scroll",updatescrollbutton)

          }
          return () => container.removeEventListener("scroll",updatescrollbutton)
     },[])
     const  scroll = (direction) =>
     {
          const scrollamount = direction === "left" ? -300 : 300;
          scrollRef.current.scrollBy({
               left: scrollamount,
               behavior: "smooth"
          });
     }

     const updatescrollbutton = () => {
          const container = scrollRef.current;
          if(container)
          {
               const leftscroll = container.scrollLeft;
               const rightscrollable = container.scrollWidth > leftscroll + container.clientWidth;
               setcanscrollright(rightscrollable);
               setcanscrollleft(leftscroll>0);
          }
          
     }
     const newarrivals =[
          {
               _id : 1, 
               name: "New Arrival 1",
               price:120,
               image: {
                    url: "https://picsum.photos/500/500?random=1",
                    altText: "New Arrival 1"
               },
              
          },
          {
              _id : 2, 
               name: "New Arrival 2",
               price:150,
               image: {
                    url: "https://picsum.photos/500/500?random=2",
                    altText: "New Arrival 2"
               },
          },
          {
              _id : 3, 
               name: "New Arrival 3",
               price:180,
               image: {
                    url: "https://picsum.photos/500/500?random=3",
                    altText: "New Arrival 3"
               },
          },
          {
              _id : 4, 
               name: "New Arrival 4",
               price:120,
               image: {
                    url: "https://picsum.photos/500/500?random=4",
                    altText: "New Arrival 4"
               },                  
               
          },
          {
               _id : 5, 
               name: "New Arrival 5          ",
               price:120,
               image: {
                    url: "https://picsum.photos/500/500?random=5",
                    altText: "New Arrival 5"
               },
          },

          {
               _id : 6, 
               name: "New Arrival 6",
               price:120,
               image: {
                    url: "https://picsum.photos/500/500?random=6",
                    altText: "New Arrival 6"
               },
          },
          {
               _id : 7, 
               name: "New Arrival 7",
               price:120,
               image: {
                    url: "https://picsum.photos/500/500?random=7",
                    altText: "New Arrival 7  "
               },
          },
          {
               _id : 8, 
               name: "New Arrival 8",
               price:120,
               image: {
                    url: "https://picsum.photos/500/500?random=8",
                    altText: "New Arrival 8  "
               },
          },
     ]
     const handleMouseDown = (e) =>
     {
          setisdragging(true);
          setstartx(e.pageX-scrollRef.current.offsetLeft);
          setscrollleft(scrollRef.current.scrollLeft);
     }
     const handleMouseMove = (e) =>
     {
          if(!isdragging) return;
          const x = e.pageX - scrollRef.current.offsetLeft;
          const walk = (x - startx); 
          scrollRef.current.scrollLeft = scrollleft - walk;
     }
     const handleMouseUpOrLeave = () =>
     {
          setisdragging(false);
     }
  
  return (
    <>
    <section className='py-6 px-4 lg:px-0'>

     <div className='container mx-auto  text-center mb-10 relative'>
          <h2 className='text-3xl font-bold mb-4'>
               Explore New Arrivals
          </h2>
          <p className='text-lg text-gray-600 mb-8'>
               Discover the latest additions to our collection.
          </p>
          <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
               <button onClick={() => scroll("left")}  disabled={!canscrollleft} className={`p-2 rounded border ${canscrollleft?"bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronLeft className='text-2xl ' />
               </button>

               <button onClick={() => scroll("right")} disabled={!canscrollright} className={`p-2 rounded border ${canscrollright?"bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronRight className='text-2xl ' />
               </button>

          </div>

     </div>

     <div ref={scrollRef} className={`container mx-auto overflow-x-scroll flex  space-x-6 relative ${isdragging?"cursor-grabbing":"cursor-grab"}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}>
          {
               newarrivals.map((product) => (
                    <div key={product._id}  className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                       <img src={product.image.url} alt={product.image.altText || product.name} className='w-full h-[500px] object-cover rounded-lg'  draggable="false"/>

                         <div className='absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                                 <Link to={`/product/${product._id}`} className='block'>
                                       <h4 className='font-medium'>
                                           {product.name}
                                       </h4>
                                       <p className='mt-1 '>
                                           ${product.price}
                                       </p>
                                 </Link>
                         </div>
                         
                    </div>
               ))
          }


     </div>
    </section>

    
    
    </>
  )
}

export default Newarrivals