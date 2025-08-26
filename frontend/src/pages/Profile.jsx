import React, { useEffect } from 'react';
import Myorder from './Myorder';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from '../redux/Slices/authSlice'
import {clearcart} from '../redux/Slices/cartSlice'

function Profile() {
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
         if(!user)
         {
          navigate('/login')
         }
  },[user,navigate])

  const handlelogout = () =>
  {
    dispatch(logout())
    dispatch(clearcart())
    navigate("/login")
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          
          {/* User Info Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {user?.name}

            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {user?.email}
            </p>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition" onClick={handlelogout}>
              Logout
            </button>
          </div>

          {/* Orders Section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Myorder />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
