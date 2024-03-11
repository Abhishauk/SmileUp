import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { getDatas } from "../../Api/UserAxios";
import { useNavigate } from "react-router-dom";
import { SerachUser } from "../../Api/UserAxios";

const MessageModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showListModal, setShowListModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleIconClick = async () => {
    try {
      const responseData = await getDatas();
      const datas = responseData.data.datas;
      setData(datas);
      setShowListModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseList = () => {
    setShowListModal(false);
  };

  const handleProfile = (userId) => {
    const selected = data.find((item) => item._id === userId);
    setSelectedUsers([...selectedUsers, selected]);
    setShowListModal(false);
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
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          },
          content: {
            width: "500px",
            height: "460px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "20px",
            marginTop: "48px",
            backgroundColor: "white",
            border: "none"
          }
        }}
      >
        <div className={`self-end mt-2`} onClick={handleIconClick}>
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="cursor-pointer text-gray-500"
          />
        </div>

        {selectedUsers.length > 0 && (
          <div className="mt-4 bg-white p-4 w-full">
            <h2 className="font-semibold mb-2">Chat List</h2>
            <div className="grid grid-cols-1 gap-4 w-96">
              {selectedUsers.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border rounded-md p-4 cursor-pointer"
                >
                  <img
                    src={
                      item.profileImage ? item.profileImage : "Guest-user.PNG"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold mb-2">{item.UserName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* List Modal */}
      <Modal
        isOpen={showListModal}
        onRequestClose={handleCloseList}
        contentLabel="User List Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          },
          content: {
            width: "500px", // Same width as the main modal
            height: "460px", // Same height as the main modal
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "20px",
            marginTop: "48px",
            backgroundColor: "white",
            border: "none",
            transform: showListModal ? "translateX(0)" : "translateX(-100%)", // Slide from left to right
            transition: "transform 0.3s ease-in-out"
          }
        }}
      >
        <div>
          <div className="flex justify-between w-full">
            <input
              type="text"
              placeholder="Enter your search query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full h-10 rounded-l-lg bg-white"
            />
            <button
              onClick={handleSearch}
              className="bg-cyan-500 text-white px-4 py-2 h-10 rounded-r-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <h2 className="font-semibold mb-2">User List</h2>
          <div className="grid grid-cols-1 gap-4 w-96">
            {searchResults.map((item) => (
              <div
                key={item._id}
                className="flex items-center border rounded-md p-4 cursor-pointer"
                onClick={() => handleProfile(item._id)}
              >
                <img
                  src={item.profileImage ? item.profileImage : "Guest-user.PNG"}
                  alt=""
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex-grow">
                  <p className="font-semibold mb-2">{item.UserName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MessageModal;
