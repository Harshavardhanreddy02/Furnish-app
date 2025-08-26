import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchuserorders = createAsyncThunk(
  'orders/fetchuserorders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('usertoken')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchorderdetails = createAsyncThunk(
  'orders/fetchorderdetails',
  async (orderid, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('usertoken')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const orderslice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    totalorder: 0,
    orderdetails: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserorders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchuserorders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.orders || action.payload || []
        state.totalorder = action.payload.total || action.payload.length || 0
      })
      .addCase(fetchuserorders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "failed to fetch orders"
      })
      .addCase(fetchorderdetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchorderdetails.fulfilled, (state, action) => {
        state.loading = false
        state.orderdetails = action.payload
      })
      .addCase(fetchorderdetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "failed to fetch order details"
      })
  }
})

export default orderslice.reducer
