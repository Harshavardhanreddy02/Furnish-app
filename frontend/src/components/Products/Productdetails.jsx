import React, { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'sonner';
import Productgrid from './Produtgrid';

function Productdetails() {
  const [mainimage, setmainimage] = useState('');
  const [selectedsize, setselectedsize] = useState('');
  const [selectedcolor, setselectedcolor] = useState('');
  const [quantity, setquantity] = useState(1);
  const [isbuttondisabled, setisbuttondisabled] = useState(false);
  const thumbRef = useRef(null);

  const similarproducts = useMemo(() => [
    { _id: 1, name: 'Similar Product 1', price: 80, image: [{ url: 'https://picsum.photos/500/500?random=4' }] },
    { _id: 2, name: 'Similar Product 2', price: 90, image: [{ url: 'https://picsum.photos/500/500?random=5' }] },
    { _id: 3, name: 'Similar Product 3', price: 70, image: [{ url: 'https://picsum.photos/500/500?random=6' }] },
    { _id: 4, name: 'Similar Product 4', price: 85, image: [{ url: 'https://picsum.photos/500/500?random=7' }] },
  ], []);

  const selectedproduct = useMemo(() => ({
    name: 'Product Name',
    price: 100,
    originalprice: 120,
    description: 'Product Description',
    brand: 'Brand Name',
    material: 'Material Type',
    size: ['two seater', 'three seater', 'four seater'],
    colors: ['black', 'brown'],
    dimension: '200 x 80 x 90 cm', // <-- dimension added
    images: [
      { url: 'https://picsum.photos/500/500?random=1', altText: 'Product Image 1' },
      { url: 'https://picsum.photos/500/500?random=2', altText: 'Product Image 2' },
      { url: 'https://picsum.photos/500/500?random=3', altText: 'Product Image 3' },
    ],
  }), []);

  useEffect(() => {
    if (selectedproduct?.images?.length > 0) {
      setmainimage(selectedproduct.images[0].url);
    }
  }, [selectedproduct]);

  const handlequantitychange = (type) => {
    if(type === "plus") setquantity(prev => Math.min(prev + 1, 10));
    else setquantity(prev => Math.max(prev - 1, 1));
  };

  const handleaddtocart = () => {
    if (!selectedsize || !selectedcolor) {
      toast.error("Please select a size and color", { duration: 1000 });
      return;
    }
    setisbuttondisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart", { duration: 1000 });
      setisbuttondisabled(false);
    }, 500);
  };

  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <div className='flex flex-col md:flex-row'>

          {/* Thumbnails */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
            {selectedproduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border hover:scale-105 transition ${
                  mainimage === image.url ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setmainimage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='md:w-1/2 mb-6 md:mb-0'>
            {mainimage && (
              <img
                src={mainimage}
                alt="Main Product"
                className='w-full h-auto object-cover rounded-lg shadow-md transition'
              />
            )}

            {/* Mobile thumbnails */}
            <div ref={thumbRef} className='flex md:hidden mt-4 space-x-2 overflow-x-auto'>
              {selectedproduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer border hover:scale-105 transition ${
                    mainimage === image.url ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => setmainimage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className='md:w-1/2 md:ml-10'>
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedproduct.name}</h1>

            <p className='text-lg text-gray-600 mb-1 line-through'>₹{selectedproduct.originalprice}</p>
            <p className='text-xl text-gray-800 mb-2 font-bold'>₹{selectedproduct.price}</p>
            <p className='text-gray-600 mb-2'>{selectedproduct.description}</p>

            <p className="text-gray-600 mb-2">
              Selected: {selectedcolor || 'None'}, {selectedsize || 'None'}
            </p>

            {/* Color Selection */}
            <div className='mb-4'>
              <p className='text-gray-700'>Color:</p>
              <div className='flex gap-2 mt-2'>
                {selectedproduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setselectedcolor(prev => prev === color ? '' : color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedcolor === color ? 'ring-2 ring-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className='text-gray-700'>Size:</p>
              <div className='flex flex-wrap gap-2 mt-2'>
                {selectedproduct.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setselectedsize(prev => prev === size ? '' : size)}
                    className={`min-w-[100px] px-4 py-2 rounded border text-sm text-center break-words ${
                      selectedsize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                    } transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className='mb-6'>
              <p className='text-gray-700'>Quantity:</p>
              <div className='flex items-center space-x-4'>
                <button
                  className='px-2 py-1 bg-gray-200 rounded text-lg'
                  onClick={() => handlequantitychange("minus")}
                >
                  -
                </button>
                <span className='text-lg'>{quantity}</span>
                <button
                  className='px-2 py-1 bg-gray-200 rounded text-lg'
                  onClick={() => handlequantitychange("plus")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className={`px-6 py-2 bg-blue-600 text-white rounded w-full mb-4 transition ${
                isbuttondisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              onClick={handleaddtocart}
              disabled={isbuttondisabled}
            >
              {isbuttondisabled ? 'Adding...' : 'Add to Cart'}
            </button>

            {/* Characteristics */}
            <div className='mt-10 text-gray-700'>
              <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
              <table className='w-full text-left text-sm text-gray-600'>
                <tbody>
                  <tr>
                    <td className='py-2 px-4 border-b'>Brand</td>
                    <td className='py-2 px-4 border-b'>{selectedproduct.brand}</td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4 border-b'>Material</td>
                    <td className='py-2 px-4 border-b'>{selectedproduct.material}</td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4 border-b'>Dimension</td>
                    <td className='py-2 px-4 border-b'>{selectedproduct.dimension}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You may also like</h2>
          <Productgrid products={similarproducts} />
        </div>
      </div>
    </div>
  );
}

export default Productdetails;
