import { FcGoogle } from 'react-icons/fc';
import React from 'react';

const OAuthButton = () => {
  return (
    <button className='flex items-center justify-center w-full bg-red-700 text-white py-3 rounded uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'>
      <FcGoogle className='mr-2' />
      Continue with Google
    </button>
  );
};

export default OAuthButton;
