import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const OAuthButton = () => {
  const navigate = useNavigate()
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider)
      const user  = res.user

      // Check if the user already exist in the database
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      toast.success('Success')
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong, try again!')

    }
  };
  return (
    <button
      type='button'
      onClick={onGoogleClick}
      className='flex items-center justify-center w-full bg-red-700 text-white py-3 rounded uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'
    >
      <FcGoogle className='mr-2' />
      Continue with Google
    </button>
  );
};

export default OAuthButton;
