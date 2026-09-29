import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // =====================================================
  // NO ACTIVE LOGIN SESSION
  // =====================================================

  if (!token || !role) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // =====================================================
  // ROLE NOT ALLOWED
  // =====================================================

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  // =====================================================
  // AUTHORIZED
  // =====================================================

  return <Outlet />;
}

export default ProtectedRoute;