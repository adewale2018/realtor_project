import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLogOut = () => {
    auth.signOut();
    navigate('/');
    toast.success('You have successfully log out');
  };
  const handleSubmit = (e) => {};
  const { name, email } = formData;

  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Profile</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '
              placeholder='Name'
              id='name'
              name='name'
              value={name}
              onChange={handleChange}
              disabled
            />
            <input
              type='email'
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out '
              placeholder='Email'
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
              disabled
            />
            <div className='flex justify-between whitespace-pre-wrap text-sm sm:text-lg mb-6'>
              <p>
                Do you want to change your name?{' '}
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1'>
                  Edit
                </span>
              </p>
              <p
                onClick={handleLogOut}
                className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
