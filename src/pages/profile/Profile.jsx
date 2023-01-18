import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

import { HiOutlineHome } from 'react-icons/hi';
import { actions as Mixpanel } from '../../components/mixpanel/MixPanel';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
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
    navigate('/sign-in');
    toast.success('Successfully log out');
    Mixpanel.track('Log out');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update the display name in the firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in firestore
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success('Profile successfully updated');
    } catch (error) {
      toast.error('Unable to update the profile');
    }
  };
  const handleDetailChange = () => {
    setIsEditing((prevState) => !prevState);
    isEditing && onSubmit();
  };
  const { name, email } = formData;

  useEffect(() => {
    Mixpanel.track('Visit profile page');
  }, []);

  return (
    <>
      <section className=' max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              className={` ${
                isEditing && 'bg-red-200 focus:bg-red-200'
              } mb-6 w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out`}
              placeholder='Name'
              id='name'
              name='name'
              value={name}
              onChange={handleChange}
              disabled={isEditing ? false : true}
              autoFocus={isEditing ? true : false}
            />
            <label htmlFor='name'>Email:</label>
            <input
              type='email'
              className='mb-6 w-full text-sm px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out '
              placeholder='Email'
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
              readOnly
            />
            <div className='flex justify-between whitespace-pre-wrap text-sm sm:text-lg mb-6'>
              <p>
                Do you want to change your name?{' '}
                <span
                  onClick={handleDetailChange}
                  className='text-red-600 hover:text-red-700  font-semibold transition ease-in-out duration-200 cursor-pointer ml-1'
                >
                  {isEditing ? 'Apply changes' : 'Edit'}
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
          <button
            type='submit'
            className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
          >
            <Link
              to='/create-listing'
              className='flex justify-center items-center'
            >
              <HiOutlineHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
