import { createAsyncThunk } from "@reduxjs/toolkit";

// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Login failed");
      }

      const data = await response.json();
      return data.token;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);
