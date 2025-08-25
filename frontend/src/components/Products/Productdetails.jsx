import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import Productgrid from '../Products/Produtgrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproductdetails, fetchsimilarproducts } from '../../redux/Slices/productSlice';
import { addtocart } from '../../redux/Slices/cartSlice';

function Productdetails({ productid, product }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedproduct, loading, error, similarproducts } = useSelector(
    (state) => state.products
  );
  const { user, guestid } = useSelector((state) => state.auth);

  const [mainimage, setmainimage] = useState('');
  const [selectedsize, setselectedsize] = useState('');
  const [selectedcolor, setselectedcolor] = useState('');
  const [quantity, setquantity] = useState(1);
  const [isbuttondisabled, setisbuttondisabled] = useState(false);

  const productfetchid = productid || id;
  const productData = product || selectedproduct; // ✅ prefer passed product

  const thumbRef = useRef(null);

  useEffect(() => {
    if (!product && productfetchid) {
      // fetch only if product not directly passed
      dispatch(fetchproductdetails(productfetchid));
      dispatch(fetchsimilarproducts({ id: productfetchid }));
    }
  }, [dispatch, productfetchid, product]);

  useEffect(() => {
    if (productData?.images?.length > 0) {
      setmainimage(productData.images[0].url);
    }
  }, [productData]);

  const handlequantitychange = (type) => {
    if (type === 'plus') setquantity((prev) => Math.min(prev + 1, 10));
    else setquantity((prev) => Math.max(prev - 1, 1));
  };

  const handleaddtocart = () => {
    if (!selectedsize || !selectedcolor) {
      toast.error('Please select a size and color', { duration: 1000 });
      return;
    }
    setisbuttondisabled(true);
    dispatch(
      addtocart({
        productid: productfetchid || productData?._id,
        quantity,
        sizes: selectedsize,
        colors: selectedcolor,
        guestid,
        userid: user?._id,
        dimensions: productData?.dimensions,
      })
    )
      .then(() => {
        toast.success('Product added to cart!', { duration: 1000 });
      })
      .finally(() => {
        setisbuttondisabled(false);
      });
  };

  if (!productData) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {(productData.images || []).map((image, index) => (
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

          {/* main image */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            {mainimage && (
              <img
                src={mainimage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg shadow-md transition"
              />
            )}

            {/* mobile thumbnails */}
            <div ref={thumbRef} className="flex md:hidden mt-4 space-x-2 overflow-x-auto">
              {(productData.images || []).map((image, index) => (
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

          {/* product info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{productData.name}</h1>
            <p className="text-xl text-gray-800 mb-2 font-bold">₹{productData.price}</p>
            <p className="text-gray-600 mb-2">{productData.description}</p>

            <p className="text-gray-600 mb-2">
              Selected: {selectedcolor || 'None'}, {selectedsize || 'None'}
            </p>

            {/* color selection */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {(productData.colors || []).map((color) => (
                  <button
                    key={color}
                    onClick={() => setselectedcolor((prev) => (prev === color ? '' : color))}
                    className={`w-8 h-8 rounded-full border ${
                      selectedcolor === color ? 'ring-2 ring-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            {/* size selection */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(productData.sizes || []).map((size) => (
                  <button
                    key={size}
                    onClick={() => setselectedsize((prev) => (prev === size ? '' : size))}
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

            {/* quantity */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => handlequantitychange('minus')}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => handlequantitychange('plus')}
                >
                  +
                </button>
              </div>
            </div>

            {/* add to cart */}
            <button
              className={`px-6 py-2 bg-blue-600 text-white rounded w-full mb-4 transition ${
                isbuttondisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              onClick={handleaddtocart}
              disabled={isbuttondisabled}
            >
              {isbuttondisabled ? 'Adding...' : 'Add to Cart'}
            </button>

            {/* characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Brand</td>
                    <td className="py-2 px-4 border-b">{productData.brand || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Material</td>
                    <td className="py-2 px-4 border-b">{productData.material || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Dimension</td>
                    <td className="py-2 px-4 border-b">
                      {productData.dimensions
                        ? `${productData.dimensions.length || 0} x ${productData.dimensions.width || 0} x ${productData.dimensions.height || 0}`
                        : 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* similar products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You may also like</h2>
          <Productgrid products={similarproducts || []} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default Productdetails;
