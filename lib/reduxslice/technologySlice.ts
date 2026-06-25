"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Technology, Category } from "@/model/technology";

interface TechnologyState {
  technologies: Technology[];
  categories: Category[];
  isLoading: boolean;
  isUploading: boolean;
  error: string | null;
}

const initialState: TechnologyState = {
  technologies: [],
  categories: [],
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

export const fetchCategories = createAsyncThunk<Category[], void>(
  "technology/fetchCategories",
  async () => {
    const res = await fetch("/api/admin/technologiescategories");
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch categories");
    }
    return result.data;
  },
);

export const createCategory = createAsyncThunk<Category, Omit<Category, "id">>(
  "technology/createCategory",
  async (categoryData) => {
    const res = await fetch("/api/admin/technologiescategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to create category");
    }
    return result.data;
  },
);

export const updateCategory = createAsyncThunk<
  Category,
  { id: number; categoryData: Partial<Omit<Category, "id">> }
>("technology/updateCategory", async ({ id, categoryData }) => {
  const res = await fetch(`/api/admin/technologiescategories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error || "Failed to update category");
  }
  return result.data;
});

export const deleteCategory = createAsyncThunk<void, number>(
  "technology/deleteCategory",
  async (id) => {
    const res = await fetch(`/api/admin/technologiescategories/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to delete category");
    }
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
      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(createCategory.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isUploading = false;
        state.categories.unshift(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.error.message || "Failed to create category";
      })
      .addCase(updateCategory.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isUploading = false;
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat,
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.error.message || "Failed to update category";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete category";
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
