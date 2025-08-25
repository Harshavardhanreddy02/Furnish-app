import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

// get user info from localStorage if exists
const userfromstorage = localStorage.getItem("userinfo") 
  ? JSON.parse(localStorage.getItem("userinfo")) 
  : null

// get or create guestid
const initialguestid = localStorage.getItem("guestid") || `guest_${new Date().getTime()}`
localStorage.setItem('guestid', initialguestid)

const initialstate = {
     user: userfromstorage,
     guestid: initialguestid,
     loading: false,
     error: null
}

// login async thunk
export const loginuser = createAsyncThunk('auth/loginuser', async (userdata, { rejectWithValue }) => {
     try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userdata)
          localStorage.setItem("userinfo", JSON.stringify(response.data.user))
          localStorage.setItem("usertoken", response.data.token)
          return response.data.user
     } catch (err) {
          return rejectWithValue(err.response.data)
     }
})

// register async thunk
export const registeruser = createAsyncThunk('auth/registeruser', async (userdata, { rejectWithValue }) => {
     try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userdata)
          localStorage.setItem("userinfo", JSON.stringify(response.data.user))
          localStorage.setItem("usertoken", response.data.token)
          return response.data.user
     } catch (err) {
          return rejectWithValue(err.response.data)
     }
})

const authSlice = createSlice({
     name: "auth",
     initialState: initialstate,
     reducers: {
          logout: (state) => {
               state.user = null
               state.guestid = `guest_${new Date().getTime()}`
               localStorage.removeItem("userinfo")
               localStorage.removeItem('usertoken')
               localStorage.setItem("guestid", state.guestid)
          },
          generatenewguestid: (state) => {
               state.guestid = `guest_${new Date().getTime()}`
               localStorage.setItem("guestid", state.guestid)
          }
     },
     extraReducers: (builder) => {
          builder
               .addCase(loginuser.pending, (state) => {
                    state.loading = true
                    state.error = null
               })
               .addCase(loginuser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
               })
               .addCase(loginuser.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload.message
               })
               .addCase(registeruser.pending, (state) => {
                    state.loading = true
                    state.error = null
               })
               .addCase(registeruser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
               })
               .addCase(registeruser.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload.message
               })
     }
})

export const { logout, generatenewguestid } = authSlice.actions
export default authSlice.reducer
