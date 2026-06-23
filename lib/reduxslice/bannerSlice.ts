"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Banner } from "@/model/banner";

interface BannerState {
  banners: Banner[];
  isLoading: boolean;
  isUploading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  isLoading: false,
  isUploading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk<Banner[], void>(
  "banner/fetchBanners",
  async () => {
    const res = await fetch("/api/admin/banners");
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch banners");
    }
    return result.data;
  },
);

export const createBanner = createAsyncThunk<Banner, FormData>(
  "banner/createBanner",
  async (formData) => {
    const res = await fetch("/api/admin/banners", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to create banner");
    }
    return result.data;
  },
);

export const deleteBanner = createAsyncThunk<void, number>(
  "banner/deleteBanner",
  async (id) => {
    const res = await fetch(`/api/admin/banners/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to delete banner");
    }
  },
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch banners";
      })
      .addCase(createBanner.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isUploading = false;
        state.banners.unshift(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.error.message || "Failed to create banner";
      })
      .addCase(deleteBanner.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter((b) => b.id !== action.meta.arg);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete banner";
      });
  },
});

export const { clearError } = bannerSlice.actions;
export default bannerSlice.reducer;
