import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchproductdetails, updateproduct } from '../../redux/Slices/productSlice'

function EditProduct() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { selectedproduct, loading, error } = useSelector((state) => state.products)

  const [productData, setProductData] = useState({
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
    dimension: '',
    images: [],
  });
  const [uploading, setuploading] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchproductdetails(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (selectedproduct) {
      setProductData((prev) => ({
        ...prev,
        ...selectedproduct,
        name: selectedproduct.name ?? '',
        description: selectedproduct.description ?? '',
        price: selectedproduct.price ?? 0,
        countInStock: selectedproduct.countInStock ?? 0,
        sku: selectedproduct.sku ?? '',
        category: selectedproduct.category ?? '',
        brand: selectedproduct.brand ?? '',
        collections: selectedproduct.collections ?? '',
        material: selectedproduct.material ?? '',
        dimension: selectedproduct.dimension ?? '',
        sizes: Array.isArray(selectedproduct.sizes) ? selectedproduct.sizes : [],
        colors: Array.isArray(selectedproduct.colors) ? selectedproduct.colors : [],
        images: Array.isArray(selectedproduct.images) ? selectedproduct.images : [],
      }))
    }
  }, [selectedproduct])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return
    const formdata = new FormData()
    formdata.append('image', file)

    try {
      setuploading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setProductData((prevdata) => ({
        ...prevdata,
        images: [
          ...(Array.isArray(prevdata.images) ? prevdata.images : []),
          { url: data?.imageurl || data?.url || '', altText: '' }
        ]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setuploading(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...productData }
      await dispatch(updateproduct({ id, productdata: payload })).unwrap()
      navigate('/admin/products')
    } catch (err) {
      alert(typeof err === 'string' ? err : 'Failed to update product')
    }
  };

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error:{String(error)}</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Furniture Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name ?? ''}
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
            value={productData.description ?? ''}
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
            value={productData.price ?? 0}
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
            value={productData.countInStock ?? 0}
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
            value={productData.sku ?? ''}
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
            value={(productData.sizes || []).join(',')}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
              }))
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Colors */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            value={(productData.colors || []).join(',')}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                colors: e.target.value.split(',').map((c) => c.trim()).filter(Boolean),
              }))
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
            value={productData.material ?? ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Wood, Leather"
          />
        </div>

        {/* Dimension */}
        {/* <div className="mb-5">
          <label className="block font-semibold mb-2">Dimension</label>
          <input
            type="text"
            name="dimension"
            value={productData.dimension ?? ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., 120x80x40 cm"
          />
        </div> */}

        {/* Collection */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Collection</label>
          <input
            type="text"
            name="collections"
            value={productData.collections ?? ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Modern, Classic"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
          <div className="flex flex-wrap gap-4 mt-4">
            {(productData.images || []).map((img, idx) => (
              <div key={idx}>
                <img
                  src={img.url || img}
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
