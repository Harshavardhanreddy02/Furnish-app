import React, { useState } from 'react';

function Editproduct() {
  const [productdata, setproductdata] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: '',
    images: [
      { url: 'https://picsum.photos/150?random=1' },
      { url: 'https://picsum.photos/150?random=2' },
    ],
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setproductdata((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleimageupload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // Add upload logic here (e.g., Cloudinary or Firebase)
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(productdata); // replace with API call
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
      <form onSubmit={handlesubmit}>
        {/* Product Name */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productdata.name}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productdata.description}
            onChange={handlechange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productdata.price}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Count in Stock */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productdata.countInStock}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productdata.sku}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={productdata.sizes.join(',')}
            onChange={(e) =>
              setproductdata({
                ...productdata,
                sizes: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={productdata.colors.join(',')}
            onChange={(e) =>
              setproductdata({
                ...productdata,
                colors: e.target.value.split(',').map((c) => c.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleimageupload} />
          <div className="flex flex-wrap gap-4 mt-4">
            {productdata.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={`product-${index}`}
                  className="w-20 h-20 object-cover rounded-md shadow-md hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-semibold"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default Editproduct;
