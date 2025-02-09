import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userAuth: false,
  userData:{}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state,action) => {
     state.userAuth=true,
     state.userData=action.payload
    },
    clearUser: (state) => {
      state.userAuth=false,
      state.userData={}
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { saveUser,clearUser } = userSlice.actions

export default userSlice.reducer