import React, { useEffect, useState } from 'react';

import { actions as Mixpanel } from '../../components/mixpanel/MixPanel';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: true,
    regularPrice: 0,
    discountPrice: 0,
  });

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    description,
    address,
    offer,
    regularPrice,
    discountPrice,
  } = formData;

  useEffect(() => {
    Mixpanel.track('visit create listing page');
  }, []);

  return (
    <main className='px-2 max-w-md mx-auto mb-10'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
      <form onSubmit={handleSubmit}>
        <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
        <div className='flex items-center mb-6'>
          <button
            type='button'
            id='type'
            value='sell'
            className={`mr-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === 'rent'
                ? 'bg-white text-black'
                : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            Sell
          </button>
          <button
            type='button'
            id='type'
            value='rent'
            className={`ml-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === 'sell'
                ? 'bg-white text-black'
                : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            rent
          </button>
        </div>
        <p className='text-lg font-semibold'>Name</p>
        <input
          onChange={handleChange}
          value={name}
          type='text'
          placeholder='Name'
          id='name'
          maxLength={32}
          minLength={10}
          required
          className='mb-6 px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out w-full focus:text-gray-700 focus:bg-white focus:border-slate-600'
        />
        <div className='mb-6 flex space-x-6'>
          <div>
            <p className='text-lg font-semibold'>Beds</p>
            <input
              type='number'
              id='bedrooms'
              value={bedrooms}
              onChange={handleChange}
              min='1'
              max='20'
              required
              className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
            />
          </div>
          <div>
            <p className='text-lg font-semibold'>Baths</p>
            <input
              type='number'
              id='bathrooms'
              value={bathrooms}
              onChange={handleChange}
              min='1'
              max='20'
              required
              className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
            />
          </div>
        </div>
        <p className='text-lg font-semibold'>Parking spot</p>
        <div className='flex items-center mb-6'>
          <button
            type='button'
            id='parking'
            value={true}
            className={`mr-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            YES
          </button>
          <button
            type='button'
            id='parking'
            value={false}
            className={`ml-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            NO
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'>Furnished</p>
        <div className='flex items-center mb-6'>
          <button
            type='button'
            id='furnished'
            value={true}
            className={`mr-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            YES
          </button>
          <button
            type='button'
            id='furnished'
            value={false}
            className={`ml-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            NO
          </button>
        </div>
        <p className='text-lg font-semibold'>Address</p>
        <textarea
          placeholder='Address'
          id='address'
          value={address}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
        />
        <p className='text-lg font-semibold mt-6'>Description</p>
        <textarea
          placeholder='Description'
          id='description'
          value={description}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
        />
        <p className='text-lg font-semibold mt-6'>Offer</p>
        <div className='flex items-center mb-6'>
          <button
            type='button'
            id='offer'
            value={true}
            className={`mr-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            YES
          </button>
          <button
            type='button'
            id='offer'
            value={false}
            className={`ml-2 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
            onClick={handleChange}
          >
            NO
          </button>
        </div>
        <p className='text-lg font-semibold'>Regular Price</p>
        <div className='flex items-center'>
          <input
            type='number'
            id='regularPrice'
            value={regularPrice}
            onChange={handleChange}
            min='50'
            max='400000000'
            required
            className='px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
          />
          {type === 'rent' && (
            <div className='ml-3'>
              <p className='text-md text-gray-500 font-semibold'>$ / month</p>
            </div>
          )}
        </div>
        {offer && (
          <>
            <p className='text-lg font-semibold mt-6'>Discounted Price</p>
            <div className='flex items-center'>
              <input
                type='number'
                id='discountPrice'
                value={discountPrice}
                onChange={handleChange}
                min='50'
                max='400000000'
                required={offer}
                className='px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
              />
              {type === 'rent' && (
                <div className='ml-3'>
                  <p className='text-md text-gray-500 font-semibold'>
                    $ / month
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        <div className='mb-6 mt-6'>
          <p className='text-lg font-semibold'>Images</p>
          <p className='text-gray-600'>
            The first image will be the cover (max 6)
          </p>
          <input
            type='file'
            id='images'
            onChange={handleChange}
            accept='.jpg, .png, .jpeg'
            multiple
            required
            className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
          />
        </div>
        <button
          type='submit'
          className='w-full uppercase rounded bg-blue-600 text-white px-7 py-3 font-medium text-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out active:bg-blue-700'
        >
          create listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
