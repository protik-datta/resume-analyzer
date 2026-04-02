import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const { data, isLoading, isError } = getMe();

  const loading = isLoading

  useEffect(()=> {
    if(data?.user){
      setUser(data.user)
    } else {
      setUser(null)
    }
  },[data])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)
