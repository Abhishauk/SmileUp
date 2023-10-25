import React, { useEffect, useState } from 'react';
import { GetPostHome } from '../../Api/PostAxios';

const Post = () => {
  
  const [postData, setpostData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await GetPostHome();
        const postData = response.data.posts;
        console.log("222222222222",postData);
        setpostData(postData);
      } catch (error) {
        console.error('Error in GetPostHome:', error);
      }
    }
    getData();
  }, []);


  return (
    <div className="flex justify-center">
      <div className="navbar w-1/5 p-4">
        {/* Your navbar content */}
      </div>
      <div className="posts-container w-1/3 p-4 h-1/3">
      {postData.map((post, index) => (
  <div key={post._id} className="post mb-4 p-4 bg-white border border-gray-300 rounded-md">
    <div className="post-title flex justify-between items-center p-4">
      <div className="post-left flex items-center">
        <div className="image">
             <img
             src={post.userDetails.profileImage}
             alt="Guest"
             className="h-20 w-20 rounded-full object-cover cursor-pointer"
           />
        </div>
        <div className="details ml-2">
            <p className="name font-bold">{post.userDetails.UserName}</p>
        </div>
      </div>
      <div className="post-right">
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
    <div className="post-content w-full sm:h-auto flex justify-center items-center">
      <video controls className="w-full">
        <source src={post.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="post-footer flex justify-between mt-2">
      <div className="like-share-comment">
        <i className="far fa-heart text-2xl mr-4"></i>
        <i className="far fa-comment text-2xl mr-4"></i>
        <i className="far fa-paper-plane text-2xl"></i>
      </div>
      <div className="save">
        <i className="far fa-bookmark text-2xl"></i>
      </div>
    </div>
    <div className="add-comment mt-2">
      <div className="left-side flex items-center">
        <i className="far fa-smile-beam text-2xl mr-2"></i>
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full outline-none border-none text-sm"
        />
      </div>
      <div className="right-side">
        <button className="font-semibold text-blue-500">Post {post.userDetails.UserName}  </button>
       
      </div>
    </div>
  </div>
))}

      </div>
 
    </div>
  );
};

export default Post;
