import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { ROUTES } from '../constants/routes';

const ProtectedRoute = ({ children, requireAuth = false, requireCart = false }) => {
  const { isAuthenticated } = useAuthStore();
  const { items } = useCartStore();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requireCart && items.length === 0) {
    return <Navigate to={ROUTES.DULCERIA} replace />;
  }

  return children;
};

export default ProtectedRoute;
