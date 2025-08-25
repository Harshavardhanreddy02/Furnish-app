import { configureStore } from "@reduxjs/toolkit"
import authReducer from './Slices/authSlice'
import productReducer from './Slices/productSlice'
import cartReducer from './Slices/cartSlice'
import checkoutReducer from './Slices/checkoutSlice'
import orderReducer from './Slices/orderSlice'
import adminReducer from './Slices/adminSlice'
import adminproductReducer from './Slices/adminproductSlice'
import adminorderReducer from './Slices/adminorderSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    orders:orderReducer,
    admin:adminReducer,
    adminproducts:adminproductReducer,
    adminorders:adminorderReducer
  }
})

export default store
