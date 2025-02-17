import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmineAuth: false,
  admineData:{}
}

export const admineSlice = createSlice({
  name: 'admine',
  initialState,
  reducers: {
    saveAdmine: (state,action) => {
     state.isAdmineAuth=true,
     state.admineData=action.payload
    },
    clearAdmine: (state) => {
      state.isAdmineAuth=false,
      state.admineData={}
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { saveAdmine, clearAdmine } = admineSlice.actions

export default admineSlice.reducer