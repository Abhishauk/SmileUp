import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { changePass } from "../../Api/UserAxios";

Modal.setAppElement("#root");

const ModalContent = ({ onRequestClose, userId }) => {
  console.log("kk",userId);
  const [pass, setPass] = React.useState({
    currentPassword: "",
    newPassword: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setPass(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSetPass = async () => {
    if (pass.currentPassword && pass.newPassword) {
      const respo = await changePass(pass, userId);
      console.log("0000", respo);
    } else {
      console.log("Please fill in both fields");
    }
  };

  return (
    <div>
      <button
        onClick={onRequestClose}
        className="text-xl absolute top-4 right-4"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="flex flex-col items-center w-full space-y-4 justify-center">
        <input
          type="password"
          placeholder="Enter Current Password"
          name="currentPassword"
          value={pass.currentPassword}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="password"
          placeholder="Enter New Password"
          name="newPassword"
          value={pass.newPassword}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm w-full"
          onClick={handleSetPass}
        >
          Set Password
        </button>
      </div>
    </div>
  );
};

const ChangePassModal = ({ isOpen, onRequestClose, userId }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Setting Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
          width: "50%",
          height: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          marginTop: "10px"
        }
      }}
    >
      <ModalContent onRequestClose={onRequestClose} userId={userId} />
    </Modal>
  );
};

export default ChangePassModal;
