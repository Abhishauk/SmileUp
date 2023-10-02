import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEnvelope, faPlus, faBell, faCog, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state/slice';
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.authslice.user)
  console.log("8989898",user);


const Logout = () =>{
  dispatch(setLogout())
    navigate("/userLogin")

}
const handleClick = () => {
  const userId =user.user._id;
  navigate('/Profile')
}

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-300 ...  rounded-3xl 
    
    
    w-1/5 fixed left-0 py-4 px-2 mt-5 ml-20 mb-40 h-96 ">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Messages
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
            </a>
          </li>
          <li>
            <a href="#" className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notification
            </a>
          </li>
          <li>
            <a href="#" className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
            </a>
          </li>
          <li>
            <a onClick={() => Logout()} className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </a>
          </li>
          <li>
            <a onClick={handleClick}  className="block text-white hover:bg-white hover:text-black py-2 px-4 rounded transition duration-300">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
