import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    User:null
  },
  reducers: {
    addUser:(state,action)=>{
      state.User=action.payload
    },
    del:(state,action)=>{
      state.User=null
    }

  }  
});

export default userSlice.reducer;

export const { addUser , del } = userSlice.actions;
