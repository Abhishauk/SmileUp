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

      {searchResults.length > 0 && (
       <div className="mt-4">
       <h3 className="text-lg font-bold mb-2">Search Results:</h3>
       <div className="grid grid-cols-1 gap-4 w-96 ">
         {searchResults.map((user , index) => (
            <div key={user._id} className="flex items-center border rounded-md p-4">
            <img
              src={user.profileImage ? user.profileImage : "Guest-user.PNG"}
              alt=""
              onClick={() => handleprofile(user._id)}
              className="w-10 h-10 rounded-full mr-4"
            />
             <div className="flex-grow">
               <p className="font-semi-bold mb-2">{user.UserName}</p>
             </div>
             <div className="">
             <button
                  style={{ backgroundColor: isFollowedArray[index] ? 'black' : 'cyan', color: 'white'}}
                  className="px-2 py-2 rounded-md"
                  onClick={() => handleButtonClick(index)}
                >
                  {isFollowedArray[index] ? 'Unfollow' : 'Follow'}
                </button>
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
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
          width: "500px",
          height: "488px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          marginTop:"48px"
        }
      }}
    >
      <ModalContent onRequestClose={onRequestClose} />
    </Modal>
  );
};

export default SearchModal;
