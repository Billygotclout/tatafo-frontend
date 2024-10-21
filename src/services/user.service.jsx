import http from "../helpers/http";

export const getUsers = async () => {
  const response = await http().get("/messages/get-users");
  return response.data;
};
export const getMessages = async (senderId, receiverId) => {
  const response = await http().get(
    `/messages/conversation/${senderId}/${receiverId}`
  );
  return response.data;
};
export const getUserById = async (userId) => {
  const response = await http().get(`/auth/user/${userId}`);
  return response.data;
};
