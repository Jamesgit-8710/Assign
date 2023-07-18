import { configureStore } from '@reduxjs/toolkit'
import notesReducer from "../slices/NoteSlice";

const store = configureStore({
    reducer: {
        notes : notesReducer
    }
})

export default store;