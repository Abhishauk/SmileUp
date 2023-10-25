import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    admin: false,
    token:null,
    post:null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.token;
            localStorage.setItem("user",JSON.stringify(action.payload))
            localStorage.setItem("token",action.payload.token)
        },
        setLogout: (state) => {
            state.user = null

        },
        clearToken:(state)=>{
            state.token=null
            try {
                localStorage.removeItem("token")
            } catch (error) {
                console.log("Error removing token from localstorage",error);
                
            }
        },
        clearUser: (state) => {
            state.user = null;
            try {
              localStorage.removeItem("user")
          } catch (error) {
              console.log("Error removing user from localstorage",error);
              
          }
          },

        setadminLogin: (state) => {
            state.admin = true;
        },
        setadminLogout: (state) => {
            state.admin = false;
        },
        setpost: (state,action) => {
            state.post = action.payload
        }
        
    }
})
export const { setLogin, setLogout, setadminLogin, setadminLogout ,clearToken,clearUser,setpost} = authSlice.actions;
export default authSlice.reducer;
