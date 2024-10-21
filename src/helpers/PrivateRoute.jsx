import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import http from "./http";

const PrivateRoute = () => {
  const { isLoading, setIsLoading, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getUser = async () => {
        try {
          setIsLoading(true);
          const response = await http().get("/auth/current-user", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response) {
            navigate("/login");
          }
          setIsLoading(false);
          setUser(response.data.user);
        } catch (err) {
          console.log(err);

          toast.error(err.message);
          localStorage.removeItem("token");
          // Redirect to login page
          window.location.href = "/login";
        }
      };
      getUser();
    }
  }, []);
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
