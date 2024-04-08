import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Users/Header";
import Navbar from "../../components/Users/navbar";
import { userProfile } from "../../Api/UserAxios";
import { GetPost } from "../../Api/PostAxios";

const Profile = () => {
  const user = useSelector((state) => state.authslice.user);
  const [profilePicture, setProfilePicture] = useState(
    user ? user.user.profileImage : ""
  );

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
      userProfile(selectedFile, user);
    }
  };

  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        if (user) {
          GetPost(user).then((posts) => {
            console.log("Posts: ", posts.data.posts);
            const postsData = posts.data.posts;
            setPostsData(postsData);
          });
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }
    getData();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        <div className="w-full md:w-1/4">
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 ml-4 mt-10 p-4">
          <div className="bg-white rounded-md p-6 shadow-md">
            <h2 className="font-bold text-sm mb-4">@{user ? user.user.UserName : ""}</h2>

            <div className="mb-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <label htmlFor="profilePictureInput" className="cursor-pointer">
                    <img
                      src={profilePicture || "Guest-user.PNG"}
                      alt="Guest"
                      className="h-24 w-24 rounded-full object-cover cursor-pointer"
                    />
                    <input
                      type="file"
                      id="profilePictureInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                </div>
                <div>
                  <div className="font-bold text-sm">{user ? user.user.Name : ""}</div>
                  <div className="flex mt-2">
                    <div className="mr-4">
                      <span className="font-semibold text-xs">Posts</span>
                      <span className="block text-gray-500">{user.user.posts}</span>{" "}
                    </div>
                    <div className="mr-4">
                      <span className="font-semibold text-xs">Following</span>
                      <span className="block text-gray-500">{user.user.following}</span>{" "}
                    </div>
                    <div>
                      <span className="font-semibold text-xs">Followers</span>
                      <span className="block text-gray-500">{user.user.follower}</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md mt-5 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {postsData.map((post, index) => (
                <div key={index} className="video-container">
                  <p>{post.caption}</p>
                  <video controls>
                    <source src={post.videoUrl} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
