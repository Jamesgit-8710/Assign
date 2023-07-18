import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/users/user.slice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const userReducer = combineReducers({
    users: userSlice
});

const persistConfig = {
    key: 'root',
    storage,
    //blacklist: ['users'],
    version: 456 
}

const persistedReducer = persistReducer(persistConfig, userReducer)  

export const  store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
