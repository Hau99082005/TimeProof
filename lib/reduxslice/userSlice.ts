"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/model/user";

interface UserState {
  users: User[];
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  isCreating: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void>(
  "user/fetchUsers",
  async () => {
    const res = await fetch("/api/admin/users");
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return await res.json();
  },
);

export const createUser = createAsyncThunk<User, Partial<User>>(
  "user/createUser",
  async (userData) => {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create user");
    }
    return await res.json();
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(createUser.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreating = false;
        state.users.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message || "Failed to create user";
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
