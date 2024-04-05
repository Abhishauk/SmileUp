import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SerachUser } from "../../Api/UserAxios";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

const ModalContent = ({ onRequestClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFollowedArray, setIsFollowedArray] = useState([]);

  const handleSearch = async () => {
    console.log("//////", searchQuery);
    try {
      // Assuming SerachUser returns an object with a 'data' property
      const response = await SerachUser(searchQuery);
      console.log("3333333333", response.data.users);

      // Assuming the user data is in response.data.users
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Error searching for users:", error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const handleprofile = (userId) => {
    navigate(`/SearchProfile/${userId}`); // Navigate to the search profile page with user ID
  };

  const handleButtonClick = (index) => {
    // Create a new array with the updated isFollowed value for the clicked user
    setIsFollowedArray((prev) => {
      const newArray = prev.slice(); // Create a shallow copy of the previous array
      newArray[index] = !newArray[index]; // Toggle the boolean value at the specified index
      return newArray;
    });
  };

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={onRequestClose}
        className="text-xl absolute top-4 right-4"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="flex justify-between w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-40 h-8 rounded-l-lg bg-white text-xs"
          style={{ minWidth: "100px" }} // Set minimum width for the input field
        />
        <button
          onClick={handleSearch}
          className="bg-cyan-500 text-white px-2 py-1 h-8 rounded-r-lg"
          style={{ minWidth: "30px" }} // Set minimum width for the search button
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold mb-2">Search Results:</h3>
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((user, index) => (
              <div
                key={user._id}
                className="bg-white rounded-md shadow-md p-4 w-64"
              >
                <div className="flex items-center">
                  <img
                    src={
                      user.profileImage
                        ? user.profileImage
                        : "Guest-user.PNG"
                    }
                    alt=""
                    onClick={() => handleprofile(user._id)}
                    className="w-10 h-10 rounded-full mr-4 cursor-pointer"
                  />
                  <div>
                    <p className="font-semi-bold mb-1 text-sm">
                      {user.UserName}
                    </p>
                    <button
                      style={{
                        backgroundColor: isFollowedArray[index]
                          ? "black"
                          : "cyan",
                        color: "white",
                      }}
                      className="px-2 py-1 rounded-md text-xs"
                      onClick={() => handleButtonClick(index)}
                    >
                      {isFollowedArray[index] ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Search Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "50%", // Adjust the width as a percentage of the modal box
          height: "80%", // Adjust the height as a percentage of the modal box
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          marginTop: "10px",
        },
      }}
    >
      <ModalContent onRequestClose={onRequestClose} />
    </Modal>
  );
};

export default SearchModal;
