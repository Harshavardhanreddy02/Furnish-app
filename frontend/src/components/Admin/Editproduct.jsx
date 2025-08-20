import React, { useState } from 'react';

function EditProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [], // e.g., "Small, Medium, Large" for sofas or beds
    colors: [], // e.g., "Red, Blue, Brown"
    collection: '',
    material: '', // e.g., "Wood, Leather"
    images: [
      { url: 'https://picsum.photos/150?random=1' },
      { url: 'https://picsum.photos/150?random=2' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log('Upload file:', file);
    // Add upload logic here (Cloudinary/Firebase)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Furniture Product Updated:', productData);
    // Replace with API call
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Furniture Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Modern Sofa"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the furniture product..."
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., 499"
            required
          />
        </div>

        {/* Count in Stock */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Stock Quantity</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., 20"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., SOF101"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            value={productData.sizes.join(',')}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Colors */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            value={productData.colors.join(',')}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(',').map((c) => c.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Material */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Material</label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Wood, Leather"
          />
        </div>

        {/* Collection */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Collection</label>
          <input
            type="text"
            name="collection"
            value={productData.collection}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Modern, Classic"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img.url}
                  alt={`furniture-${idx}`}
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

export default EditProduct;
