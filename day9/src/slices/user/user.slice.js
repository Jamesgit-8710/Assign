import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    status: "",
    data: null,
  },
  reducers: {
    addUser(state, action) {
      state.data = action.payload
    },
    verify(state, action) {
      state.status = action.payload
    },
  },
});

export default userSlice.reducer;
export const { addUser , verify , logout } = userSlice.actions;
