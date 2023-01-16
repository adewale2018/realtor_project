import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { OAuthButton } from '../../components';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordTextChange = () =>
    setShowPassword((prevState) => !prevState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const { fullName, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth?.currentUser, {
        displayName: fullName,
      });
      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success('Successfully signed up');
      navigate('/');
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
            src='https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJlZ2lzdGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
            alt='key'
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '
              placeholder='Enter your full name'
              id='fullName'
              name='fullName'
              value={fullName}
              onChange={handleChange}
            />
            <input
              type='text'
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '
              placeholder='Enter your email'
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
            />
            <div className='relative mb-6'>
              <>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out '
                  placeholder='Enter your password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <AiOutlineEye
                    onClick={handlePasswordTextChange}
                    className='absolute right-3 top-3 text-xl cursor-pointer'
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={handlePasswordTextChange}
                    className='absolute right-3 top-3 text-xl cursor-pointer'
                  />
                )}
                <div className='flex justify-between whitespace-nowrap text-sm sm:text-md mt-3'>
                  <p>
                    Already have account?{' '}
                    <Link
                      to='/sign-in'
                      className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'
                    >
                      Sign in
                    </Link>
                  </p>
                  <p>
                    <Link
                      to='/forgot-password'
                      className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'
                    >
                      Forgot password?
                    </Link>
                  </p>
                </div>
              </>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-4 rounded font-medium uppercase shadow-md hover:bg-blue-700 transition ease-in-out transition-150 hover:shadow-lg active:bg-blue-800'
            >
              Register
            </button>
            <div className='my-4 flex items-center before:border-t before:border-red-700 before:flex-1 after:border-t after:border-red-700 after:flex-1'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuthButton />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
