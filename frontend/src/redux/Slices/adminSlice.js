import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
 
const getErrorMessage = (error) => {
  if (!error) return 'Request failed'
  const data = error.response?.data
  if (typeof data === 'string') return data
  if (typeof data?.message === 'string') return data.message
  if (typeof data?.error === 'string') return data.error
  if (typeof error.message === 'string') return error.message
  try { return JSON.stringify(data || error) } catch { return 'Request failed' }
}

export const fetchusers = createAsyncThunk('admin/fetchusers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` }
    })
    return response.data
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const adduser = createAsyncThunk('admin/adduser', async (userdata, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const updateuser = createAsyncThunk('admin/updateuser', async ({ id, name, email, role }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const deleteuser = createAsyncThunk('admin/deleteuser', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
      }
    })
    return id
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
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
        state.error = null
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.loading = false
        state.users = Array.isArray(action.payload) ? action.payload : (action.payload?.users || [])
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error?.message || 'Failed to fetch users'
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        const updated = action.payload?.user || action.payload
        const userindex = state.users.findIndex((user) => user._id === updated?._id)
        if (userindex !== -1 && updated) {
          state.users[userindex] = updated
        }
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.error = action.payload || action.error?.message || 'Failed to update user'
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload)
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.error = action.payload || action.error?.message || 'Failed to delete user'
      })
      .addCase(adduser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(adduser.fulfilled, (state, action) => {
        state.loading = false
        const created = action.payload?.user || action.payload
        if (created) state.users.push(created)
      })
      .addCase(adduser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error?.message || 'Failed to add user'
      })
  }
})

export default adminSlice.reducer
