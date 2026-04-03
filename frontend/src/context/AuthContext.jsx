import { createContext, useContext, useEffect, useState } from "react";
import { useGetMe } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const { data, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (data?.data?.user) {
      setUser(data.data.user);
    } else {
      setUser(null);
    }
  }, [data, isError]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading: isLoading, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
