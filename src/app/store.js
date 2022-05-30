import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/UserSlice';
import appReducer from '../features/AppSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
});
