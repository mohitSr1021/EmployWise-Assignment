import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers, updateUser } from "../api/users.api";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  updateLoading: boolean;
  error: string | null;
  page: number;
  total_pages: number;
}

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    updateLoading: false,
    error: null,
    page: 1,
    total_pages: 1,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<Partial<User> & { id: number }>) => {
        state.updateLoading = false;
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        );
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateLoading = false;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
