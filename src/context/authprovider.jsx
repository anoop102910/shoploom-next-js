"use client"
import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ id: null, name: null, image: null });

  const login = () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          setUser({ id: null, name: null, image: null });
          localStorage.removeItem("token");
        } else {
          setIsAuthenticated(true);
          setUser({
            id: decodedToken.id,
            name: decodedToken.name,
            image: decodedToken.image,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser({ id: null, name: null, image: null });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const logout =  () => {
    setIsAuthenticated(false);
    setUser({ id: null, name: null, image: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
