import axios from "axios";

export const createpost = async (file,userid) => {
    console.log("1234567",file);
    try {
      const userId = userid.user._id
      const formData = new FormData();
      formData.append('video', file); // Make sure the field name matches the one in your server
      formData.append('userId', userId);
  
      // Make the POST request to your server
      const response = await axios.post('http://localhost:3001/CreatePost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      
    }
  }
  export const GetPost = async (userid) => {
    try {
      const userId = userid.user._id;
      console.log("qaqaqaq", userId);
      const posts = await axios.post('http://localhost:3001/Posts', { userId });
      return posts;
    } catch (error) {
      
    }
  };
  export const GetPostHome = async (userid) => {
    try {
      const posts = await axios({
        method: 'get',
        url: 'http://localhost:3001/Home',
      });
      return posts;
    } catch (error) {
      
    }
  };

  