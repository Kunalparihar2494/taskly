import { createSlice } from "@reduxjs/toolkit";


const userStore = createSlice({
    name: 'user',
    initialState: {
        user:null,
    },
    reducers: {
        addUser:(state,action)=>{
            state.user = action.payload
        },
        removeUser:(state) => {
            state.user = null
        },
    }
})

export const {addUser, removeUser} = userStore.actions;

export default userStore.reducer