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
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, clearUser, clearToken } from "../../state/slice";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";
import SearchModal from "./SearchModal";
import { createpost } from "../../Api/PostAxios";
import { SerachUser } from "../../Api/UserAxios";
import MessageModal from "./Messages";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authslice.user);

  const Logout = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    dispatch(setLogout());
    navigate("/userLogin");
  };

  const handleClick = () => {
    const userId = user._id;
    navigate("/Profile");
  };

  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isMessageModalOpen,setMessageModalOpen] = useState(false);

  const openCreatePostModal = () => {
    setCreatePostModalOpen(true);
  };
  const closeCreatePostModal = () => {
    setCreatePostModalOpen(false);
  };

  const home = () => {
    navigate("/Home");
  };

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };
  const openMessageModal = () => {
    setMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  const [videoFile, setVideoFile] = useState(null);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-300 ... rounded-3xl w-1/5 fixed left-0 py-4 px-2 mt-10 ml-20 mb-40 h-96 ">
      <nav>
        <ul>
          <li className="mb-2">
            <a
              onClick={home}
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-2">
            <a
              onClick={openSearchModal}
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-2">
            <a
              onClick={openMessageModal}
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Messages
            </a>
          </li>
          <li className="mb-2">
            <a
              onClick={openCreatePostModal}
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notification
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
            </a>
          </li>
          <li>
            <a
              onClick={Logout} // Removed unnecessary arrow function
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </a>
          </li>
          <li>
            <a
              onClick={handleClick}
              className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </a>
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

<SearchModal
        isOpen={isSearchModalOpen}
        onRequestClose={closeSearchModal}
      />

      <MessageModal
           isOpen={isMessageModalOpen}
           onRequestClose={closeMessageModal}
           />
    </div>
  );
};

export default Navbar;
