import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

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
    navigate('/');
    toast.success('Successfully log out');
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

  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Profile</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
          <form>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              className={` ${
                isEditing && 'bg-red-200 focus:bg-red-200'
              } mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out`}
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
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out '
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
                  className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1'
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
        </div>
      </section>
    </>
  );
};

export default Profile;
