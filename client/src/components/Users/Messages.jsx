import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { getDatas } from "../../Api/UserAxios";
import { useNavigate } from "react-router-dom";

const MessageModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // State to manage the selected users
  const [showList, setShowList] = useState(false); // State to manage whether to show the list items or not

  const handleIconClick = async () => {
    try {
      const responseData = await getDatas();
      console.log("``````````", responseData.data.datas);
      const datas = responseData.data.datas;
      setData(datas);
      setShowList(!showList); // Toggle the list visibility
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseList = () => {
    setShowList(false); // Close the list items
  };

  const handleprofile = (userId) => {
    const selected = data.find((item) => item._id === userId);
    setSelectedUsers([...selectedUsers, selected]); // Add the selected user to the list
    setShowList(false); // Hide the list when a user is selected
  };

  return (
    <>
      {selectedUsers.length > 0 && (
        <div className="absolute top-0 left-0 right-0 bg-white p-4 z-50">
          <h2 className="font-semibold mb-2">Selected Users:</h2>
          <ul>
            {selectedUsers.map((user) => (
              <li key={user._id}>{user.UserName}</li>
            ))}
          </ul>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Message Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "500px",
            height: "488px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start", // Align items to the left
            padding: "20px",
            marginTop: "48px",
            backgroundColor: "white", // Set background color to white
            border: "none", // Remove border
          },
        }}
      >
        <div className={`self-end mt-2 ${showList ? 'hidden' : ''}`}>
          <FontAwesomeIcon
            icon={faSquarePlus}
            onClick={handleIconClick} // Toggle between opening and closing the list
            className="cursor-pointer text-gray-500"
          />
        </div>

        {showList && (
          <div className="mt-4 bg-white">
            <div className="grid grid-cols-1 gap-4 w-96">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border rounded-md p-4 cursor-pointer"
                  onClick={() => handleprofile(item._id)}
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
        )}
      </Modal>
    </>
  );
};

export default MessageModal;
