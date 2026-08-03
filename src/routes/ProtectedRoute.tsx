import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ children, allowedRoles, redirectTo = '/login' }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace/>;
  }

  if (!allowedRoles.includes(user.tipo)) {
    return <Navigate to={redirectTo} replace/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
