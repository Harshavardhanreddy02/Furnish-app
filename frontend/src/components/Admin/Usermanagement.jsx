import React, { useState } from 'react';

function Usermanagement() {
  const [users, setUsers] = useState([
    {
      _id: 123,
      name: "John Doe",
      email: "john@gmail.com",
      role: "admin",
    },
  ]);

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const newUser = {
      _id: Date.now(),
      name: formdata.name,
      email: formdata.email,
      role: formdata.role,
    };
    setUsers([...users, newUser]);
    console.log("User submitted:", newUser);
    setformdata({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handlerolechange = (userid, newrole) => {
    const updatedUsers = users.map(user =>
      user._id === userid ? { ...user, role: newrole } : user
    );
    setUsers(updatedUsers);
  };

  const handledeleteuser = (userid) => {
    if (window.confirm("Are you sure to delete this user?")) {
      const filteredUsers = users.filter(user => user._id !== userid);
      setUsers(filteredUsers);
    }
  };

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
        User Management
      </h2>

      {/* Form Section */}
      <div className='bg-white shadow-md p-6 rounded-lg mb-8'>
        <h3 className='text-xl font-semibold mb-4 text-gray-700'>
          Add New User
        </h3>
        <form onSubmit={handlesubmit} className='space-y-4'>
          <div>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type="text"
              name='name'
              id="name"
              value={formdata.name}
              onChange={handlechange}
              className='w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300'
              required
            />
          </div>

          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type="email"
              name='email'
              id="email"
              value={formdata.email}
              onChange={handlechange}
              className='w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300'
              required
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type="password"
              name='password'
              id="password"
              value={formdata.password}
              onChange={handlechange}
              className='w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300'
              required
            />
          </div>

          <div>
            <label htmlFor="role" className='block text-sm font-medium text-gray-700'>
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formdata.role}
              onChange={handlechange}
              className='w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300'
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type='submit'
            className='bg-green-500 text-white font-semibold py-2 px-6 rounded hover:bg-green-600 transition duration-200'
          >
            Add User
          </button>
        </form>
      </div>

      {/* Table Section */}
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
            {users.map((user) => (
              <tr key={user._id} className='border-b hover:bg-gray-50'>
                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                  {user.name}
                </td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>
                  <select
                    value={user.role}
                    onChange={(e) => handlerolechange(user._id, e.target.value)}
                    className='p-2 border border-gray-300 rounded'
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className='p-4'>
                  <button
                    onClick={() => handledeleteuser(user._id)}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usermanagement;
