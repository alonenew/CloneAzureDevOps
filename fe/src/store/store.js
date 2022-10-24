import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './slices/itemSlice'
import authReducer from './slices/authSlice'
import toggleReducer from './slices/toggleSlice'
import relationReducer from './slices/relationSlice'

export const store = configureStore({
  reducer: {
    
    toggle: toggleReducer, 
    selectItem: itemReducer,  
    auth: authReducer,
    relation: relationReducer,

    // File slice
  },
})