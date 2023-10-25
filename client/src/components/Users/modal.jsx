import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import Dropzone from "react-dropzone";
import { createpost } from "../../Api/PostAxios";
import { faTimes, faShare } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const ModalContent = ({ closeModal, handleVideoDrop, videoFile, setVideoFile }) => {
  const user = useSelector((state) => state.authslice.user);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    handleVideoDrop(file);
    setVideoFile(file); // Update the video file state
  };

  const sharePost = async () => {
    if (videoFile) {
      try {
        createpost(videoFile, user);
      } catch (error) {
        // Handle the error, e.g., show an error message.
        console.error("Error uploading video:", error);
      }
    }

    // Close the modal
    closeModal();
  };

  return (
    <div>
      <button onClick={closeModal} className="text-xl absolute top-4 right-4">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>Create Post</h2>
      {/* Video Upload */}
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop a video file here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {videoFile && (
        <div>
          <h2>Selected Video</h2>
          <video width="320" height="240" controls>
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
          </video>

          <button onClick={sharePost} className="bg-blue-500 text-white rounded p-2 mt-2">
            Share
            <FontAwesomeIcon icon={faShare} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

const CustomModal = ({ isModalOpen, closeModal, handleVideoDrop, videoFile, setVideoFile }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Create Post Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "600px",
          height: "600px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        },
      }}
    >
      <ModalContent closeModal={closeModal} handleVideoDrop={handleVideoDrop} videoFile={videoFile} setVideoFile={setVideoFile} />
    </Modal>
  );
};

export default CustomModal;
