import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchallorders = createAsyncThunk(
     'adminorder/fetchallorders',
     async (_, { rejectWithValue }) => {
          try {
               const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                    }
               })
               return response.data
          } catch (error) {
               return rejectWithValue(error.response.data)
          }
     }
)

export const updateorderstatus = createAsyncThunk(
     'adminorder/updateorderstatus',
     async ({ id, status }, { rejectWithValue }) => {
          try {
               const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, { status }, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                    }
               })
               return response.data
          } catch (error) {
               return rejectWithValue(error.response.data)
          }
     }
)

export const deleteorder = createAsyncThunk(
     'adminorder/deleteorder',
     async ({ id }, { rejectWithValue }) => {
          try {
               await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                    }
               })
               return id
          } catch (error) {
               return rejectWithValue(error.response.data)
          }
     }
)

const adminorderSlice = createSlice({
     name: 'adminorders',
     initialState: {
          orders: [],
          totalorder: 0,
          totalsales: 0,
          loading: false,
          error: null,
     },
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchallorders.pending, (state) => {
                    state.loading = true
                    state.error = null
               })
               .addCase(fetchallorders.fulfilled, (state, action) => {
                    state.loading = false
                    state.orders = action.payload
                    state.totalorder = action.payload.length
                    state.totalsales = action.payload.reduce((acc, order) => acc + order.totalprice, 0)
               })
               .addCase(fetchallorders.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload?.message || action.error.message
               })
               .addCase(updateorderstatus.fulfilled, (state, action) => {
                    const updateorder = action.payload
                    const orderindex = state.orders.findIndex((order) => order._id === updateorder._id)
                    if (orderindex !== -1) {
                         state.orders[orderindex] = updateorder
                    }
               })
               .addCase(deleteorder.fulfilled, (state, action) => {
                    state.orders = state.orders.filter((order) => order._id !== action.payload)
               })
     }
})

export default adminorderSlice.reducer
