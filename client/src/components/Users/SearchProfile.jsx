import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Users/Header";
import Navbar from "../../components/Users/navbar";
import { SerachUserProfile } from "../../Api/UserAxios";
import { GetPost } from "../../Api/PostAxios";

const SearchProfile = () => {
  const { userId } = useParams();
  console.log("wwwwwwwww", userId);

  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        console.log("nnnnnnn", userId);
        if (userId) {
          const userDataResponse = await SerachUserProfile(userId);
          console.log("MMMMMMMMMMMMM", userDataResponse);
          const { data: { userData } } = userDataResponse;
  
          setUser(userData);
  
         console.log("4444444",userId);
          const userPostResponse = await GetPost({ user: { _id: userId } });
          console.log("=========", userPostResponse);
  
          // Destructure the posts from the response
          const { data: { posts } } = userPostResponse;
  
          setPostsData(posts);
  
          setLoading(false); // Set loading state to false after fetching data
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false); // Make sure to set loading state to false in case of an error
      }
    }
  
    getData();
  }, [userId]);
  

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }


  return (
    <div>
      <div>
        <Header/>
        <Navbar />
      </div>
      <div className="mt-20 p-4 ml-96 mr-16">
        <div className="bg-white rounded-md p-6 shadow-md ml-28">
          <h2 className="font-bold text-xl mb-4">
            <div className="text-black">@{user.UserName}</div>
          </h2>

          <div className="mb-4">
          <div className="flex items-center">
  <div className="mr-4">
    <img
      src={user.profileImage || "Guest-user.PNG"}  
      alt="Profile"
      className="h-40 w-40 rounded-full object-cover"
    />
  </div>
  <div>
    <div className="font-bold text-xl">{user.Name}</div>
    <div className="flex mt-2">
      <div className="mr-4">
        <span className="font-semibold">Posts</span>
        <span className="block text-gray-500">{user.posts}</span>{" "}
      </div>
      <div className="mr-4">
        <span className="font-semibold">Following</span>
        <span className="block text-gray-500">{user.following}</span>{" "}
      </div>
      <div>
        <span className="font-semibold">Followers</span>
        <span className="block text-gray-500">{user.follower}</span>{" "}
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
        <div className="bg-white rounded-md p-6 shadow-md ml-28 mt-5">
          <div className="grid grid-cols-3 gap-4">
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
  );
};


export default SearchProfile;
