import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isAuthenticated = localStorage.getItem("Authorization") != null;

  if (!isAuthenticated) {
    // Redirect to login, preserving where they tried to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
