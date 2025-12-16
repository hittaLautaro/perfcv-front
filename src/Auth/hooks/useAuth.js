import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
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
        const userResponse = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

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
        const userResponse = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

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

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

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
