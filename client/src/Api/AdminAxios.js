import axios from "axios";


    export const adminLogin =async (values) =>{
        try {
            const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/admin/adminLogin',
            data: values
         });
         return response
            
        } catch (error) {
            
        }
    }

    export const userList = async () => {
        try {
            const users = await axios({
                method: "get",
                url: "http://localhost:3001/admin/userList"
              });
              return users
            
        } catch (error) {
            
        }
    }

    export const blockUser = async (userId) => {
        try {
            const response = await axios({
                method: "post",
                url:"http://localhost:3001/admin/blockuser",
                data: {userId} 
              });
              return response
            
        } catch (error) {
            
        }
    }