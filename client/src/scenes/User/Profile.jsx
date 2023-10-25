import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Users/Header";
import Navbar from "../../components/Users/navbar";
import { userProfile } from "../../Api/UserAxios";
import { GetPost, Posts } from "../../Api/PostAxios";

const Profile = () => {
  const user = useSelector((state) => state.authslice.user);
  console.log("jjjjjjjj", user);
  const post = useSelector((state) => state.authslice.post);
  console.log("kkkkkkkk", post);
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
  }
  
  const [postsData, setPostsData] = useState([]); // This state variable holds your post data

  useEffect(() => {
    async function getData() {
      try {
        if (user) {
          GetPost(user).then((posts) => {
            console.log("Posts: ", posts.data.posts);
            const postsData = posts.data.posts;
            setPostsData(postsData); // Store the posts data in the state variable
          });
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }
    getData();
  }, [user]);

  return (
    <div>
      <div>
        <Header />
        <Navbar />
      </div>
      <div className="mt-10 p-4 ml-96 mr-16">
        <div className="bg-white rounded-md p-6 shadow-md ml-28">
          <h2 className="font-bold text-xl mb-4">
            <div className="text-black">@{user ? user.user.UserName : ""}</div>
          </h2>

          <div className="mb-4">
            <div className="flex items-center">
              <div className="mr-4">
                <label htmlFor="profilePictureInput" className="cursor-pointer">
                  <img
                    src={profilePicture || "Guest-user.PNG"}
                    alt="Guest"
                    className="h-40 w-40 rounded-full object-cover cursor-pointer"
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
                <div className="font-bold text-xl">
                  {user ? user.user.Name : ""}
                </div>
                <div className="flex mt-2">
                  <div className="mr-4">
                    <span className="font-semibold">Posts</span>
                    <span className="block text-gray-500">
                      {user.user.posts}
                    </span>{" "}
                    {/* Replace with actual following count */}
                  </div>
                  <div className="mr-4">
                    <span className="font-semibold">Following</span>
                    <span className="block text-gray-500">
                      {user.user.following}
                    </span>{" "}
                    {/* Replace with actual following count */}
                  </div>
                  <div>
                    <span className="font-semibold">Followers</span>
                    <span className="block text-gray-500">
                      {user.user.follower}
                    </span>{" "}
                    {/* Replace with actual followers count */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md p-6 shadow-md ml-28 mt-5">
  <div className="grid grid-cols-3 gap-4"> {/* Use a 3-column grid layout */}
    {postsData.map((post, index) => (
      <div key={index} className="video-container">
        {/* Render post content here */}
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
  );
};

export default Profile;
