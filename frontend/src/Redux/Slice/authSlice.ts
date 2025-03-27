import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../api/auth.api";
import { AppDispatch, RootState } from "../Store/Store.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "../../utils/storage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storage.getToken(),
    isAuthenticated: storage.getAuthStatus(),
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      storage.clearAll();
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;

        // Use storage service to persist authentication
        storage.setToken(action.payload);
        storage.setAuthStatus(true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;

        // Clear storage on login failure
        storage.clearAll();
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
