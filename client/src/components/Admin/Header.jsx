import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setadminLogout } from '../../state/slice';
import {useNavigate} from "react-router-dom"


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Logout = () =>{
    dispatch(setadminLogout())
    navigate("/adminLogin")
  
  }

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                {/* Logo or company name */}
              </div>
              <div className="">
                <div className="flex space-x-12">
                  {/* Navigation links */}
                  <Link
                    to="/dashboard"
                    className="text-black hover:bg-white-700 hover:text-gray-300 rounded-md px-3 py-2 font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/adminhome"
                    className="text-black hover:bg-white-700 hover:text-gray-300 rounded-md px-3 py-2 font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/users"
                    className="text-black hover:bg-white-700 hover:text-gray-300 rounded-md px-3 py-2 font-medium"
                  >
                    Users
                  </Link>
                  <Link
                    to="/posts"
                    className="text-black hover:bg-white-700 hover:text-gray-300 rounded-md px-3 py-2 font-medium"
                  >
                    Posts
                  </Link>
                  <Link
                    to="/ads"
                    className="text-black hover:bg-white-700 hover:text-gray-300 rounded-md px-3 py-2 font-medium"
                  >
                    Ads
                  </Link>
                  <Link
                    to="/verify"
                    className="text-black hover:bg-white-700 hover:text-gray-300 rounded-md px-3 py-2 font-medium"
                  >
                    Verify
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-11 w-11 rounded-full"
                    src="https://images.unsplash.com/photo-1605122897309-17343bb5bfb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NjI3ODM1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </button>
                <button onClick={Logout} type="button" className="ml-2 text-black text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Replace the href values with actual routes */}
            <Link
              to="/dashboard"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              // aria-current="page"
            >
              Dashboard
            </Link>
            <Link
              to="/team"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/team"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Users
            </Link>
            <Link
              to="/projects"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Posts
            </Link>
            <Link
              to="/calendar"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Ads
            </Link>
            <Link
              to="/team"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Verify
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
