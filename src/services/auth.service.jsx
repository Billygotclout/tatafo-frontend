import http from "../helpers/http";

export const register = async (payload) => {
  const response = await http().post("/auth/signup", payload);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await http().post("/auth/forgot-password", {
    email: email,
  });

  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await http().post("/auth/reset-password", payload);
  return response.data;
};
