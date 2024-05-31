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


export const SerachUser = async (users) => {
  console.log("525255252525",users);
  try {
    const response = await 
    axios({
      method: "post",
      url:'http://localhost:3001/SearchUser',
      data:{users}
    });
    return response
  } catch (error) {
    throw error;
  }
};

export const SerachUserProfile = async (userId) => {
  console.log("1000000000000",userId);
  try {
    const response = await 
    axios({
      method: "post",
      url:'http://localhost:3001/SerachUserProfile',
      data:{userId}
    });
    console.log("222222222222",response);
    return response
  } catch (error) {
    throw error;
  }
};

// export const getDatas = async () => {
//   console.log("1111111111111111111");
//   try {
//     const response = await 
//     axios({
//       method: "get",
//       url:'http://localhost:3001/getDatas',
//     });
//     console.log("======",response);
//     return response
//   } catch (error) {
//     throw error;
//   }
// };
export const getDatas = async () => {
  console.log("]]]]]]]]]");
  try {
      const response = await 
      axios({
          method: "get",
          url: "http://localhost:3001/getDatas",
        });
        console.log("======",response);
        return response
      
  } catch (error) {
    throw error;
  }
}

export const followUser = async (userid) => {
  try {
    const response =  await
    axios({
      method: "post",
      url: "http://localhost:3001/Follower",
      data:{userid}
    });
    return response
    
  } catch (error) {
    
  }
}
export const changePass = async (pass , user) => {
  console.log("oooooo",pass);
  console.log("llllbbb",user);
  try {
    const respo = await
    axios({
      method: "post",
      url:"http://localhost:3001/changePass",
      data:{ pass, user }
    })
    return respo
  } catch (error) {
    
  }
}




