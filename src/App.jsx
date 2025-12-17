import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Auth/Login/page.jsx";
import SignupPage from "./Auth/Signup/page.jsx";
import TemplatesPage from "./Templates/page.jsx";
import TemplateDetail from "./Templates/TemplateDetail.jsx";
import LandingPage from "./Landing/page.jsx";
import AccountPage from "./Account/page.jsx";

import PrivateLayout from "./layouts/PrivateLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import LoadingPage from "./global/components/LoadingPage.jsx";
import OAuthCallback from "./Auth/Callback/page.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
    },
  },
});

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/templates" /> : <LandingPage />}
        />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/:id" element={<TemplateDetail />} />
        <Route element={<PrivateLayout />}>
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
