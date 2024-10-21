import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages, getUserById } from "../services/user.service"; // Make sure sendMessage is imported
import { useAuth } from "../hooks/useAuth";
import Pusher from "pusher-js";
import { sendMessage } from "../services/messages.service";
const Chat = () => {
  const { userId } = useParams(); // ID of the user you're chatting with
  const { user } = useAuth(); // Logged-in user's data
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserById(userId);
      setReceiver(userData);
    };

    const fetchMessages = async () => {
      const messagesData = await getMessages(user._id, userId);
      setMessages(messagesData);
    };

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });

    // Subscribe to both channels - one for sent messages, one for received
    const receivingChannel = pusher.subscribe(`chat-${user._id}`);
    const sendingChannel = pusher.subscribe(`chat-${userId}`);

    // Handle incoming messages on both channels
    const messageHandler = (data) => {
      console.log("New message received:", data);
      setMessages((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some((msg) => msg._id === data._id);
        if (messageExists) return prevMessages;
        return [...prevMessages, data];
      });
    };

    receivingChannel.bind("new-message", messageHandler);
    sendingChannel.bind("new-message", messageHandler);

    fetchUserData();
    fetchMessages();

    return () => {
      receivingChannel.unbind_all();
      sendingChannel.unbind_all();
      pusher.unsubscribe(`chat-${user._id}`);
      pusher.unsubscribe(`chat-${userId}`);
    };
  }, [userId, user?._id]);
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const sentMessage = await sendMessage({
        receiverId: userId,
        message: newMessage,
      });

      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">
        Chat with {receiver?.username}
      </h1>

      {/* Messages */}
      <div className="border p-5 rounded-md h-[500px] overflow-y-auto mb-5">
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg, index) => (
              <li
                key={`${msg?._id}-${index}`} // Combine _id with index for uniqueness
                className={`flex ${
                  msg?.senderId === user?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-tl-md rounded-bl-md rounded-br-md max-w-xl ${
                    msg?.senderId === user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{msg?.message}</p>
                  <span className="text-xs text-gray-600 mt-2 block">
                    {formatTimestamp(msg?.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Message Input */}
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-1"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 ml-3 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
