import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice.ts";
import userReducer from "../Slice/userSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

// RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
