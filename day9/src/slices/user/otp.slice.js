import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    otpp: false,
    data: null
  },
  reducers: {
    addUser(state, action) {
      state.data = action.payload;
    },
    verify(state, action) {
      state.otpp = true
    },
    logout(state, action) {
      state.data = null
      state.otpp = false
    }
  },
});

export default otpSlice.reducer;
export const { addUser, verify ,logout } = otpSlice.actions;
