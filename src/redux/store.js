import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import admineReducer from "./features/admineSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        admine: admineReducer
    },
   
})

