import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    User:null,
    prof:null,
    status:null
  },
  reducers: {
    addUser:(state,action)=>{
      state.User=action.payload.id;
      state.prof=action.payload.prof;
      state.status=action.payload.stat;
    },
    setSS:(state,action)=>{
      state.status=action.payload.s;
    },
    del:(state,action)=>{
      state.User=null
      state.prof=null
    }

  }  
});

export default userSlice.reducer;

export const { addUser , del , setSS } = userSlice.actions;
