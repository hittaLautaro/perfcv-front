import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Auth/hooks/useAuth.js";
import LoadingPage from "../global/components/LoadingPage.jsx";

const PublicLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicLayout;
