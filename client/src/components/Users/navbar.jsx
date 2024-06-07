import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faEnvelope,
  faPlus,
  faBell,
  faCog,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, clearUser, clearToken } from "../../state/slice";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";
import SearchModal from "./SearchModal";
import MessageModal from "./Messages";
import { createpost } from "../../Api/PostAxios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authslice.user);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const Logout = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    dispatch(setLogout());
    navigate("/userLogin");
  };

  const openCreatePostModal = () => setCreatePostModalOpen(true);
  const closeCreatePostModal = () => setCreatePostModalOpen(false);

  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  const openMessageModal = () => setMessageModalOpen(true);
  const closeMessageModal = () => setMessageModalOpen(false);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-300 rounded-xl w-44 fixed left-10 top-20 py-1 px-2">
      <nav>
        <ul className="text-white">
          <li className="mb-2">
            <button
              onClick={() => navigate("/Home")}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={openSearchModal}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={openMessageModal}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Messages
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={openCreatePostModal}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
            </button>
          </li>
          <li className="mb-2">
            <button
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notification
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigate("/Settings")}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={Logout}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/Profile")}
              className="block w-full text-left hover:bg-white hover:text-black py-1 px-2 rounded transition duration-300 text-xs cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </button>
          </li>
        </ul>
      </nav>

      <CreatePostModal
        isModalOpen={isCreatePostModalOpen}
        closeModal={closeCreatePostModal}
        handleVideoDrop={(file) => {
          createpost(file, user);
          setVideoFile(file);
        }}
        videoFile={videoFile}
      />

      <SearchModal isOpen={isSearchModalOpen} onRequestClose={closeSearchModal} />

      <MessageModal isOpen={isMessageModalOpen} onRequestClose={closeMessageModal} />
    </div>
  );
};

export default Navbar;
