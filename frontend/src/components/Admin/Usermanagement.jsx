import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchusers, adduser, updateuser, deleteuser } from '../../redux/Slices/adminSlice'

function CustomerManagement() {
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const { user: authUser } = useSelector((state) => state.auth)
 const { users, loading, error } = useSelector((state) => state.admin)

 useEffect(() => {
  if (authUser && authUser.role !== 'admin') {
    navigate('/')
  }
 }, [authUser, navigate])

 useEffect(() => {
  dispatch(fetchusers())
 }, [dispatch])

 const [formdata, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  role: 'customer',
 })

 const handleChange = (e) => {
  setFormData({ ...formdata, [e.target.name]: e.target.value })
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await dispatch(adduser(formdata)).unwrap()
    setFormData({ name: '', email: '', password: '', role: 'customer' })
    dispatch(fetchusers())
  } catch (err) {
    alert(typeof err === 'string' ? err : 'Failed to add user')
  }
 }

 const handleRoleChange = async (id, role) => {
  try {
    await dispatch(updateuser({ id, role })).unwrap()
    dispatch(fetchusers())
  } catch (err) {
    alert(typeof err === 'string' ? err : 'Failed to update role')
  }
 }

 const handleDelete = async (id) => {
  if (authUser && id === authUser._id) {
    alert('You cannot delete your own admin account.')
    return
  }
  if (window.confirm('Are you sure you want to delete this customer?')) {
    try {
      await dispatch(deleteuser(id)).unwrap()
      dispatch(fetchusers())
    } catch (err) {
      alert(typeof err === 'string' ? err : 'Failed to delete user')
    }
  }
 }

 return (
  <div className='max-w-5xl mx-auto p-6'>
    <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
      Customer Management
    </h2>
    {loading && <p>Loading...</p>}
    {error && <p className='text-red-600'>Error: {String(error)}</p>}

    {/* Add Customer Form */}
    <div className='bg-white shadow-md p-6 rounded-lg mb-8'>
      <h3 className='text-xl font-semibold mb-4 text-gray-700'>
        Add New Customer
      </h3>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Name</label>
          <input
            type='text'
            name='name'
            value={formdata.name}
            onChange={handleChange}
            className='w-full mt-1 p-2 border rounded focus:ring focus:ring-green-300'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            value={formdata.email}
            onChange={handleChange}
            className='w-full mt-1 p-2 border rounded focus:ring focus:ring-green-300'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Password</label>
          <input
            type='password'
            name='password'
            value={formdata.password}
            onChange={handleChange}
            className='w-full mt-1 p-2 border rounded focus:ring focus:ring-green-300'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Role</label>
          <select
            name='role'
            value={formdata.role}
            onChange={handleChange}
            className='w-full mt-1 p-2 border rounded focus:ring focus:ring-green-300'
          >
            <option value='customer'>Customer</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <button type='submit' className='bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600'>
          Add Customer
        </button>
      </form>
    </div>

    {/* Customer Table */}
    <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
      <table className='min-w-full text-left text-sm text-gray-700'>
        <thead className='bg-gray-100 text-xs uppercase'>
          <tr>
            <th className='py-3 px-4'>Name</th>
            <th className='py-3 px-4'>Email</th>
            <th className='py-3 px-4'>Role</th>
            <th className='py-3 px-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((c) => (
            <tr key={c._id} className='border-b hover:bg-gray-50'>
              <td className='p-4 font-medium text-gray-900'>{c.name}</td>
              <td className='p-4'>{c.email}</td>
              <td className='p-4'>
                <select
                  value={c.role}
                  onChange={(e) => handleRoleChange(c._id, e.target.value)}
                  className='p-2 border rounded'
                >
                  <option value='customer'>Customer</option>
                  <option value='admin'>Admin</option>
                </select>
              </td>
              <td className='p-4'>
                <button onClick={() => handleDelete(c._id)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
 )
}

export default CustomerManagement;
