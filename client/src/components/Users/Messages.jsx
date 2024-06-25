
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getDatas, SerachUser } from "../../Api/UserAxios";
import ChatModal from "./chat";


const MessageModal = ({ isOpen, onRequestClose }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (isOpen) {
      handleIconClick();
    }
  }, [isOpen]);

  const handleIconClick = async () => {
    try {
      const responseData = await getDatas();
      const datas = responseData.data.datas;
      setData(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProfile = (user) => {
    setCurrentChat(user);
    setChatModalOpen(true);
  };

  const handleSearch = async () => {
    try {
      const response = await SerachUser(searchQuery);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Message Modal"
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
        <div className="flex items-center mb-4 w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 h-10 rounded-l-lg bg-white flex-grow"
            style={{ maxWidth: "calc(100% - 60px)" }}
          />
          <button
            onClick={handleSearch}
            className="bg-cyan-500 text-white px-4 py-2 h-10 rounded-r-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l5.6 5.58a1 1 0 11-1.41 1.42l-5.58-5.6zm-6.4 0a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
          {(searchQuery.length ? searchResults : data).map((item) => (
            <div
              key={item._id}
              className="flex items-center border rounded-md p-4 cursor-pointer"
              onClick={() => handleProfile(item)}
            >
              <img
                src={item.profileImage || "Guest-user.PNG"}
                alt=""
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="flex-grow">
                <p className="font-semibold mb-2">{item.UserName}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {chatModalOpen && currentChat && (
        <ChatModal
          isOpen={chatModalOpen}
          user={currentChat}
          onRequestClose={() => setChatModalOpen(false)}
        />
      )}
    </>
  );
};

export default MessageModal;
