import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../images/login.jpg';
import {loginuser} from '../redux/Slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import {mergecart} from '../redux/Slices/cartSlice'
import { toast } from 'sonner'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()

  const {guestid} = useSelector((state) => state.auth)
  const {cart} = useSelector((state) => state.cart)

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const ischeckoutredirect = redirect.includes("checkout");

  // Do not auto-redirect on visiting /login. We will navigate after a successful login submission.

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await dispatch(loginuser({ email, password })).unwrap();

      if (cart?.products?.length > 0 && guestid) {
        await dispatch(mergecart({ guestid, user: loggedInUser }));
      }

      navigate(ischeckoutredirect ? "/checkout" : "/");
    } catch (err) {
      const message = err?.message || err?.error || 'Login failed. Please check your credentials.'
      toast.error(message)
    }
  }

  return (
    <div className="flex">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm" onSubmit={handlesubmit}>
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-medium text-gray-800">Login</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your credentials to access your account.
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          {/* <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign in
          </button>

          {/* Register Redirect */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
