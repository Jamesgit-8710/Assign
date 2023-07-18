import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    
    initialState: [],
   
    reducers: {
        addUser(state, action){
            state.push(action.payload)
        },

        delUser(state, action){
            state.splice(action.payload ,5)
        }
    }
})


export default userSlice.reducer ;

export const { addUser } = userSlice.actions;
export const { delUser } = userSlice.actions;


