import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
}
export const  authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            console.log("zzzzzzzzzzzzzzzzzzz");
            console.log(action.payload);
            state.user = action.payload.user;
        }

    }

})

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;