import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { actions as Mixpanel } from '../../components/mixpanel/MixPanel';
import { OAuthButton } from '../../components';
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordTextChange = () =>
    setShowPassword((prevState) => !prevState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success('Successfully login');
        Mixpanel.track('Successful login');
        Mixpanel.identify(userCredential.user.uid);
        Mixpanel.people.set({
          $first_name: userCredential.user.displayName,
          $email: userCredential.user.email,
        });
        navigate('/');
      }
    } catch (error) {
      toast(error.code);
      Mixpanel.track('Login attempt failed');
    }
  };

  const { email, password } = formData;
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
            src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
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
              Sign In
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

export default SignIn;
