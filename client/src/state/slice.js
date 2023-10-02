import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    admin:false
}
export const  authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.user = null
        },
        setadminLogin: (state) => {
            state.admin = true;
        },
        setadminLogout: (state) => { 
            state.admin = false;
         },
         
        
    }


})

export const { setLogin , setLogout ,setadminLogin ,setadminLogout} = authSlice.actions;
export default authSlice.reducer;