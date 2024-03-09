import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { createpost } from "../../Api/PostAxios";
import { faTimes, faShare } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const ModalContent = ({
  closeModal,
  videoFile,
  setVideoFile,
  updateModalStatus
}) => {
  const user = useSelector(state => state.authslice.user);

  const handleVideoDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    setVideoFile(file);
  };

  const sharePost = async () => {
    if (videoFile) {
      try {
        // Assuming createpost function is defined
        await createpost(videoFile, user);
        updateModalStatus(false); // Update modal status to close it
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <button onClick={closeModal} className="text-xl absolute top-4 right-4">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h1 className="text-2xl font-bold mb-4 ml-2">Create Post</h1>

      {/* Drop zone and custom upload button */}
      <div
        className="bg-cyan-500 text-white rounded-md px-2 py-2 cursor-pointer mb-4 "
        onClick={() => document.getElementById("videoInput").click()}
      >
        <p className="mb-0">Upload Video</p>
      </div>
      <input
        id="videoInput"
        type="file"
        accept="video/*"
        onChange={e => handleVideoDrop(e.target.files)}
        className="hidden"
      />

      {/* Drop zone */}
      <div
        className="border-dashed border-2 border-gray-300 rounded-md px-4 py-2 cursor-pointer mb-4"
        onDrop={e => {
          e.preventDefault();
          handleVideoDrop(e.dataTransfer.files);
        }}
        onDragOver={e => e.preventDefault()}
      >
        <p>Drop Video Here</p>
      </div>

      {videoFile &&
        <div className="ml-5">
          <video
            width="250"
            height="200"
            controls
            className="uploaded-video mt-5"
          >
            <source
              src={URL.createObjectURL(videoFile)}
              type={videoFile.type}
            />
          </video>

          <button
            onClick={sharePost}
            className="bg-cyan-500 text-white rounded p-2 mt-2"
          >
            Share
            <FontAwesomeIcon icon={faShare} className="ml-2" />
          </button>
        </div>}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Add mobile menu content here */}
        </div>
      </div>
    </div>
  );
};
const CreatePostModal = ({ isModalOpen, closeModal, setVideoFile }) => {
  const [modalStatus, setModalStatus] = useState(isModalOpen);
  const [videoFile, setVideoFileLocal] = useState(null);

  const updateModalStatus = status => {
    setModalStatus(status);
  };

  useEffect(
    () => {
      setModalStatus(isModalOpen);
    },
    [isModalOpen]
  );

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={closeModal}
      contentLabel="Create Post Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
          width: "90%", 
          maxWidth: "500px", 
          height: "80vh", 
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "white",
          marginTop:"50px",
        }
      }}
    >
      <ModalContent
        closeModal={closeModal}
        videoFile={videoFile}
        setVideoFile={setVideoFileLocal}
        updateModalStatus={updateModalStatus}
      />
      {/* Mobile View Menu */}
      <div className="sm:hidden fixed inset-0 bg-black bg-opacity-75 z-50">
        <div className="p-4">
          <p className="text-white">Mobile Menu Content</p>
          {/* Add more content or components as needed */}
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
