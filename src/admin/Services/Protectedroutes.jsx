import { Navigate } from 'react-router-dom';

// Mock user data - replace with actual auth logic
const getUserRole = () => {
  // In real app, get from localStorage/context/redux
  return localStorage.getItem('userRole') || 'super_admin';
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userRole = getUserRole();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

