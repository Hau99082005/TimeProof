"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Technology } from "@/model/technology";

interface TechnologyState {
  technologies: Technology[];
  isLoading: boolean;
  isUploading: boolean;
  error: string | null;
}

const initialState: TechnologyState = {
  technologies: [],
  isLoading: false,
  isUploading: false,
  error: null,
};

export const fetchTechnologies = createAsyncThunk<Technology[], void>(
  "technology/fetchTechnologies",
  async () => {
    const res = await fetch("/api/admin/technologies");
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch technologies");
    }
    return result.data;
  },
);

export const createTechnology = createAsyncThunk<Technology, FormData>(
  "technology/createTechnology",
  async (formData) => {
    const res = await fetch("/api/admin/technologies", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to create technology");
    }
    return result.data;
  },
);

export const updateTechnology = createAsyncThunk<
  Technology,
  { id: number; formData: FormData }
>("technology/updateTechnology", async ({ id, formData }) => {
  const res = await fetch(`/api/admin/technologies/${id}`, {
    method: "PUT",
    body: formData,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error || "Failed to update technology");
  }
  return result.data;
});

export const deleteTechnology = createAsyncThunk<void, number>(
  "technology/deleteTechnology",
  async (id) => {
    const res = await fetch(`/api/admin/technologies/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to delete technology");
    }
  },
);

const technologySlice = createSlice({
  name: "technology",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnologies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTechnologies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technologies = action.payload;
      })
      .addCase(fetchTechnologies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch technologies";
      })
      .addCase(createTechnology.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(createTechnology.fulfilled, (state, action) => {
        state.isUploading = false;
        state.technologies.unshift(action.payload);
      })
      .addCase(createTechnology.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.error.message || "Failed to create technology";
      })
      .addCase(updateTechnology.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(updateTechnology.fulfilled, (state, action) => {
        state.isUploading = false;
        state.technologies = state.technologies.map((tech) =>
          tech.id === action.payload.id ? action.payload : tech,
        );
      })
      .addCase(updateTechnology.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.error.message || "Failed to update technology";
      })
      .addCase(deleteTechnology.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTechnology.fulfilled, (state, action) => {
        state.technologies = state.technologies.filter((t) => t.id !== action.meta.arg);
      })
      .addCase(deleteTechnology.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete technology";
      });
  },
});

export const { clearError } = technologySlice.actions;
export default technologySlice.reducer;
