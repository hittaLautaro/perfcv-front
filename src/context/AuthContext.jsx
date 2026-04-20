import { createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuthHook from "../Auth/hooks/useAuth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authKey, setAuthKey] = useState(0);
  const queryClient = useQueryClient();
  const auth = useAuthHook(queryClient);

  const forceUpdate = () => {
    setAuthKey((prev) => prev + 1);
  };

  return (
    <AuthContext.Provider value={{ ...auth, forceUpdate }} key={authKey}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
