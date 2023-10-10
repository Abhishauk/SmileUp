import React from 'react';


const Post = () => {
  return (
    <div className="flex justify-center  ">
      <div className="posts m-6 bg-white border border-gray-300 rounded-md w-2/5">
        <div className="post-title flex justify-between items-center p-4">
          <div className="post-left flex items-center">
            <div className="image">
              <img
                src="profile-pic.JPG"
                alt="ff"
                width="32"
                height="32"
                className="rounded-full"
              />
            </div>
            <div className="details ml-2">
              <p className="name font-bold">_abhisha_uk</p>
              <p className="location ml-6">Calicut</p>
            </div>
          </div>

          <div className="post-right">
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>

        <div className="post-content">
          <img src="profile-pic.JPG" alt="ff" className="w-full h-2/5 object-cover" />
        </div>

        <div className="post-footer flex justify-between mt-2 mx-4">
          <div className="like-share-comment">
            <i className="far fa-heart text-2xl mr-4"></i>
            <i className="far fa-comment text-2xl mr-4"></i>
            <i className="far fa-paper-plane text-2xl"></i>
          </div>
          <div className="save">
            <i className="far fa-bookmark text-2xl"></i>
          </div>
        </div>

        <div className="post-footer-content p-4">
          <p className="likes mb-8 mt-5">100 likes</p>
          <p className="name font-semibold">Abhisha <span className="font-normal ml-4">Loving.....</span></p>
          <p className="comments">View all 10 comments</p>
          <p className="posting-time text-xs mt-6">23 HOURS AGO</p>
        </div>

        <div className="add-comment p-4 border-t border-gray-300 flex items-center justify-between">
          <div className="left-side flex items-center">
            <i className="far fa-smile-beam text-2xl ml-4"></i>
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full outline-none border-none text-sm ml-4"
            />
          </div>
          <div className="right-side">
            <p className="font-semibold">Post</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
