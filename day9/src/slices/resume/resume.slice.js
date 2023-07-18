import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resumes",
  initialState: [],
  reducers: {
    log(state, action){
      state.push(action.payload)
    },
    addResume(state, action) {
        state[action.payload.i].data.push(action.payload.d)
    },
    updtResume(state, action){
      state[action.payload.i].data[action.payload.di]=(action.payload.d)
    },
    rmv(state, action){
      state[action.payload.myInd].data.splice(action.payload.ind,1)
    }
  },
});

export const { addResume , log , rmv , updtResume } = resumeSlice.actions;

export default resumeSlice.reducer;







// {
//   id : 1,
//   data : [
//       {}
//   ]
// },
// {
//   id : 2,
//   data : [
//       {}
//   ]
// }
