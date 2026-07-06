import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  // 🔍 Determine the proper login path based on current location
  const getRedirectLoginPath = () => {
    const path = location.pathname.toLowerCase();

    if (path.startsWith('/teacher')) return '/teacher/sir-login';
    if (path.startsWith('/admin')) return '/admin/log-in';
    if (path.startsWith('/home') || path.startsWith('/student')) return '/log-in';

    // default fallback
    return '/log-in';
  };

  if (!user) {
    return <Navigate to={getRedirectLoginPath()} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
