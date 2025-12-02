import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Auth/Login/page.jsx";
import SignupPage from "./Auth/Signup/page.jsx";
import TemplatesPage from "./Templates/page.jsx";
import LandingPage from "./Landing/page.jsx";

import PrivateLayout from "./layouts/PrivateLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import LoadingPage from "./global/components/LoadingPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return (
    <Routes>
      {/* Root Route: Redirects to templates if authenticated, else shows Landing */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/templates" /> : <LandingPage />}
      />

      {/* Public Routes (Accessible by anyone) */}
      <Route path="/templates" element={<TemplatesPage />} />

      {/* Auth Routes (Only for unauthenticated users) */}
      <Route element={<PublicLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Route>

      {/* Private Routes (Only for authenticated users) */}
      <Route element={<PrivateLayout />}>
        {/* Add private routes here in the future */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
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
