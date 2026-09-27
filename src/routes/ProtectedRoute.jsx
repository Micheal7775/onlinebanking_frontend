import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // No login
  if (!token || !role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Wrong role
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;