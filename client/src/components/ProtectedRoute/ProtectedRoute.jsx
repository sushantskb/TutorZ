import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
