import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEnvelope, faPlus, faBell, faCog, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="bg-gray-800 h-screen w-1/5 fixed left-0 py-4 px-2">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Messages
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
            </a>
          </li>
          <li>
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notification
            </a>
          </li>
          <li>
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
            </a>
          </li>
          <li>
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </a>
          </li>
          <li>
            <a href="#" className="block text-white hover:bg-gray-600 py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
