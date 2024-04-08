import React from 'react';
import Header from "../../components/Users/Header";
import Navbar from "../../components/Users/navbar";

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        <div className="w-full md:w-1/4">
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 mx-4 my-10 p-4">
          <h1 className="text-3xl font-semibold mb-4">Settings</h1>
          
          {/* Account Settings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            {/* Individual settings options */}
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium">Enable Dark Mode</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium">Show Email in Profile</label>
            </div>
            {/* Add more settings options as needed */}
          </div>

          {/* Privacy Settings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Privacy Settings</h2>
            {/* Individual settings options */}
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium">Hide My Activity Status</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium">Allow Tags from Everyone</label>
            </div>
            {/* Add more settings options as needed */}
          </div>

          {/* Notifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            {/* Individual settings options */}
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium">Receive Email Notifications</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <label className="font-medium">Push Notifications</label>
            </div>
            {/* Add more settings options as needed */}
          </div>

          {/* Security */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Security</h2>
            {/* Individual settings options */}
            <div className="flex items-center mb-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Change Password</button>
            </div>
            <div className="flex items-center mb-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
            </div>
            {/* Add more settings options as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
