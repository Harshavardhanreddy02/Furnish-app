import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`

const getAuthHeaders = () => {
     const token = localStorage.getItem('usertoken')
     return token ? { Authorization: `Bearer ${token}` } : {}
}

export const fetchadminproducts = createAsyncThunk(
     'adminproducts/fetchproducts',
     async (_, { rejectWithValue }) => {
          try {
               const response = await axios.get(`${API_URL}/api/admin/products`, {
                    headers: {
                         ...getAuthHeaders(),
                    },
               })
               return response.data
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch admin products')
          }
     }
)

export const createproduct = createAsyncThunk(
     'adminproducts/createproduct',
     async (productdata, { rejectWithValue }) => {
          try {
               const response = await axios.post(`${API_URL}/api/admin/products`, productdata, {
                    headers: {
                         'Content-Type': 'application/json',
                         ...getAuthHeaders(),
                    }
               })
               return response.data
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create product')
          }
     }
)

export const updateproduct = createAsyncThunk(
     'adminproducts/updateproduct',
     async ({ id, productdata }, { rejectWithValue }) => {
          try {
               const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productdata, {
                    headers: {
                         'Content-Type': 'application/json',
                         ...getAuthHeaders(),
                    }
               })
               return response.data
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update product')
          }
     }
)

export const deleteproduct = createAsyncThunk(
     'adminproducts/deleteproduct',
     async (id, { rejectWithValue }) => {
          try {
               await axios.delete(`${API_URL}/api/admin/products/${id}`, {
                    headers: {
                         ...getAuthHeaders(),
                    }
               })
               return id
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete product')
          }
     }
)

const adminproducstSlice = createSlice({
     name: "adminproducts",
     initialState: {
          products: [],
          loading: false,
          error: null,
     },
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchadminproducts.pending, (state) => {
                    state.loading = true
                    state.error = null
               })
               .addCase(fetchadminproducts.fulfilled, (state, action) => {
                    state.loading = false
                    state.products = action.payload
               })
               .addCase(fetchadminproducts.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload || action.error.message
               })
               .addCase(createproduct.fulfilled, (state, action) => {
                    state.products.push(action.payload)
               })
               .addCase(updateproduct.fulfilled, (state, action) => {
                    const index = state.products.findIndex((product) => product._id === action.payload._id)
                    if (index !== -1) {
                         state.products[index] = action.payload
                    }
               })
               .addCase(deleteproduct.fulfilled, (state, action) => {
                    state.products = state.products.filter((product) => product._id !== action.payload)
               })
     }
})

export default adminproducstSlice.reducer
