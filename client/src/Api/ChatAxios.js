import axios from "axios";


export const getRequest = async (values) => {
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
  