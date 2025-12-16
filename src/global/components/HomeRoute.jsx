import LandingPage from "../../Landing/page.jsx";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const HomeRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return isAuthenticated ? <Navigate to="/templates" /> : <LandingPage />;
};

export default HomeRoute;
