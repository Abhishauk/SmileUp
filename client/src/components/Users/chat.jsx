
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import socket from "./socketio"; 

const ChatModal = ({ isOpen, onRequestClose, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      socket.emit("joinRoom", user._id);

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit("leaveRoom", user._id);
        socket.off("message");
      };
    }
  }, [isOpen, user]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: "currentUserId", // Replace with actual sender ID
        content: newMessage,
        timestamp: new Date(),
      };
      socket.emit("sendMessage", { roomId: user._id, message: messageData });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Chat Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "40%",
          height: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "20px",
          backgroundColor: "white",
          border: "none",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col w-full h-full">
        <h2 className="font-semibold mb-2">Chat with {user.UserName}</h2>
        <div
          className="flex-grow overflow-auto p-2 border rounded mb-2"
          style={{ height: "300px" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                msg.sender === "currentUserId" ? "bg-blue-100 self-end" : "bg-gray-100"
              }`}
            >
              <p>{msg.content}</p>
              <small className="text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
        <div className="flex w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-300 p-2 h-10 rounded-l-lg bg-white flex-grow"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-cyan-500 text-white px-4 py-2 h-10 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
