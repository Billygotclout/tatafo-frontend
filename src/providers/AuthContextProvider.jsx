import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import http from "../helpers/http";
import { register } from "../services/auth.service";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await http().post("/auth/signin", {
        email: email,
        password: password,
      });

      if (response.data) {
        localStorage.setItem("token", response.data.token);

        setUser(response.data.user);

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLoading,
        setIsLoading,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
