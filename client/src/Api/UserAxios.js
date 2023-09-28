import axios from "axios";


    export const userLogin =async (values) =>{
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/Login",
                data: values,
              });
              return response
            
        } catch (error) {
            
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
        
    }
   }
