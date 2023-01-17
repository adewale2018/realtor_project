import { Navigate, Outlet } from 'react-router';

import React from 'react';
import Spinner from '../spinner/Spinner';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus();
  if (checkStatus) {
    return <Spinner />
  }
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
