import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus();
  if (checkStatus) {
    return <h1>Loading...</h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
