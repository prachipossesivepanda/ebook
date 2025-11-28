import { Navigate, useLocation } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { getStoredSession } from '../utils/session';

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requireScope,
  fallback = '/admin/unauthorized',
}) => {
  const location = useLocation();
  const session = getStoredSession();

  if (!session?.isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const role = session.role || ROLES.USER;
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to={fallback} replace />;
  }

  // Support both new scope structure and legacy top-level vendorId
  if (requireScope === 'vendor' && !(session?.scope?.vendorId || session?.vendorId)) {
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;

