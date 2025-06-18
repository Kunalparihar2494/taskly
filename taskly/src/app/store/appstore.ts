import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userStore';
import taskReducer from './taskStore';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer
    }
})

export default appStore;