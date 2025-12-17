import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingPage from "../global/components/LoadingPage.jsx";

const PrivateLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateLayout;
