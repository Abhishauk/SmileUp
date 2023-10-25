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

export const userProfile = async (file,userid) => {
  try {
    const userId = userid.user._id
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('userId', userId);
    const response = await 
    axios({
      method: 'post',
      url: 'http://localhost:3001/UserProfile',
      data: formData
    });
    return response;
    
  } catch (error) {
    
  }
}





