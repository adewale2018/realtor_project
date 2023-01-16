import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Check your email for the rest password link');
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
            src='https://images.unsplash.com/photo-1541781956512-0bda8f0b9418?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fGZvcm18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
            alt='key'
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '
              placeholder='Enter your email'
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-4 rounded font-medium uppercase shadow-md hover:bg-blue-700 transition ease-in-out transition-150 hover:shadow-lg active:bg-blue-800'
            >
              Send Reset Password Request
            </button>
            <div className='my-4 flex items-center before:border-t before:border-red-700 before:flex-1 after:border-t after:border-red-700 after:flex-1'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-md mt-3'>
              <p>
                Don't have a account yet?{' '}
                <Link
                  to='/sign-up'
                  className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to='/sign-in'
                  className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
