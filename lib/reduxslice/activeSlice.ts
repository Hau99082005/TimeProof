"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ActiveState {
  isToggling: boolean;
  error: string | null;
}

const initialState: ActiveState = {
  isToggling: false,
  error: null,
};

export const toggleUserStatus = createAsyncThunk<
  { id: number; status: boolean; isActive: boolean },
  number | string
>("active/toggleUserStatus", async (userId) => {
  const res = await fetch(`/api/admin/active/${userId}`, {
    method: "POST",
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error || "Failed to toggle user status");
  }
  return result.data;
});

const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleUserStatus.pending, (state) => {
        state.isToggling = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state) => {
        state.isToggling = false;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.isToggling = false;
        state.error = action.error.message || "Failed to toggle user status";
      });
  },
});

export const { clearError } = activeSlice.actions;
export default activeSlice.reducer;
