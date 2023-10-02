import axios from "axios";


export const userLogin = async (values) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/Login",
      data: values,
    });
    console.log("wwwwwwwwwwww", response);
    return response


  } catch (error) {
    throw error
  }
}

export const userRegister = async (values) => {
  try {
    const response = await
      axios({
        method: 'post',
        url: 'http://localhost:3001/Register',
        data: values
      });
    return response

  } catch (error) {
    throw error

  }
}

export const userProfile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file); // Make sure 'profilePicture' matches the field name used in your multer middleware.
    console.log("gggggggggggg",formData);
    const response = await axios.post('http://localhost:3001/UserProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

