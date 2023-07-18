import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/CartSlice";

const store = configureStore({
    reducer: {
        users: cartReducer
    }
})

export default store