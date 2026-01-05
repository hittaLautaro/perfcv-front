const BASE_URL = import.meta.env.VITE_BACK_BASE_URL;

export const authenticatedFetch = async (endpoint, options = {}) => {
  const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const url = `${BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: getHeaders(),
    credentials: "include",
  };

  let response = await fetch(url, config);

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newAccessToken = data.accessToken;
        
        localStorage.setItem("accessToken", newAccessToken);

        const newConfig = {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${newAccessToken}`,
          },
          credentials: "include",
        };
        
        return fetch(url, newConfig);
      } else {
        localStorage.removeItem("accessToken");
        return response; 
      }
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      localStorage.removeItem("accessToken");
      return response; 
    }
  }

  return response;
};
