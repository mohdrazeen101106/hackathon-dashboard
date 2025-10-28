import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hd_user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("hd_token") || null);

  useEffect(() => {
    // set axios header if token exists
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete api.defaults.headers.common["Authorization"];
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token: tkn, user: u } = res.data;
    localStorage.setItem("hd_token", tkn);
    localStorage.setItem("hd_user", JSON.stringify(u));
    setToken(tkn);
    setUser(u);
    return u;
  };

  const register = async (payload) => {
    const res = await api.post("/api/auth/register", payload);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("hd_token");
    localStorage.removeItem("hd_user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
