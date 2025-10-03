import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If there's a token, render the child components (the protected page).
  // Otherwise, redirect to the /auth page.
  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
