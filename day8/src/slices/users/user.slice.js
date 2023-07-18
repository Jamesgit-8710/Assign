import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./action";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading : false,
    data: null
},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
        state.isLoading=true
      // state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
        state.isLoading=true
      // state.data = action.payload;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading=false;
      state.data = action.payload;
    });
  },
});

export default userSlice.reducer;
