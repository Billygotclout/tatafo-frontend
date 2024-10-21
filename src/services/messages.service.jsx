import http from "../helpers/http";

export const sendMessage = async (payload) => {
  const response = await http().post("/messages/send-message", payload);

  return response.data;
};
