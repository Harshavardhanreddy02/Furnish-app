import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
 
export const fetchusers = createAsyncThunk('admin/fetchusers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEMD_URL}/api/admin/users`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
  })
  return response.data
})

export const adduser = createAsyncThunk('admin/adduser', async (userdata, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEMD_URL}/api/admin/users`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateuser = createAsyncThunk('admin/updateuser', async ({ id, name, email, role }) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BACKEMD_URL}/api/admin/users/${id}`,
    { name, email, role },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
      }
    }
  )
  return response.data
})

export const deleteuser = createAsyncThunk('admin/deleteuser', async (id) => {
  await axios.delete(`${import.meta.env.VITE_BACKEMD_URL}/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    }
  })
  return id
})

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchusers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        const updateduser = action.payload
        const userindex = state.users.findIndex((user) => user._id === updateduser._id)
        if (userindex !== -1) {
          state.users[userindex] = updateduser
        }
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload)
      })
      .addCase(adduser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(adduser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload.user)
      })
      .addCase(adduser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  }
})

export default adminSlice.reducer
