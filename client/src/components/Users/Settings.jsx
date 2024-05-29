import React from "react";
import Header from "../../components/Users/Header";
import Navbar from "../../components/Users/navbar";

const Settings = () => {
  const handlechangepass = () => {

    

  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 rounded-lg shadow-md">
      <Header />
      <div className="flex flex-1">
        <div className="w-full md:w-1/4">
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 mx-10 my-10 p-4 mt-20 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center bg-slate-100 p-4 ">
            Settings
          </h1>

          {/* Account Settings */}
          <div className="mb-6 flex flex-col flex-1 mx-10 my-10 p-4 mt-4 bg-white rounded-lg shadow-md ">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Account Settings
            </h2>

            <div className="flex items-center justify-center mb-3">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium text-sm">Enable Dark Mode</label>
            </div>
            <div className="flex items-center justify-center mb-3">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium text-sm">
                Show Email in Profile
              </label>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-6 flex flex-col flex-1 mx-10 my-10 p-4 mt-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Privacy Settings
            </h2>

            <div className="flex items-center justify-center mb-3">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium text-sm">
                Hide My Activity Status
              </label>
            </div>
            <div className="flex items-center justify-center mb-3">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium text-sm">
                Allow Tags from Everyone
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-6 flex flex-col flex-1 mx-10 my-10 p-4 mt-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Notifications
            </h2>

            <div className="flex items-center justify-center mb-3">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium text-sm">
                Receive Email Notifications
              </label>
            </div>
            <div className="flex items-center justify-center mb-3">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium text-sm">Push Notifications</label>
            </div>
          </div>

          {/* Security */}
          <div className="mb-6 flex flex-col flex-1 mx-10 my-10 p-4 mt-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Security</h2>

            <div className="flex items-center justify-center mb-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm" onClick={handlechangepass}>
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-center mb-3">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;