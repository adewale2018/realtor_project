import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const auth = getAuth();
  const location = useLocation();
  const navigation = useNavigate();

  const [pageState, setPageState] = useState('Sign in');

  const getLocation = (pathName) => location.pathname === pathName ? true : false

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState('Profile');
      } else {
        setPageState('Sign in');
      }
    });
  }, [auth]);

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img
            onClick={() => navigation('/')}
            src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
            alt='Realtor'
            className='h-5 cursor-pointer'
          />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li
              onClick={() => navigation('/')}
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                getLocation('/') && 'text-black border-b-red-500'
              } cursor-pointer`}
            >
              Home
            </li>
            <li
              onClick={() => navigation('/offers')}
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                getLocation('/offers') && 'text-black border-b-red-500'
              } cursor-pointer`}
            >
              Offers
            </li>
            <li
              onClick={() => navigation('/profile')}
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (getLocation('/sign-in') || getLocation('/profile')) &&
                'text-black border-b-red-500'
              } cursor-pointer`}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
