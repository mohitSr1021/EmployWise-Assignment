import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../Slice/userSlice";

// Fetch Users Thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/users?page=${page}`);

      if (!response.ok) {
        return rejectWithValue("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Update User Thunk
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: Partial<User> & { id: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        return rejectWithValue("Failed to update user");
      }

      return user;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Delete User Thunk
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to delete user");
      }

      return userId;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);
