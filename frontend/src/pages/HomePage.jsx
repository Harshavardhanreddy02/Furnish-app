import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import Collection from '../components/Products/Collection'
import Newarrivals from '../components/Products/Newarrivals'
import Productdetails from '../components/Products/Productdetails'
import Produtgrid from '../components/Products/Produtgrid'
import Feauturecollection from '../components/Products/Feauturecollection'
import Feauturesection from '../components/Products/Feauturesection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchproductbyfilters } from '../redux/Slices/productSlice'
import axios from 'axios'

function HomePage() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestsellerproduct, setbestsellerproduct] = useState(null)

  useEffect(() => {
    // Fetch top 8 sofas
    dispatch(fetchproductbyfilters({
      category: "Sofa",
      limit: 8
    }))

    // Fetch best-seller product
    const fetchbestsellerproducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        

        // if API returns an array, pick the first product
        const productData = Array.isArray(response.data) ? response.data[0] : response.data
        setbestsellerproduct(productData)

      } catch (err) {
        console.error("Failed to fetch best-seller products:", err)
      }
    }

    fetchbestsellerproducts()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <Collection />
      <Newarrivals />

      <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
      </h2>
      {bestsellerproduct ? (
        <Productdetails product={bestsellerproduct} />
      ) : (
        <p className='text-center'>Loading best seller products....</p>
      )}

      <div className="container mx-auto">
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Rated Products from our customers
        </h2>
        <Produtgrid products={products} loading={loading} error={error} />
      </div>

      <Feauturecollection />
      <Feauturesection />
    </div>
  )
}

export default HomePage
