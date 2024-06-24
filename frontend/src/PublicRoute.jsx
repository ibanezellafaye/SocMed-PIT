// PublicRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ user }) => {
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
