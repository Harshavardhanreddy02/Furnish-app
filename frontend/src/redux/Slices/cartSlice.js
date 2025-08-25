import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Load cart from localStorage
const loadcartfromstorage = () => {
  const storedcart = localStorage.getItem("cart")
  return storedcart ? JSON.parse(storedcart) : { products: [] }
}

// Save cart to localStorage
const savecarttostorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Fetch cart
export const fetchcart = createAsyncThunk(
  'cart/fetchcart',
  async ({ userid, guestid }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        params: { userid, guestid }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Add to cart
export const addtocart = createAsyncThunk(
  'cart/addtocart',
  async ({ productid, quantity, sizes, colors, guestid, userid, dimensions }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productid,
        quantity,
        sizes,
        colors,
        guestid,
        userid,
        dimensions
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Update cart item quantity
export const updatecartitemquantity = createAsyncThunk(
  'cart/updatecartitemquantity',
  async ({ productid, quantity, guestid, userid, sizes, colors, dimensions }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productid,
        quantity,
        guestid,
        userid,
        sizes,
        colors,
        dimensions
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Remove from cart
export const removefromcart = createAsyncThunk(
  "cart/removefromcart",
  async ({ productid, guestid, userid, sizes, colors, dimensions }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        data: { productid, guestid, userid, sizes, colors, dimensions }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Merge guest cart into user cart
export const mergecart = createAsyncThunk(
  'cart/mergecart',
  async ({ guestid, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestid, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: loadcartfromstorage(),
    loading: false,
    error: null
  },
  reducers: {
    clearcart: (state) => {
      state.cart = { products: [] }
      localStorage.removeItem("cart")
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchcart
      .addCase(fetchcart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchcart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload?.cart || action.payload
        savecarttostorage(state.cart)
      })
      .addCase(fetchcart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch cart"
      })

      // addtocart
      .addCase(addtocart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload?.cart || action.payload
        savecarttostorage(state.cart)
      })
      .addCase(addtocart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to add to cart"
      })

      // updatecartitemquantity
      .addCase(updatecartitemquantity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatecartitemquantity.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload?.cart || action.payload
        savecarttostorage(state.cart)
      })
      .addCase(updatecartitemquantity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to update cart item"
      })

      // removefromcart
      .addCase(removefromcart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removefromcart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload?.cart || action.payload
        savecarttostorage(state.cart)
      })
      .addCase(removefromcart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to remove from cart"
      })

      // mergecart
      .addCase(mergecart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(mergecart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload?.cart || action.payload
        savecarttostorage(state.cart)
      })
      .addCase(mergecart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to merge cart"
      })
  }
})

export const { clearcart } = cartSlice.actions
export default cartSlice.reducer
