import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import signup from '../images/signup.jpg';
import { registeruser } from '../redux/Slices/authSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setname] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await dispatch(registeruser({ name, email, password })).unwrap();
      toast.success('Registration successful. Please sign in.');
      navigate('/login');
    } catch (err) {
      const message = err?.message || err?.error || 'Registration failed. Please try again.'
      toast.error(message)
    }
  }

  return (
    <>
    <div className="flex">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm" onSubmit={handlesubmit}>
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-medium text-gray-800">Register</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Create your account</h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your details to sign up.
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

           <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
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

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign up
          </button>

          {/* Register Redirect */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={signup}
            alt="Login"
            className="h-[777px] w-full object-cover"
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Register