import React, { useEffect, useState } from "react";
import { GetPostHome } from "../../Api/PostAxios";

const Post = () => {
  const [postData, setpostData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await GetPostHome();
        const postData = response.data.posts;
        setpostData(postData);
      } catch (error) {
        console.error("Error in GetPostHome:", error);
      }
    }
    getData();
  }, []);

  return (
    <div className="flex justify-center mt-24">
      <div className="navbar w-1/5 p-4" />
      <div className="posts-container w-1/3 p-4 h-1/3">
        {postData.map((post, index) =>
          <div
            key={post._id}
            className="post mb-4 bg-white border border-gray-300 rounded-md relative w-full"
          >
            <div className="post-content">
              <video controls className="w-full h-auto">
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="profile-info absolute top-4 left-4 flex items-center">
              <img
                src={post.userDetails.profileImage}
                alt="Guest"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
              />
              <p className="name font-bold text-center ml-2 text-xs">
                {post.userDetails.UserName}
              </p>
            </div>
            <div className="post-footer flex justify-between mt-2">
              <div className="like-share-comment">
                <i className="far fa-heart text-2xl mr-4" />
                <i className="far fa-comment text-2xl mr-4" />
                <i className="far fa-paper-plane text-2xl" />
              </div>
              <div className="save">
                <i className="far fa-bookmark text-2xl" />
              </div>
            </div>
            <div className="add-comment mt-2">
              <div className="left-side flex items-center">
                <i className="far fa-smile-beam text-2xl mr-2" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full outline-none border-none text-xs"
                />
              </div>
              <div className="right-side">
                <button className="font-semibold text-blue-500 text-xs">
                  Post {post.userDetails.UserName}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
