import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    addNote(state, action) {
      state.push(action.payload);
    },

    rmvNote(state, action) {
       state.splice(action.payload,1)
    },

    updtNote(state, action) {
        state[action.payload.index] = action.payload.newNote;
    },
  },
});

export default noteSlice.reducer;

export const { addNote, rmvNote, updtNote } = noteSlice.actions;
