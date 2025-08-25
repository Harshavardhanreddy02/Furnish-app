import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem('usertoken')}`

export const fetchadminproducts = createAsyncThunk(
     'adminproducts/fetchproducts',
     async () => {
          const response = await axios.get(`${API_URL}/api/admin/products`, {
               headers: {
                    Authorization: USER_TOKEN,
               },
          })
          return response.data
     }
)

export const createproduct = createAsyncThunk(
     'adminproducts/createproduct',
     async (productdata) => {
          const response = await axios.post(`${API_URL}/api/admin/products`, productdata, {
               headers: {
                    Authorization: USER_TOKEN,
               }
          })
          return response.data
     }
)

export const updateproduct = createAsyncThunk(
     'adminproducts/updateproduct',
     async ({ id, productdata }) => {
          const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productdata, {
               headers: {
                    Authorization: USER_TOKEN,
               }
          })
          return response.data
     }
)

export const deleteproduct = createAsyncThunk(
     'adminproducts/deleteproduct',
     async (id) => {
          await axios.delete(`${API_URL}/api/admin/products/${id}`, {
               headers: {
                    Authorization: USER_TOKEN,
               }
          })
          return id
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
               })
               .addCase(fetchadminproducts.fulfilled, (state, action) => {
                    state.loading = false
                    state.products = action.payload
               })
               .addCase(fetchadminproducts.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.error.message
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
