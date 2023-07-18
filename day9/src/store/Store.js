import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/user/user.slice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import resumeSlice from '../slices/resume/resume.slice';
import otpSlice from '../slices/user/otp.slice';


const userReducer = combineReducers({
    users: userSlice,
    resumes: resumeSlice,
    otp: otpSlice
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['users']
}

const persistedReducer = persistReducer(persistConfig, userReducer)  

export const  store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
