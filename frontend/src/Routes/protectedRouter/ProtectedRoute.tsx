import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../Redux/Slice/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isPublic?: boolean;
}

export const ProtectedRoute = ({ children, isPublic = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, token } = useAppSelector(state => state.auth);
  const allow = isAuthenticated && !!token;

  if (isPublic) {
    // Redirect authenticated users away from public routes
    return allow ? (
      <Navigate to="/dashboard" state={{ from: location.pathname }} replace />
    ) : (
      <>{children}</>
    );
  }

  // Redirect unauthenticated users trying to access protected routes
  return allow ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
  );
};