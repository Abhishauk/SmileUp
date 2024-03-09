import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userStrg = localStorage.getItem("user");
  const users = userStrg ? JSON.parse(userStrg) : null;
  const user = useSelector((state) => state.authslice.user);
  console.log(user);
  return (
    <div className="">
      <nav className="fixed top-0 w-full bg-gradient-to-r from-cyan-500 to-blue-300 z-10">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 j">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
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
                {/* <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        ></img> */}
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-">
                  {/* Replace the href values with actual routes */}
                  <Link
                    to="/dashboard"
                    className=" text-white rounded-md  text-lg font-medium"
                    aria-current="page"
                  >
                    SmileUp
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3 flex items-center">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5" />
                  <img
                    className="h-11 w-11 rounded-full "
                    src={user ? users.user.profileImage : "Guest-user.PNG"}
                    alt=""
                  />
                </button>
                <div className="text-end">
                  <span className="text-white text-sm ml-2">
                    {user ? users.user.UserName : "Guest"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/dashboard"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              SmileUp
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
