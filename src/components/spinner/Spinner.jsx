import Loader from '../../assets/svg/spinner.svg';
import React from 'react';

const Spinner = () => {
  return (
    <div className='bg-black bg-opacity-10 flex justify-center items-center fixed left-0 right-0 top-0 bottom-0'>
      <div>
        <p className='text-white font-bold'>Loading...</p>
        <img src={Loader} alt='Loading...' className='h-24' />
      </div>
    </div>
  );
};

export default Spinner;
