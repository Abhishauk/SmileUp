import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Users/Header";
import Navbar from "../../components/Users/navbar";
import { userProfile } from "../../Api/UserAxios";

const Profile = () => {
  const user = useSelector((state) => state.authslice.user);
  const [profilePicture, setProfilePicture] = useState(
    user ? user.profilePicture : ""
  );

  const handleProfilePictureChange = (e) => {
    console.log("**********", user);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
      userProfile(selectedFile,user);
    }
  };

  return (
    <div>
      <div>
        <Header />
        <Navbar />
      </div>
      <div className="mt-10 p-4 ml-96 mr-16">
        <div className="bg-white rounded-md p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>

          <div className="mb-4">
            <div className="flex items-center">
              <div className="mr-4">
                <label
                  htmlFor="profilePictureInput"
                  className="cursor-pointer hover:underline"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePictureInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <div>
                <img
                  src={profilePicture || "URL_OF_DEFAULT_PROFILE_IMAGE"}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">User Information:</h3>
            {/* Display user information here */}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Other Content:</h3>
            <p>This is some other content related to the user's profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
