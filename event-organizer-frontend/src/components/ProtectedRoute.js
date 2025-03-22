import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, redirectPath = '/', children, isAuthPage = false }) => {
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('role_id');

  if (token && isAuthPage) {
    if (userRole === '1') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === '2') {
      return <Navigate to="/manager-dashboard" replace />;
    } else if (userRole === '3') {
      return <Navigate to="/user-dashboard" replace />;
    }
  }

  if (!token && !isAuthPage) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRole && userRole !== requiredRole.toString()) {
    if (userRole === '1') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === '2') {
      return <Navigate to="/manager-dashboard" replace />;
    } else if (userRole === '3') {
      return <Navigate to="/user-dashboard" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;