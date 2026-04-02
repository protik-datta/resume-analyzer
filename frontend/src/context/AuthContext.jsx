import { createContext, useContext, useEffect, useState } from "react";
import { useGetMe } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const { data, isLoading, isError } = useGetMe();

  const loading = isLoading

  useEffect(()=> {
    if(data?.data?.user){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(data.data.user)
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
