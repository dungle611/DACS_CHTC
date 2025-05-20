import { configureStore } from '@reduxjs/toolkit'
import counterPreducer from './slices/counterSlice'
import userPreducer from './slices/userSlice'


export const store = configureStore({
  reducer: {
    counter: counterPreducer,
    user: userPreducer
  },
})
