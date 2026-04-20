import { useState, useEffect, useCallback } from "react";
import { authenticatedFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const useAuth = (queryClient) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = useCallback(
    async (credentials) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_BASE_URL}/api/auth/authenticate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const text = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { message: text || "Login failed" };
        }
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);

      try {
        const userResponse = await authenticatedFetch('/api/auth/me');

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }
      } catch (error) {
      }

      navigate("/");
      return data;
    },
    [navigate]
  );

  const register = useCallback(
    async (credentials) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const text = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { message: text || "Registration failed" };
        }
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);

      try {
        const userResponse = await authenticatedFetch('/api/auth/me');

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }
      } catch (error) {
      }

      navigate("/");
      return data;
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    // Clear local data first to prevent any race conditions
    localStorage.removeItem("accessToken");
    setUser(null);

    // Clear React Query cache to remove previous user's data
    if (queryClient) {
      queryClient.clear();
    }

    // Call backend to invalidate refresh token
    try {
      await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }

    navigate("/");
  }, [navigate, queryClient]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await authenticatedFetch('/api/auth/me');

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
  }, [user]);

  return { user, login, logout, register, isAuthenticated: !!user, loading };
};

export default useAuth;
